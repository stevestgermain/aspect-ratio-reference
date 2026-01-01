import React from 'react';

interface VisualizerProps {
  width: number;
  height: number;
  label?: string;
}

const Visualizer: React.FC<VisualizerProps> = ({ width, height, label }) => {
  // Calculate relative dimensions for the visualizer box
  // We want to fit it inside a container of roughly 200px height max
  const aspectRatio = width / height;
  
  let boxWidth = '100%';
  let boxHeight = '200px';
  
  // Logic to constrain the box within a viewing area while maintaining ratio
  // Base container width is around 360px (considering padding of parent)
  const MAX_CONTAINER_WIDTH = 360;
  const MAX_CONTAINER_HEIGHT = 200;
  
  if (aspectRatio > 1) {
    // Landscape
    const computedHeight = MAX_CONTAINER_WIDTH / aspectRatio;
    if (computedHeight > MAX_CONTAINER_HEIGHT) {
      // Too tall, constrain by height
      boxHeight = `${MAX_CONTAINER_HEIGHT}px`;
      boxWidth = `${MAX_CONTAINER_HEIGHT * aspectRatio}px`;
    } else {
      // Fits width wise
      boxWidth = '100%';
      boxHeight = `${computedHeight}px`;
    }
  } else {
    // Portrait or Square
    const computedWidth = MAX_CONTAINER_HEIGHT * aspectRatio;
    boxHeight = `${MAX_CONTAINER_HEIGHT}px`;
    boxWidth = `${computedWidth}px`;
  }
  
  // If inputs are 0 or invalid, default to square
  if (!width || !height) {
    boxWidth = '100px';
    boxHeight = '100px';
  }

  return (
    <div className="w-full h-[240px] bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center overflow-hidden relative mb-6">
       {/* Grid Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>
      
      {/* The Actual Shape */}
      <div 
        className="bg-blue-600 shadow-xl shadow-blue-900/10 rounded-lg flex items-center justify-center relative transition-all duration-500 ease-out"
        style={{ width: boxWidth, height: boxHeight }}
      >
        <span className="text-white/90 font-semibold text-xs tracking-wider absolute">
          {label || 'PREVIEW'}
        </span>
        
        {/* Dimensions Labels on the box */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] font-medium text-gray-400 whitespace-nowrap">
          {width > 0 ? width : 'W'}
        </div>
        <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-[10px] font-medium text-gray-400 rotate-90 whitespace-nowrap">
          {height > 0 ? height : 'H'}
        </div>
      </div>
    </div>
  );
};

export default Visualizer;