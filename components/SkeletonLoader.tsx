
import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-4 w-full">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="flex gap-4 p-5 bg-white border border-gray-100 rounded-2xl animate-pulse">
          <div className="w-12 h-12 bg-gray-100 rounded-full"></div>
          <div className="flex-grow space-y-2">
            <div className="h-4 bg-gray-100 rounded w-1/3"></div>
            <div className="h-3 bg-gray-100 rounded w-1/4"></div>
            <div className="h-2 bg-gray-50 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
