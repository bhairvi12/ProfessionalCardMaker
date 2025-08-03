import React from 'react';
import { CardStyle } from '../App';

interface ColorPickerProps {
  cardStyle: CardStyle;
  onColorChange: (field: keyof CardStyle, value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ cardStyle, onColorChange }) => {
  const colorPresets = [
    { name: 'Blue', primary: '#2563eb', secondary: '#1e40af' },
    { name: 'Purple', primary: '#7c3aed', secondary: '#5b21b6' },
    { name: 'Green', primary: '#059669', secondary: '#047857' },
    { name: 'Red', primary: '#dc2626', secondary: '#b91c1c' },
    { name: 'Orange', primary: '#ea580c', secondary: '#c2410c' },
    { name: 'Pink', primary: '#db2777', secondary: '#be185d' },
    { name: 'Teal', primary: '#0d9488', secondary: '#0f766e' },
    { name: 'Gray', primary: '#374151', secondary: '#1f2937' },
  ];

  const backgroundColors = [
    { name: 'White', color: '#ffffff' },
    { name: 'Light Gray', color: '#f8fafc' },
    { name: 'Cream', color: '#fefce8' },
    { name: 'Light Blue', color: '#eff6ff' },
  ];

  const textColors = [
    { name: 'Dark Gray', color: '#1f2937' },
    { name: 'Black', color: '#000000' },
    { name: 'Blue Gray', color: '#475569' },
    { name: 'Warm Gray', color: '#78716c' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Color Scheme</h3>

      {/* Color Presets */}
      <div>
        <h4 className="text-base font-medium text-gray-700 mb-3">Color Presets</h4>
        <div className="grid grid-cols-2 gap-2">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                onColorChange('primaryColor', preset.primary);
                onColorChange('secondaryColor', preset.secondary);
              }}
              className={`p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                cardStyle.primaryColor === preset.primary
                  ? 'border-gray-400'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: preset.secondary }}
                  />
                </div>
                <span className="text-sm font-medium">{preset.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="space-y-4">
        <h4 className="text-base font-medium text-gray-700">Custom Colors</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Primary Color</label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={cardStyle.primaryColor}
              onChange={(e) => onColorChange('primaryColor', e.target.value)}
              className="w-12 h-10 rounded-md border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={cardStyle.primaryColor}
              onChange={(e) => onColorChange('primaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Secondary Color</label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={cardStyle.secondaryColor}
              onChange={(e) => onColorChange('secondaryColor', e.target.value)}
              className="w-12 h-10 rounded-md border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={cardStyle.secondaryColor}
              onChange={(e) => onColorChange('secondaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
            />
          </div>
        </div>
      </div>

      {/* Background Colors */}
      <div>
        <h4 className="text-base font-medium text-gray-700 mb-3">Background</h4>
        <div className="grid grid-cols-2 gap-2">
          {backgroundColors.map((bg) => (
            <button
              key={bg.name}
              onClick={() => onColorChange('backgroundColor', bg.color)}
              className={`p-3 rounded-lg border-2 transition-all hover:shadow-sm ${
                cardStyle.backgroundColor === bg.color
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-6 h-6 rounded border border-gray-300"
                  style={{ backgroundColor: bg.color }}
                />
                <span className="text-sm font-medium">{bg.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Text Colors */}
      <div>
        <h4 className="text-base font-medium text-gray-700 mb-3">Text Color</h4>
        <div className="grid grid-cols-2 gap-2">
          {textColors.map((text) => (
            <button
              key={text.name}
              onClick={() => onColorChange('textColor', text.color)}
              className={`p-3 rounded-lg border-2 transition-all hover:shadow-sm ${
                cardStyle.textColor === text.color
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-6 h-6 rounded border border-gray-300"
                  style={{ backgroundColor: text.color }}
                />
                <span className="text-sm font-medium">{text.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;