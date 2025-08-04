import React from 'react';
import { Type, Check } from 'lucide-react';

interface FontSelectorProps {
  selectedFont: string;
  onFontChange: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ selectedFont, onFontChange }) => {
  const fonts = [
    { name: 'Inter', family: 'Inter, sans-serif', category: 'Modern Sans', description: 'Clean and professional' },
    { name: 'Roboto', family: 'Roboto, sans-serif', category: 'Google Sans', description: 'Friendly and readable' },
    { name: 'Open Sans', family: 'Open Sans, sans-serif', category: 'Humanist', description: 'Neutral and clear' },
    { name: 'Lato', family: 'Lato, sans-serif', category: 'Geometric', description: 'Warm and approachable' },
    { name: 'Montserrat', family: 'Montserrat, sans-serif', category: 'Geometric', description: 'Bold and modern' },
    { name: 'Playfair Display', family: 'Playfair Display, serif', category: 'Serif', description: 'Elegant and refined' },
    { name: 'Merriweather', family: 'Merriweather, serif', category: 'Serif', description: 'Traditional and trustworthy' },
    { name: 'Source Code Pro', family: 'Source Code Pro, monospace', category: 'Monospace', description: 'Technical and precise' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center space-x-2">
          <Type className="w-5 h-5 text-indigo-500" />
          <span>Typography</span>
        </h4>
        <p className="text-gray-600 text-sm">Choose a font that reflects your personality</p>
      </div>
      
      <div className="space-y-3">
        {fonts.map((font) => (
          <button
            key={font.name}
            onClick={() => onFontChange(font.name)}
            className={`group w-full p-4 text-left rounded-2xl border-2 transition-all duration-300 hover:scale-[1.01] ${
              selectedFont === font.name
                ? 'border-indigo-400 bg-white/60 backdrop-blur-sm shadow-xl'
                : 'border-white/30 bg-white/20 hover:border-white/50 hover:bg-white/40'
            }`}
            style={{ fontFamily: font.family }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {font.name}
                  </span>
                  {selectedFont === font.name && (
                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                    {font.category}
                  </span>
                  <span className="text-xs text-gray-500">{font.description}</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
        <h4 className="font-semibold text-gray-800 mb-2">🎨 Font Tips</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Sans-serif fonts work best for business cards</li>
          <li>• Ensure readability at small sizes</li>
          <li>• Match your font to your industry style</li>
        </ul>
      </div>
    </div>
  );
};

export default FontSelector;