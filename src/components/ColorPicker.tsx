import React from 'react';
import { CardStyle } from '../App';
import { Palette, Sparkles } from 'lucide-react';

interface ColorPickerProps {
  cardStyle: CardStyle;
  onColorChange: (field: keyof CardStyle, value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ cardStyle, onColorChange }) => {
  const colorPresets = [
    { name: 'Indigo', primary: '#6366f1', secondary: '#4f46e5', gradient: 'from-indigo-500 to-indigo-600' },
    { name: 'Purple', primary: '#8b5cf6', secondary: '#7c3aed', gradient: 'from-purple-500 to-purple-600' },
    { name: 'Blue', primary: '#3b82f6', secondary: '#2563eb', gradient: 'from-blue-500 to-blue-600' },
    { name: 'Emerald', primary: '#10b981', secondary: '#059669', gradient: 'from-emerald-500 to-emerald-600' },
    { name: 'Rose', primary: '#f43f5e', secondary: '#e11d48', gradient: 'from-rose-500 to-rose-600' },
    { name: 'Orange', primary: '#f97316', secondary: '#ea580c', gradient: 'from-orange-500 to-orange-600' },
    { name: 'Teal', primary: '#14b8a6', secondary: '#0d9488', gradient: 'from-teal-500 to-teal-600' },
    { name: 'Slate', primary: '#64748b', secondary: '#475569', gradient: 'from-slate-500 to-slate-600' },
  ];

  const backgroundColors = [
    { name: 'Pure White', color: '#ffffff', preview: 'bg-white border-2 border-gray-200' },
    { name: 'Soft Gray', color: '#f8fafc', preview: 'bg-slate-50 border-2 border-gray-200' },
    { name: 'Warm Cream', color: '#fefce8', preview: 'bg-yellow-50 border-2 border-yellow-200' },
    { name: 'Cool Blue', color: '#eff6ff', preview: 'bg-blue-50 border-2 border-blue-200' },
  ];

  const textColors = [
    { name: 'Charcoal', color: '#1f2937', preview: 'bg-gray-800' },
    { name: 'Pure Black', color: '#000000', preview: 'bg-black' },
    { name: 'Slate', color: '#475569', preview: 'bg-slate-600' },
    { name: 'Warm Gray', color: '#78716c', preview: 'bg-stone-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
          <Palette className="w-5 h-5 text-indigo-500" />
          <span>Color Palette</span>
        </h3>
        <p className="text-gray-600 text-sm">Choose colors that represent your brand</p>
      </div>

      {/* Color Presets */}
      <div>
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-4 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>Preset Combinations</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                onColorChange('primaryColor', preset.primary);
                onColorChange('secondaryColor', preset.secondary);
              }}
              className={`group p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                cardStyle.primaryColor === preset.primary
                  ? 'border-indigo-400 bg-white/60 backdrop-blur-sm shadow-xl'
                  : 'border-white/30 bg-white/20 hover:border-white/50 hover:bg-white/40'
              }`}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex space-x-1">
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-lg border-2 border-white"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-lg border-2 border-white"
                    style={{ backgroundColor: preset.secondary }}
                  />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">
                  {preset.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="space-y-6">
        <h4 className="text-sm sm:text-base font-semibold text-gray-700">Custom Colors</h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-3">Primary Color</label>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <input
                  type="color"
                  value={cardStyle.primaryColor}
                  onChange={(e) => onColorChange('primaryColor', e.target.value)}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border-4 border-white shadow-lg cursor-pointer"
                />
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
              </div>
              <input
                type="text"
                value={cardStyle.primaryColor}
                onChange={(e) => onColorChange('primaryColor', e.target.value)}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl text-xs sm:text-sm font-mono focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-3">Secondary Color</label>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <input
                  type="color"
                  value={cardStyle.secondaryColor}
                  onChange={(e) => onColorChange('secondaryColor', e.target.value)}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border-4 border-white shadow-lg cursor-pointer"
                />
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
              </div>
              <input
                type="text"
                value={cardStyle.secondaryColor}
                onChange={(e) => onColorChange('secondaryColor', e.target.value)}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl text-xs sm:text-sm font-mono focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background Colors */}
      <div>
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-4">Background</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {backgroundColors.map((bg) => (
            <button
              key={bg.name}
              onClick={() => onColorChange('backgroundColor', bg.color)}
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                cardStyle.backgroundColor === bg.color
                  ? 'border-indigo-400 bg-white/60 backdrop-blur-sm shadow-xl'
                  : 'border-white/30 bg-white/20 hover:border-white/50 hover:bg-white/40'
              }`}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl shadow-sm ${bg.preview}`}
                />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">{bg.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Text Colors */}
      <div>
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-4">Text Color</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {textColors.map((text) => (
            <button
              key={text.name}
              onClick={() => onColorChange('textColor', text.color)}
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                cardStyle.textColor === text.color
                  ? 'border-indigo-400 bg-white/60 backdrop-blur-sm shadow-xl'
                  : 'border-white/30 bg-white/20 hover:border-white/50 hover:bg-white/40'
              }`}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl shadow-sm border-2 border-white ${text.preview}`}
                />
                <span className="text-xs sm:text-sm font-semibold text-gray-700">{text.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;