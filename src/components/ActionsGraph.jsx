import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';

// 강도별 크기 매핑 (원본 사이트 분석 기반)
const intensityToSize = {
  high: 55,      // 높은 강도: 큰 원형 (100-120px 직경)
  medium: 42,    // 중간 강도: 중간 원형 (80-100px 직경)
  low: 32        // 낮은 강도: 작은 원형 (60-80px 직경)
};

// 각 행동의 강도 정의
const actionIntensities = {
  // 분노 (Anger) 행동들
  'ATTACK': 'high',
  'ARGUE': 'medium',
  'SCOWL': 'low',
  'YELL': 'high',
  'WITHDRAW': 'low',
  'SUPPRESS': 'medium',
  'COOL DOWN': 'medium',
  'ASSERTIVE': 'medium',

  // 두려움 (Fear) 행동들
  'FREEZE': 'high',
  'FLEE': 'high',
  'FIGHT': 'high',
  'SCREAM': 'medium',
  'WORRY': 'low',
  'HIDE': 'medium',
  'BREATHE': 'low',
  'SEEK SAFETY': 'medium',

  // 혐오 (Disgust) 행동들
  'RECOIL': 'medium',
  'AVOID': 'medium',
  'VOMIT': 'high',
  'GRIMACE': 'low',
  'REJECT': 'medium',
  'DEHUMANIZE': 'high',
  'ACCEPT': 'low',
  'UNDERSTAND': 'low',

  // 슬픔 (Sadness) 행동들
  'CRY': 'high',
  'WITHDRAW FROM OTHERS': 'medium',
  'RUMINATE': 'medium',
  'SEEK COMFORT': 'low',
  'MOURN': 'high',
  'ISOLATE': 'medium',
  'EXPRESS': 'medium',
  'CONNECT': 'low',

  // 즐거움 (Enjoyment) 행동들
  'SMILE': 'medium',
  'LAUGH': 'high',
  'SAVOR': 'medium',
  'GLOW': 'low',
  'SHARE': 'medium',
  'EXCLAIM': 'high',
  'EMBRACE': 'medium',
  'CELEBRATE': 'high'
};

// 행동 이름으로 강도 가져오기 (기본값: medium)
const getIntensity = (actionName) => {
  const upperName = actionName.toUpperCase();
  return actionIntensities[upperName] || 'medium';
};

const ActionsGraph = ({ emotion, selectedAction, setSelectedAction }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const size = Math.min(width, 650);
        setDimensions({ width: size, height: size });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const { width, height } = dimensions;
    const centerX = width / 2;
    const centerY = height / 2;
    const innerRadius = Math.min(width, height) * 0.16;
    const outerRadius = Math.min(width, height) * 0.40;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`);

    // Create defs for gradients and filters
    const defs = svg.append('defs');

    // Center gradient
    const centerGradient = defs.append('radialGradient')
      .attr('id', `center-gradient-${emotion.id}`)
      .attr('cx', '30%')
      .attr('cy', '30%')
      .attr('r', '70%');

    centerGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', emotion.colorLight)
      .attr('stop-opacity', 1);

    centerGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', emotion.color)
      .attr('stop-opacity', 1);

    // Glow filter for center
    const glowFilter = defs.append('filter')
      .attr('id', `glow-${emotion.id}`)
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    glowFilter.append('feGaussianBlur')
      .attr('stdDeviation', '8')
      .attr('result', 'coloredBlur');

    const glowMerge = glowFilter.append('feMerge');
    glowMerge.append('feMergeNode').attr('in', 'coloredBlur');
    glowMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Draw center circle with concentric layers (원본 스타일)
    const centerLayers = [
      { scale: 1, opacity: 0.2 },
      { scale: 0.85, opacity: 0.4 },
      { scale: 0.7, opacity: 0.7 },
      { scale: 0.5, opacity: 1 }
    ];

    centerLayers.forEach((layer, i) => {
      g.append('circle')
        .attr('r', innerRadius * layer.scale)
        .attr('fill', i === centerLayers.length - 1
          ? `url(#center-gradient-${emotion.id})`
          : emotion.color)
        .attr('fill-opacity', layer.opacity)
        .attr('stroke', i === centerLayers.length - 1 ? emotion.color : 'none')
        .attr('stroke-width', i === centerLayers.length - 1 ? 2 : 0)
        .style('filter', i === 0 ? `url(#glow-${emotion.id})` : 'none')
        .style('opacity', 0)
        .transition()
        .duration(500)
        .delay(i * 100)
        .style('opacity', 1);
    });

    // Center label
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .style('text-shadow', '0 2px 4px rgba(0,0,0,0.3)')
      .text(emotion.name_ko)
      .style('opacity', 0)
      .transition()
      .delay(400)
      .duration(500)
      .style('opacity', 1);

    // Calculate action positions
    const actions = emotion.actions;
    const angleStep = (2 * Math.PI) / actions.length;
    const startAngle = -Math.PI / 2; // Start from top

    // Draw connections and action nodes
    actions.forEach((action, i) => {
      const angle = startAngle + angleStep * i;
      const intensity = getIntensity(action.name_en);
      const nodeRadius = intensityToSize[intensity];

      // 강도에 따라 거리도 조정 (높은 강도 = 더 바깥쪽)
      const distanceMultiplier = intensity === 'high' ? 1.05 : (intensity === 'medium' ? 1 : 0.95);
      const adjustedOuterRadius = outerRadius * distanceMultiplier;

      const x = Math.cos(angle) * adjustedOuterRadius;
      const y = Math.sin(angle) * adjustedOuterRadius;
      const lineEndX = Math.cos(angle) * (innerRadius + 15);
      const lineEndY = Math.sin(angle) * (innerRadius + 15);

      const isIntrinsic = action.type === 'intrinsic';
      const nodeColor = isIntrinsic ? emotion.color : emotion.colorLight;

      // Node gradient
      const nodeGradient = defs.append('radialGradient')
        .attr('id', `node-gradient-${emotion.id}-${i}`)
        .attr('cx', '30%')
        .attr('cy', '30%')
        .attr('r', '70%');

      nodeGradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#ffffff')
        .attr('stop-opacity', 1);

      nodeGradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#f9fafb')
        .attr('stop-opacity', 1);

      // Connection line with gradient effect
      const line = g.append('line')
        .attr('x1', lineEndX)
        .attr('y1', lineEndY)
        .attr('x2', lineEndX)
        .attr('y2', lineEndY)
        .attr('stroke', nodeColor)
        .attr('stroke-width', intensity === 'high' ? 3 : (intensity === 'medium' ? 2 : 1.5))
        .attr('stroke-opacity', 0.5)
        .attr('stroke-dasharray', isIntrinsic ? 'none' : '6,4');

      line.transition()
        .delay(500 + i * 80)
        .duration(500)
        .attr('x2', x)
        .attr('y2', y);

      // Action node group
      const nodeGroup = g.append('g')
        .attr('class', 'action-node')
        .style('cursor', 'pointer')
        .attr('transform', `translate(${lineEndX}, ${lineEndY})`)
        .style('opacity', 0);

      nodeGroup.transition()
        .delay(600 + i * 80)
        .duration(500)
        .attr('transform', `translate(${x}, ${y})`)
        .style('opacity', 1);

      // Node shadow
      nodeGroup.append('ellipse')
        .attr('cx', 2)
        .attr('cy', 4)
        .attr('rx', nodeRadius + 2)
        .attr('ry', nodeRadius * 0.3)
        .attr('fill', 'rgba(0,0,0,0.1)')
        .attr('filter', 'blur(4px)');

      // Node background circle with concentric effect (강도별 크기)
      const nodeLayers = [
        { scale: 1, opacity: 0.15, color: nodeColor },
        { scale: 0.85, opacity: 1, color: 'white' }
      ];

      nodeLayers.forEach((layer, li) => {
        nodeGroup.append('circle')
          .attr('r', nodeRadius * layer.scale)
          .attr('fill', layer.color)
          .attr('fill-opacity', layer.opacity)
          .attr('stroke', li === nodeLayers.length - 1 ? nodeColor : 'none')
          .attr('stroke-width', li === nodeLayers.length - 1 ? 2.5 : 0)
          .style('filter', li === nodeLayers.length - 1 ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' : 'none');
      });

      // Node label (크기에 따라 폰트 조정)
      const fontSize = intensity === 'high' ? '13px' : (intensity === 'medium' ? '11px' : '10px');
      const text = nodeGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', '#374151')
        .attr('font-size', fontSize)
        .attr('font-weight', '600');

      // Split long text
      const words = action.name_ko.split('/');
      if (words.length > 1) {
        words.forEach((word, wi) => {
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', wi === 0 ? (intensity === 'high' ? -8 : -6) : (intensity === 'high' ? 16 : 12))
            .text(word);
        });
      } else if (action.name_ko.length > 4) {
        // 긴 텍스트 줄바꿈
        const mid = Math.ceil(action.name_ko.length / 2);
        const line1 = action.name_ko.slice(0, mid);
        const line2 = action.name_ko.slice(mid);
        text.append('tspan')
          .attr('x', 0)
          .attr('dy', intensity === 'high' ? -8 : -6)
          .text(line1);
        text.append('tspan')
          .attr('x', 0)
          .attr('dy', intensity === 'high' ? 16 : 12)
          .text(line2);
      } else {
        text.text(action.name_ko);
      }

      // Type indicator (크기에 따라 조정)
      const indicatorSize = intensity === 'high' ? 10 : (intensity === 'medium' ? 8 : 7);
      const indicatorOffset = nodeRadius * 0.7;
      nodeGroup.append('circle')
        .attr('cx', indicatorOffset)
        .attr('cy', -indicatorOffset)
        .attr('r', indicatorSize)
        .attr('fill', isIntrinsic ? '#EF4444' : '#22C55E')
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .style('filter', 'drop-shadow(0 1px 3px rgba(0,0,0,0.15))');

      // Intensity indicator (강도 표시)
      const intensityDots = intensity === 'high' ? 3 : (intensity === 'medium' ? 2 : 1);
      for (let d = 0; d < intensityDots; d++) {
        nodeGroup.append('circle')
          .attr('cx', -indicatorOffset + d * 8)
          .attr('cy', indicatorOffset - 4)
          .attr('r', 3)
          .attr('fill', nodeColor)
          .attr('opacity', 0.7);
      }

      // Interaction handlers
      nodeGroup
        .on('mouseenter', function() {
          d3.select(this).selectAll('circle').filter((d, i) => i === 1)
            .transition()
            .duration(200)
            .attr('r', nodeRadius * 0.85 + 5)
            .attr('stroke-width', 3.5);

          // Bring to front
          this.parentNode.appendChild(this);
        })
        .on('mouseleave', function() {
          d3.select(this).selectAll('circle').filter((d, i) => i === 1)
            .transition()
            .duration(200)
            .attr('r', nodeRadius * 0.85)
            .attr('stroke-width', 2.5);
        })
        .on('click', () => {
          setSelectedAction(action);
        });
    });

    // Pulse animation for center
    const pulseCircle = g.append('circle')
      .attr('r', innerRadius)
      .attr('fill', 'none')
      .attr('stroke', emotion.color)
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.4);

    function pulse() {
      pulseCircle
        .attr('r', innerRadius)
        .attr('stroke-opacity', 0.4)
        .transition()
        .duration(2500)
        .ease(d3.easeQuadOut)
        .attr('r', innerRadius + 30)
        .attr('stroke-opacity', 0)
        .on('end', pulse);
    }

    setTimeout(pulse, 800);

  }, [emotion, dimensions, setSelectedAction]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      {/* Legend - 강도 및 유형 범례 */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* 유형 범례 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
            <span className="text-gray-600 text-sm font-medium">본능적 행동</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
            <span className="text-gray-600 text-sm font-medium">의도적 행동</span>
          </div>
        </div>

        {/* 강도 범례 */}
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full">
          <span className="text-gray-500 text-xs font-medium">강도:</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span className="text-gray-500 text-xs">낮음</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-gray-400" />
            <span className="text-gray-500 text-xs">중간</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-gray-400" />
            <span className="text-gray-500 text-xs">높음</span>
          </div>
        </div>
      </motion.div>

      {/* SVG Graph */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <svg ref={svgRef} />
      </motion.div>

      {/* Mobile Action List */}
      <motion.div
        className="mt-8 w-full md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="grid grid-cols-2 gap-3">
          {emotion.actions.map((action) => {
            const intensity = getIntensity(action.name_en);
            return (
              <button
                key={action.name_en}
                onClick={() => setSelectedAction(action)}
                className={`p-3 rounded-xl text-left transition-all shadow-sm ${
                  action.type === 'intrinsic'
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-green-50 border border-green-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div
                      className={`rounded-full mr-2 ${
                        action.type === 'intrinsic' ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{
                        width: intensity === 'high' ? '12px' : (intensity === 'medium' ? '10px' : '8px'),
                        height: intensity === 'high' ? '12px' : (intensity === 'medium' ? '10px' : '8px')
                      }}
                    />
                    <span className="text-gray-800 text-sm font-medium">
                      {action.name_ko}
                    </span>
                  </div>
                  {/* 강도 표시 점들 */}
                  <div className="flex gap-0.5">
                    {[...Array(intensity === 'high' ? 3 : (intensity === 'medium' ? 2 : 1))].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: emotion.color }}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-gray-500 text-xs">
                  {action.type === 'intrinsic' ? '본능적' : '의도적'}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Instruction */}
      <motion.p
        className="text-gray-400 text-center text-sm mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        각 행동을 클릭하면 자세한 설명을 볼 수 있습니다
      </motion.p>
    </div>
  );
};

export default ActionsGraph;
