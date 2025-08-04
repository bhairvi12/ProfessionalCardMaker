import React from 'react';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
}) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern Gradient',
      description: 'Bold gradient with elegant typography',
      preview: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white',
      accent: 'from-indigo-500 to-purple-600',
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Clean white design with subtle accents',
      preview: 'bg-white border-l-4 border-indigo-500 text-gray-800',
      accent: 'from-indigo-500 to-indigo-600',
    },
    {
      id: 'professional',
      name: 'Corporate Pro',
      description: 'Traditional business card layout',
      preview: 'bg-white border-t-4 border-blue-600 text-gray-800',
      accent: 'from-blue-600 to-blue-700',
    },
    {
      id: 'creative',
      name: 'Creative Flow',
      description: 'Artistic elements with modern flair',
      preview: 'bg-gradient-to-br from-pink-50 to-purple-50 text-gray-800',
      accent: 'from-pink-500 to-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Choose Your Style</h3>
        <p className="text-gray-600 text-sm">Select a template that matches your brand</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`group relative p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-300 hover:scale-[1.02] ${
              selectedTemplate === template.id
                ? 'border-indigo-400 bg-white/60 backdrop-blur-sm shadow-xl'
                : 'border-white/30 bg-white/20 hover:border-white/50 hover:bg-white/40'
            }`}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <div
                  className={`w-12 h-8 sm:w-16 sm:h-10 rounded-md sm:rounded-lg ${template.preview} flex-shrink-0 shadow-lg border border-white/20`}
                >
                  {template.id === 'creative' && (
                    <>
                      <div className="absolute top-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full opacity-60 transform translate-x-1 -translate-y-1" />
                      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full opacity-60 transform -translate-x-1 translate-y-1" />
                    </>
                  )}
                </div>
                {selectedTemplate === template.id && (
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors">
                  {template.name}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">{template.description}</p>
              </div>
            </div>

            {selectedTemplate === template.id && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pointer-events-none" />
            )}
          </button>
        ))}
      </div>

      <div className="bg-white/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/30">
        <h4 className="font-semibold text-gray-800 mb-2">💡 Pro Tip</h4>
        <p className="text-xs sm:text-sm text-gray-600">
          Each template is fully customizable. Choose the one that best fits your style, then personalize colors and fonts.
        </p>
      </div>
    </div>
  );
};

export default TemplateSelector;