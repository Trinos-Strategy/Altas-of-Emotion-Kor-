import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';

const ActionsGraph = ({ emotion, selectedAction, setSelectedAction }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const size = Math.min(width, 600);
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
    const innerRadius = Math.min(width, height) * 0.15;
    const outerRadius = Math.min(width, height) * 0.42;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`);

    // Create gradient for center
    const centerGradient = svg.append('defs')
      .append('radialGradient')
      .attr('id', `center-gradient-${emotion.id}`)
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');

    centerGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', emotion.color)
      .attr('stop-opacity', 0.8);

    centerGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', emotion.colorDark)
      .attr('stop-opacity', 0.6);

    // Draw center circle (emotion)
    g.append('circle')
      .attr('r', innerRadius)
      .attr('fill', `url(#center-gradient-${emotion.id})`)
      .attr('stroke', emotion.color)
      .attr('stroke-width', 2)
      .style('opacity', 0)
      .transition()
      .duration(500)
      .style('opacity', 1);

    // Center label
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .text(emotion.name_ko)
      .style('opacity', 0)
      .transition()
      .delay(300)
      .duration(500)
      .style('opacity', 1);

    // Calculate action positions
    const actions = emotion.actions;
    const angleStep = (2 * Math.PI) / actions.length;
    const startAngle = -Math.PI / 2; // Start from top

    // Draw connections and action nodes
    actions.forEach((action, i) => {
      const angle = startAngle + angleStep * i;
      const x = Math.cos(angle) * outerRadius;
      const y = Math.sin(angle) * outerRadius;
      const lineEndX = Math.cos(angle) * (innerRadius + 10);
      const lineEndY = Math.sin(angle) * (innerRadius + 10);

      const isIntrinsic = action.type === 'intrinsic';
      const nodeColor = isIntrinsic ? emotion.color : emotion.colorLight;

      // Connection line
      const line = g.append('line')
        .attr('x1', lineEndX)
        .attr('y1', lineEndY)
        .attr('x2', lineEndX)
        .attr('y2', lineEndY)
        .attr('stroke', nodeColor)
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.4)
        .attr('stroke-dasharray', isIntrinsic ? 'none' : '4,4');

      line.transition()
        .delay(500 + i * 100)
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
        .delay(700 + i * 100)
        .duration(500)
        .attr('transform', `translate(${x}, ${y})`)
        .style('opacity', 1);

      // Node background circle
      nodeGroup.append('circle')
        .attr('r', 35)
        .attr('fill', '#252540')
        .attr('stroke', nodeColor)
        .attr('stroke-width', 2);

      // Node label
      const text = nodeGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', 'white')
        .attr('font-size', '11px')
        .attr('font-weight', '500');

      // Split long text
      const words = action.name_ko.split('/');
      if (words.length > 1) {
        words.forEach((word, wi) => {
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', wi === 0 ? -6 : 12)
            .text(word);
        });
      } else {
        text.text(action.name_ko);
      }

      // Type indicator
      nodeGroup.append('circle')
        .attr('cx', 25)
        .attr('cy', -25)
        .attr('r', 8)
        .attr('fill', isIntrinsic ? '#E74C3C' : '#27AE60')
        .attr('stroke', '#252540')
        .attr('stroke-width', 2);

      // Interaction handlers
      nodeGroup
        .on('mouseenter', function() {
          d3.select(this).select('circle:first-child')
            .transition()
            .duration(200)
            .attr('r', 40)
            .attr('stroke-width', 3);
        })
        .on('mouseleave', function() {
          d3.select(this).select('circle:first-child')
            .transition()
            .duration(200)
            .attr('r', 35)
            .attr('stroke-width', 2);
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
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.5);

    function pulse() {
      pulseCircle
        .attr('r', innerRadius)
        .attr('stroke-opacity', 0.5)
        .transition()
        .duration(2000)
        .attr('r', innerRadius + 20)
        .attr('stroke-opacity', 0)
        .on('end', pulse);
    }

    setTimeout(pulse, 1000);

  }, [emotion, dimensions, setSelectedAction]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      {/* Legend */}
      <motion.div
        className="flex items-center justify-center space-x-6 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#E74C3C] mr-2" />
          <span className="text-white/60 text-sm">본능적 행동</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#27AE60] mr-2" />
          <span className="text-white/60 text-sm">의도적 행동</span>
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
          {emotion.actions.map((action, i) => (
            <button
              key={action.name_en}
              onClick={() => setSelectedAction(action)}
              className={`p-3 rounded-lg text-left transition-colors ${
                action.type === 'intrinsic'
                  ? 'bg-red-500/10 border border-red-500/30'
                  : 'bg-green-500/10 border border-green-500/30'
              }`}
            >
              <div className="flex items-center mb-1">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    action.type === 'intrinsic' ? 'bg-red-500' : 'bg-green-500'
                  }`}
                />
                <span className="text-white text-sm font-medium">
                  {action.name_ko}
                </span>
              </div>
              <span className="text-white/40 text-xs">
                {action.type === 'intrinsic' ? '본능적' : '의도적'}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Instruction */}
      <motion.p
        className="text-white/40 text-center text-sm mt-6"
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
