import React from 'react';

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
      name: 'Modern',
      description: 'Gradient background with white text',
      preview: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean white design with colored accent',
      preview: 'bg-white border-l-4 border-blue-500 text-gray-800',
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Centered layout with top border',
      preview: 'bg-white border-t-4 border-blue-500 text-gray-800',
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Decorative elements with modern styling',
      preview: 'bg-white text-gray-800 relative',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Choose Template</h3>
      <div className="grid grid-cols-1 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-8 rounded ${template.preview} flex-shrink-0 shadow-sm`}
              >
                {template.id === 'creative' && (
                  <>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full opacity-30 transform translate-x-1 -translate-y-1" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-purple-500 rounded-full opacity-30 transform -translate-x-1 translate-y-1" />
                  </>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{template.name}</h4>
                <p className="text-sm text-gray-500">{template.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;