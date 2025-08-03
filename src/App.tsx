import React, { useState, useRef } from 'react';
import { Download, Palette, Type, Layout, RotateCcw, RotateCw } from 'lucide-react';
import CardPreview from './components/CardPreview';
import TemplateSelector from './components/TemplateSelector';
import TextEditor from './components/TextEditor';
import ColorPicker from './components/ColorPicker';
import FontSelector from './components/FontSelector';
import ExportTools from './components/ExportTools';

export interface CardData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

export interface CardStyle {
  template: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  font: string;
}

function App() {
  const [cardData, setCardData] = useState<CardData>({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    address: ''
  });

  const [cardStyle, setCardStyle] = useState<CardStyle>({
    template: 'modern',
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    font: 'Inter'
  });

  const [activeTab, setActiveTab] = useState('template');
  const [history, setHistory] = useState([{ cardData, cardStyle }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);

  const updateCardData = (field: keyof CardData, value: string) => {
    const newData = { ...cardData, [field]: value };
    setCardData(newData);
    addToHistory({ cardData: newData, cardStyle });
  };

  const updateCardStyle = (field: keyof CardStyle, value: string) => {
    const newStyle = { ...cardStyle, [field]: value };
    setCardStyle(newStyle);
    addToHistory({ cardData, cardStyle: newStyle });
  };

  const addToHistory = (state: { cardData: CardData; cardStyle: CardStyle }) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(state);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setCardData(history[prevIndex].cardData);
      setCardStyle(history[prevIndex].cardStyle);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setCardData(history[nextIndex].cardData);
      setCardStyle(history[nextIndex].cardStyle);
    }
  };

  const tabs = [
    { id: 'template', label: 'Template', icon: Layout },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'export', label: 'Export', icon: Download }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Layout className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Professional Card Maker</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={undo}
                disabled={historyIndex === 0}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Undo"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={redo}
                disabled={historyIndex === history.length - 1}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Redo"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-slate-200">
                <nav className="flex">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'template' && (
                  <TemplateSelector
                    selectedTemplate={cardStyle.template}
                    onTemplateChange={(template) => updateCardStyle('template', template)}
                  />
                )}

                {activeTab === 'text' && (
                  <TextEditor
                    cardData={cardData}
                    onUpdateField={updateCardData}
                    selectedFont={cardStyle.font}
                    onFontChange={(font) => updateCardStyle('font', font)}
                  />
                )}

                {activeTab === 'colors' && (
                  <ColorPicker
                    cardStyle={cardStyle}
                    onColorChange={updateCardStyle}
                  />
                )}

                {activeTab === 'export' && (
                  <ExportTools
                    cardRef={cardRef}
                    cardData={cardData}
                    cardStyle={cardStyle}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Card Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center justify-center min-h-[400px]">
                <CardPreview
                  ref={cardRef}
                  cardData={cardData}
                  cardStyle={cardStyle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;