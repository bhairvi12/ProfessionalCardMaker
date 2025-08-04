import React, { useState, useRef } from 'react';
import { Download, Palette, Type, Layout, RotateCcw, RotateCw, Sparkles } from 'lucide-react';
import CardPreview from './components/CardPreview';
import TemplateSelector from './components/TemplateSelector';
import TextEditor from './components/TextEditor';
import ColorPicker from './components/ColorPicker';
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
    primaryColor: '#6366f1',
    secondaryColor: '#4f46e5',
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
    { id: 'template', label: 'Templates', icon: Layout },
    { id: 'text', label: 'Content', icon: Type },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'export', label: 'Export', icon: Download }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Professional Business Card Maker
                </h1>
                <p className="text-sm text-gray-500 font-medium">Create stunning cards in minutes</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 bg-white/50 backdrop-blur-sm rounded-xl p-1 border border-white/30">
                <button
                  onClick={undo}
                  disabled={historyIndex === 0}
                  className="p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-white/70 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all duration-200"
                  title="Undo"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={redo}
                  disabled={historyIndex === history.length - 1}
                  className="p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-white/70 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all duration-200"
                  title="Redo"
                >
                  <RotateCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:gap-8 min-h-[calc(100vh-140px)]">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="backdrop-blur-xl bg-white/40 rounded-2xl lg:rounded-3xl border border-white/30 shadow-2xl overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-white/20 bg-white/20">
                <nav className="flex">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 py-3 sm:py-4 px-2 sm:px-3 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                          activeTab === tab.id
                            ? 'text-indigo-600 bg-white/60 backdrop-blur-sm shadow-lg'
                            : 'text-gray-600 hover:text-indigo-500 hover:bg-white/30'
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden xs:inline sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-6 lg:p-8 max-h-[60vh] lg:max-h-[calc(100vh-240px)] overflow-y-auto scrollbar-hide">
                <div className="transform transition-all duration-500 ease-out">
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
          </div>

          {/* Right Panel - Card Preview */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="backdrop-blur-xl bg-white/40 rounded-2xl lg:rounded-3xl border border-white/30 shadow-2xl flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-[400px] lg:min-h-[calc(100vh-200px)]">
              <div className="w-full max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Live Preview</h2>
                  <p className="text-sm sm:text-base text-gray-600">See your changes in real-time</p>
                </div>
                
                <div className="flex justify-center">
                  <div className="transform hover:scale-105 transition-transform duration-300 w-full max-w-lg">
                    <CardPreview
                      ref={cardRef}
                      cardData={cardData}
                      cardStyle={cardStyle}
                    />
                  </div>
                </div>

                <div className="mt-6 lg:mt-8 text-center">
                  <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Auto-saving changes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default App;