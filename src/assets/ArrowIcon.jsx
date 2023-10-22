import React from 'react';

const ArrowIcon = ({ color, direction }) => {
  const arrowDirection = direction === 'up' ? '12 2 2 22 22 22' : '12 22 2 2 22 2';
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
      <polygon points={arrowDirection} fill={color} />
    </svg>
  );
};

export default ArrowIcon;
