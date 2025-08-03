import React from 'react';

interface FontSelectorProps {
  selectedFont: string;
  onFontChange: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ selectedFont, onFontChange }) => {
  const fonts = [
    { name: 'Inter', family: 'Inter, sans-serif', category: 'Sans Serif' },
    { name: 'Roboto', family: 'Roboto, sans-serif', category: 'Sans Serif' },
    { name: 'Open Sans', family: 'Open Sans, sans-serif', category: 'Sans Serif' },
    { name: 'Lato', family: 'Lato, sans-serif', category: 'Sans Serif' },
    { name: 'Montserrat', family: 'Montserrat, sans-serif', category: 'Sans Serif' },
    { name: 'Playfair Display', family: 'Playfair Display, serif', category: 'Serif' },
    { name: 'Merriweather', family: 'Merriweather, serif', category: 'Serif' },
    { name: 'Source Code Pro', family: 'Source Code Pro, monospace', category: 'Monospace' },
  ];

  return (
    <div>
      <h4 className="text-base font-semibold text-gray-900 mb-3">Typography</h4>
      <div className="grid grid-cols-1 gap-2">
        {fonts.map((font) => (
          <button
            key={font.name}
            onClick={() => onFontChange(font.name)}
            className={`p-3 text-left rounded-lg border transition-all hover:shadow-sm ${
              selectedFont === font.name
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{ fontFamily: font.family }}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{font.name}</span>
              <span className="text-xs text-gray-500">{font.category}</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              The quick brown fox jumps
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontSelector;