import React from 'react';
import { CardData } from '../App';
import FontSelector from './FontSelector';
import { User, Briefcase, Building, Mail, Phone, Globe, MapPin } from 'lucide-react';

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
    { key: 'name' as keyof CardData, label: 'Full Name', placeholder: 'Enter your full name', icon: User },
    { key: 'title' as keyof CardData, label: 'Job Title', placeholder: 'Enter your job title', icon: Briefcase },
    { key: 'company' as keyof CardData, label: 'Company', placeholder: 'Enter company name', icon: Building },
    { key: 'email' as keyof CardData, label: 'Email', placeholder: 'Enter email address', icon: Mail },
    { key: 'phone' as keyof CardData, label: 'Phone', placeholder: 'Enter phone number', icon: Phone },
    { key: 'website' as keyof CardData, label: 'Website', placeholder: 'Enter website URL', icon: Globe },
    { key: 'address' as keyof CardData, label: 'Address', placeholder: 'Enter business address', icon: MapPin },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Card Content</h3>
        <p className="text-gray-600 text-sm">Fill in your professional details</p>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                <Icon className="w-4 h-4 text-indigo-500" />
                <span>{field.label}</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardData[field.key]}
                  onChange={(e) => onUpdateField(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-white/20 pt-6 sm:pt-8">
        <FontSelector
          selectedFont={selectedFont}
          onFontChange={onFontChange}
        />
      </div>

      <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/30">
        <h4 className="font-semibold text-gray-800 mb-2">✨ Quick Tips</h4>
        <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
          <li>• Keep your name prominent and easy to read</li>
          <li>• Use a professional email address</li>
          <li>• Include only essential contact information</li>
        </ul>
      </div>
    </div>
  );
};

export default TextEditor;