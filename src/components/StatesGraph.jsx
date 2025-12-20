import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';

const StatesGraph = ({ emotion, activeState, setActiveState }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  // Sort states by intensity
  const sortedStates = [...emotion.states].sort((a, b) => a.intensity - b.intensity);
  const maxIntensity = Math.max(...sortedStates.map(s => s.intensity));

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.min(width, 900),
          height: Math.min(width * 0.6, 500)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const { width, height } = dimensions;
    const margin = { top: 40, right: 20, bottom: 60, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Create mountain path
    const mountainPoints = [];
    const numPoints = sortedStates.length;
    const peakX = innerWidth / 2;
    const peakY = 20;
    const baseY = innerHeight;

    // Generate smoother mountain shape
    sortedStates.forEach((state, i) => {
      const normalizedIntensity = state.intensity / maxIntensity;
      const y = baseY - (normalizedIntensity * (baseY - peakY));

      // Distribute points across the mountain width
      let x;
      if (i < numPoints / 2) {
        // Left side of mountain
        x = (i / (numPoints / 2)) * peakX;
      } else {
        // Right side of mountain
        x = peakX + ((i - numPoints / 2) / (numPoints / 2)) * (innerWidth - peakX);
      }

      mountainPoints.push({ x, y, state });
    });

    // Create gradient - enhanced for smoother appearance
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', `mountain-gradient-${emotion.id}`)
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '0%')
      .attr('y2', '0%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', emotion.colorLight)
      .attr('stop-opacity', 0.2);

    gradient.append('stop')
      .attr('offset', '30%')
      .attr('stop-color', emotion.colorLight)
      .attr('stop-opacity', 0.5);

    gradient.append('stop')
      .attr('offset', '60%')
      .attr('stop-color', emotion.color)
      .attr('stop-opacity', 0.7);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', emotion.colorDark || emotion.color)
      .attr('stop-opacity', 0.95);

    // Create area generator for mountain shape - smoother quadratic curves
    const areaGenerator = d3.area()
      .x(d => d.x)
      .y0(baseY)
      .y1(d => d.y)
      .curve(d3.curveBasis); // Smoother Bezier curves

    // Draw mountain
    const allPoints = [
      { x: 0, y: baseY },
      ...mountainPoints,
      { x: innerWidth, y: baseY }
    ];

    g.append('path')
      .datum(allPoints)
      .attr('fill', `url(#mountain-gradient-${emotion.id})`)
      .attr('stroke', emotion.color)
      .attr('stroke-width', 2)
      .attr('d', areaGenerator)
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .style('opacity', 1);

    // Add state labels and interaction points
    const labelPadding = 8;
    const stateGroups = g.selectAll('.state-group')
      .data(sortedStates)
      .enter()
      .append('g')
      .attr('class', 'state-group')
      .style('cursor', 'pointer');

    // Calculate label positions
    sortedStates.forEach((state, i) => {
      const normalizedIntensity = state.intensity / maxIntensity;
      const y = baseY - (normalizedIntensity * (baseY - peakY));

      // Alternate left/right for labels
      const isLeftSide = i % 2 === 0;
      let x;

      if (numPoints <= 5) {
        x = ((i + 1) / (numPoints + 1)) * innerWidth;
      } else {
        const sectionWidth = innerWidth / numPoints;
        x = sectionWidth * i + sectionWidth / 2;
      }

      state._x = x;
      state._y = y;
    });

    stateGroups.each(function(state, i) {
      const group = d3.select(this);

      // Interaction circle
      group.append('circle')
        .attr('cx', state._x)
        .attr('cy', state._y - 10)
        .attr('r', 20)
        .attr('fill', 'transparent')
        .attr('stroke', 'transparent');

      // Visible dot
      group.append('circle')
        .attr('cx', state._x)
        .attr('cy', state._y - 10)
        .attr('r', 6)
        .attr('fill', emotion.color)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))')
        .style('opacity', 0)
        .transition()
        .delay(500 + i * 100)
        .duration(500)
        .style('opacity', 1);

      // Label background
      const textBg = group.append('rect')
        .attr('rx', 6)
        .attr('ry', 6)
        .attr('fill', 'white')
        .attr('stroke', emotion.color)
        .attr('stroke-width', 1)
        .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))')
        .style('opacity', 0);

      // Label text
      const labelY = i % 2 === 0 ? state._y - 35 : state._y + 15;

      const text = group.append('text')
        .attr('x', state._x)
        .attr('y', labelY)
        .attr('text-anchor', 'middle')
        .attr('fill', '#374151')
        .attr('font-size', '12px')
        .attr('font-weight', '600')
        .text(state.name_ko)
        .style('opacity', 0)
        .transition()
        .delay(700 + i * 100)
        .duration(500)
        .style('opacity', 1);

      // Update background size after text is rendered
      setTimeout(() => {
        const textNode = text.node();
        if (textNode) {
          const bbox = textNode.getBBox();
          textBg
            .attr('x', bbox.x - labelPadding)
            .attr('y', bbox.y - labelPadding / 2)
            .attr('width', bbox.width + labelPadding * 2)
            .attr('height', bbox.height + labelPadding)
            .transition()
            .delay(700 + i * 100)
            .duration(500)
            .style('opacity', 0.95);
        }
      }, 100);

      // Interaction handlers - smoother ease-out transitions
      group
        .on('mouseenter', function() {
          d3.select(this).select('circle:nth-child(2)')
            .transition()
            .duration(300)
            .ease(d3.easeQuadOut)
            .attr('r', 12)
            .attr('stroke-width', 3)
            .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))');
          d3.select(this).select('rect')
            .transition()
            .duration(300)
            .ease(d3.easeQuadOut)
            .attr('stroke-width', 2)
            .style('transform', 'scale(1.05)');
          d3.select(this).select('text')
            .transition()
            .duration(300)
            .ease(d3.easeQuadOut)
            .attr('font-weight', '700');
        })
        .on('mouseleave', function() {
          d3.select(this).select('circle:nth-child(2)')
            .transition()
            .duration(400)
            .ease(d3.easeQuadOut)
            .attr('r', 6)
            .attr('stroke-width', 2)
            .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))');
          d3.select(this).select('rect')
            .transition()
            .duration(400)
            .ease(d3.easeQuadOut)
            .attr('stroke-width', 1)
            .style('transform', 'scale(1)');
          d3.select(this).select('text')
            .transition()
            .duration(400)
            .ease(d3.easeQuadOut)
            .attr('font-weight', '600');
        })
        .on('click', () => {
          setActiveState(state);
        });
    });

    // Intensity labels
    g.append('text')
      .attr('x', 10)
      .attr('y', baseY - 10)
      .attr('fill', '#9CA3AF')
      .attr('font-size', '10px')
      .text('가장 약함');

    g.append('text')
      .attr('x', peakX)
      .attr('y', peakY + 5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#9CA3AF')
      .attr('font-size', '10px')
      .text('가장 강함');

    g.append('text')
      .attr('x', innerWidth - 10)
      .attr('y', baseY - 10)
      .attr('text-anchor', 'end')
      .attr('fill', '#9CA3AF')
      .attr('font-size', '10px')
      .text('가장 약함');

  }, [emotion, dimensions, maxIntensity, setActiveState, sortedStates]);

  return (
    <div ref={containerRef} className="w-full">
      {/* Emotion Header */}
      <motion.div
        className="flex items-center justify-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div
          className="w-4 h-4 rounded-full mr-3 shadow-sm"
          style={{ backgroundColor: emotion.color }}
        />
        <h3 className="text-2xl font-bold text-gray-800">
          {emotion.name_ko}의 상태들
        </h3>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-gray-600 text-center mb-8 max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {emotion.description_ko}
      </motion.p>

      {/* Mountain Graph */}
      <motion.div
        className="flex justify-center glass rounded-2xl p-4 border border-gray-200/50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <svg ref={svgRef} />
      </motion.div>

      {/* State List for Mobile */}
      <motion.div
        className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {sortedStates.map((state, i) => (
          <button
            key={state.name_en}
            onClick={() => setActiveState(state)}
            className="bg-white rounded-lg p-3 text-left hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
            style={{
              borderLeft: `3px solid ${emotion.color}`
            }}
          >
            <div className="text-gray-800 text-sm font-medium">{state.name_ko}</div>
            <div className="text-gray-400 text-xs mt-1">강도 {state.intensity}</div>
          </button>
        ))}
      </motion.div>

      {/* Instruction */}
      <motion.p
        className="text-gray-400 text-center text-sm mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        각 상태를 클릭하면 자세한 설명을 볼 수 있습니다
      </motion.p>
    </div>
  );
};

export default StatesGraph;
