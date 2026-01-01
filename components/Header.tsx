import React from 'react';
import { Scale } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="flex flex-col items-center mb-6 text-center">
      <div className="w-14 h-14 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/10 mb-5 text-white transform -rotate-6 flex items-center justify-center hover:scale-105 duration-300 transition-transform">
        <Scale size={28} strokeWidth={2.5} />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
        Aspect Ratio Reference
      </h1>
      <p className="text-[13px] text-gray-500 max-w-[420px] mx-auto font-normal leading-relaxed">
        Calculate aspect ratios, explore standard media dimensions, and visualize screen real estate for your next project.
      </p>
    </div>
  );
};

export default Header;