import { useEffect, useRef, useState } from 'react';

const Chart = ({ data }) => {
  const x = 0;
  const y = 0;
  const width = 500;
  const height = 300;
  const circleR = 3;

  const svgRef = useRef();
  const groupRef = useRef();
  const animateRef = useRef();
  const [selection, setSelection] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [viewBox, setViewBox] = useState({ x, y, width, height });
  const [previousViewBox, setPreviousViewBox] = useState(viewBox);

  const onMouseDown = (event) => {
    event.preventDefault();
    const { offsetX, offsetY } = event.nativeEvent;
    setSelection({ x1: offsetX, y1: offsetY, x2: offsetX, y2: offsetY });
    setIsDragging(true);
  };

  const onMouseMove = (event) => {
    event.preventDefault();
    if (!isDragging) return;
    const { offsetX, offsetY } = event.nativeEvent;
    setSelection({ ...selection, x2: offsetX, y2: offsetY });
  };

  const onMouseUp = () => {
    setIsDragging(false);
    if (selection && selection.x1 !== selection.x2) {
      const newViewBox = {
        x: Math.min(selection.x1, selection.x2),
        y: Math.min(selection.y1, selection.y2),
        width: Math.abs(selection.x2 - selection.x1),
        height: Math.abs(selection.y2 - selection.y1),
      };
      const viewBoxValue = `${newViewBox.x} ${newViewBox.y} ${newViewBox.width} ${newViewBox.height}`;
      animateViewBox(viewBoxValue);
      setPreviousViewBox(viewBox);
      setViewBox(newViewBox);
      setSelection(null);
    }
  };

  const animateViewBox = (toValue) => {
    const animateElement = animateRef.current;
    const fromValue = `${previousViewBox.x} ${previousViewBox.y} ${previousViewBox.width} ${previousViewBox.height}`;
    if (animateElement) {
      animateElement.setAttribute('from', fromValue);
      animateElement.setAttribute('to', toValue);
      animateElement.beginElement();
    }
  };

  const resetToOriginal = () => {
    const animateElement = animateRef.current;
    const newValue = { x: 0, y: 0, width: 500, height: 300 };
    setViewBox(newValue);

    if (animateElement) {
      animateElement.setAttribute('from', `${x} ${y} ${width} ${height}`);
      animateElement.setAttribute('to', `${x} ${y} ${width} ${height}`);
      animateElement.beginElement();
    }
  };

  useEffect(() => {
    const margin = { top: 5, right: 5, bottom: 5, left: 5 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height / 2 - margin.top - margin.bottom;

    // Scaling functions
    const xScale = (x) => {
      const value = (x / Math.max(...data.map((d) => d.X))) * plotWidth + margin.left;
      if (value) {
        return value;
      }
      return;
    };

    const yScale = (y) => {
      const value = height / 2 - margin.bottom - (y / Math.max(...data.map((d) => Math.abs(d.Y)))) * plotHeight;
      if (value) {
        return value;
      }
      return;
    };

    // Clear previous SVG contents
    const group = groupRef.current;
    group.innerHTML = '';

    // Create circles for each data point
    data.forEach((point) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', xScale(point.X));
      circle.setAttribute('cy', yScale(point.Y));
      circle.setAttribute('r', circleR);
      circle.setAttribute('fill', 'blue');
      group.appendChild(circle);
    });
  }, [data]);

  return (
    <>
      <svg
        className="chart-svg"
        ref={svgRef}
        width={width}
        height={height}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        preserveAspectRatio="xMinYMin meet"
      >
        <animate
          ref={animateRef}
          attributeName="viewBox"
          begin={'1s'}
          from={`${previousViewBox.x} ${previousViewBox.y} ${previousViewBox.width} ${previousViewBox.height}`}
          to={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          dur="0.5s"
          fill="freeze"
        />
        {selection && (
          <rect
            x={Math.min(selection.x1, selection.x2)}
            y={Math.min(selection.y1, selection.y2)}
            width={Math.abs(selection.x2 - selection.x1)}
            height={Math.abs(selection.y2 - selection.y1)}
            fill="rgba(0, 0, 255, 0.3)"
            stroke="blue"
            strokeWidth={1}
          />
        )}
        // Draw a line to separate negative and positive points
        <line x1="0" y1="150" x2="500" y2="150" stroke="#e1e1e1" strokeWidth={'1px'} />
        <g ref={groupRef}></g>
      </svg>

      <button onClick={resetToOriginal} style={{ marginTop: '10px' }}>
        Reset to original size
      </button>
    </>
  );
};
export default Chart;
