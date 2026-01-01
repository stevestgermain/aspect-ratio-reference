import React, { useState, useEffect } from 'react';
import { Calculator, Maximize, ArrowRight, Check, ChevronDown } from 'lucide-react';
import { calculateAspectRatio } from '../utils/mathUtils';
import { PRESETS, STANDARD_FORMAT_GROUPS } from '../constants';
import Visualizer from './Visualizer';
import { RatioPreset } from '../types';

const RatioTool: React.FC = () => {
  const [width, setWidth] = useState<string>('1080');
  const [height, setHeight] = useState<string>('1350');
  const [calculatedRatio, setCalculatedRatio] = useState<string>('4:5');
  const [isFormatsExpanded, setIsFormatsExpanded] = useState<boolean>(false);
  
  // Derived numbers
  const numW = parseFloat(width) || 0;
  const numH = parseFloat(height) || 0;

  // Calculate Ratio when W/H change
  useEffect(() => {
    if (numW && numH) {
      const result = calculateAspectRatio(numW, numH);
      if (result) {
        setCalculatedRatio(result.string);
      }
    }
  }, [numW, numH]);

  const handlePresetClick = (preset: RatioPreset) => {
    let baseW = numW;
    // Default logic if width is missing or zero
    if (baseW === 0) baseW = preset.w < preset.h ? 1080 : 1920;
    
    const ratio = preset.w / preset.h;
    const newH = Math.round(baseW / ratio);
    
    setWidth(baseW.toString());
    setHeight(newH.toString());
    setCalculatedRatio(preset.label);
  };

  const handleFormatClick = (w: number, h: number) => {
    setWidth(w.toString());
    setHeight(h.toString());
  };

  // Find active preset context label
  const activePreset = PRESETS.find(p => p.label === calculatedRatio);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-200 p-6 w-full">
      
      {/* Visualizer */}
      <Visualizer width={numW} height={numH} label={calculatedRatio} />

      {/* Dimensions Inputs */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Maximize className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Dimensions</h3>
        </div>
        
        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
          <div className="relative group">
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Width"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-base placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none text-center font-medium"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold pointer-events-none">PX</span>
          </div>

          <span className="text-gray-300 font-light text-xl">×</span>

          <div className="relative group">
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Height"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-base placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 outline-none text-center font-medium"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold pointer-events-none">PX</span>
          </div>
        </div>
      </div>

      {/* Result Ratio & Context */}
      <div className="mb-8">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm transition-colors group relative overflow-hidden">
          <div className="flex flex-col gap-1">
            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Aspect Ratio</div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-bold text-gray-900 tracking-tight">{calculatedRatio}</span>
              {activePreset && (
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  {activePreset.contextLabel}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Quick Presets</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handlePresetClick(preset)}
              className={`px-3 py-2 text-xs font-semibold border rounded-xl shadow-sm transition-all duration-200 flex items-center gap-2
                ${calculatedRatio === preset.label 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md ring-2 ring-blue-100' 
                  : 'bg-white border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300'
                }`}
            >
              <span>{preset.label}</span>
              {calculatedRatio === preset.label && <Check size={12} strokeWidth={3} />}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped Standard Formats - Expandable */}
      <div className="border-t border-gray-100 pt-6">
        <button 
          onClick={() => setIsFormatsExpanded(!isFormatsExpanded)}
          className="w-full flex items-center justify-between group py-2"
        >
          <div className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Standard Formats</h3>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isFormatsExpanded ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isFormatsExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
            <div className="pt-2 space-y-6">
              {STANDARD_FORMAT_GROUPS.map((group) => (
                <div key={group.category}>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">
                    {group.category}
                  </h4>
                  <div className="space-y-2">
                    {group.items.map((res, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleFormatClick(res.width, res.height)}
                        className="w-full flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-transparent hover:bg-white hover:border-gray-200 hover:shadow-md transition-all duration-200 group text-left"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-0.5">
                             <span className="text-sm font-semibold text-gray-900">{res.label}</span>
                             <span className="text-[11px] font-mono text-gray-400">{res.width}×{res.height}</span>
                          </div>
                          <div className="text-[11px] text-gray-500 group-hover:text-blue-600 transition-colors">
                            {res.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default RatioTool;