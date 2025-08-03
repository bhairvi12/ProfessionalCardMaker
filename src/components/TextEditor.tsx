import React from 'react';
import { CardData } from '../App';
import FontSelector from './FontSelector';

interface TextEditorProps {
  cardData: CardData;
  onUpdateField: (field: keyof CardData, value: string) => void;
  selectedFont: string;
  onFontChange: (font: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  cardData,
  onUpdateField,
  selectedFont,
  onFontChange,
}) => {
  const fields = [
    { key: 'name' as keyof CardData, label: 'Full Name', placeholder: 'Enter your full name' },
    { key: 'title' as keyof CardData, label: 'Job Title', placeholder: 'Enter your job title' },
    { key: 'company' as keyof CardData, label: 'Company', placeholder: 'Enter company name' },
    { key: 'email' as keyof CardData, label: 'Email', placeholder: 'Enter email address' },
    { key: 'phone' as keyof CardData, label: 'Phone', placeholder: 'Enter phone number' },
    { key: 'website' as keyof CardData, label: 'Website', placeholder: 'Enter website URL' },
    { key: 'address' as keyof CardData, label: 'Address', placeholder: 'Enter business address' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Text Content</h3>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type="text"
                value={cardData[field.key]}
                onChange={(e) => onUpdateField(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <FontSelector
          selectedFont={selectedFont}
          onFontChange={onFontChange}
        />
      </div>
    </div>
  );
};

export default TextEditor;