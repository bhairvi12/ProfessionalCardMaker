import React, { useState } from 'react';
import { Download, FileImage, Printer, Share2, Sparkles, Info } from 'lucide-react';
import { CardData, CardStyle } from '../App';
import html2canvas from 'html2canvas';


interface ExportToolsProps {
  cardRef: React.RefObject<HTMLDivElement>;
  cardData: CardData;
  cardStyle: CardStyle;
}

const ExportTools: React.FC<ExportToolsProps> = ({ cardRef, cardData, cardStyle }) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportAsPNG = async () => {
  if (!cardRef.current) return;

  setIsExporting(true);
  try {
     const clone = cardRef.current.cloneNode(true) as HTMLElement;
document.body.appendChild(clone); // Temporarily add to DOM for rendering

clone.style.position = 'absolute';
clone.style.top = '-10000px'; // Hide it from view
clone.style.left = '-10000px';

const canvas = await html2canvas(clone, {
  scale: 3,
  useCORS: true,
  backgroundColor: null,
});

document.body.removeChild(clone); // Clean up after rendering


    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${cardData.name.replace(/\s+/g, '_')}_business_card.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error('Export failed:', error);
  } finally {
    setIsExporting(false);
  }
};

  const printCard = () => {
    if (!cardRef.current) return;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const cardHTML = cardRef.current.outerHTML;
      printWindow.document.write(`
        <html>
          <head>
            <title>Business Card - ${cardData.name}</title>
            <style>
              body { margin: 0; padding: 20px; background: white; }
              @media print {
                body { margin: 0; padding: 0; }
                .card { width: 3.5in; height: 2in; page-break-after: always; }
              }
            </style>
          </head>
          <body>
            ${cardHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const shareCard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cardData.name} - Business Card`,
          text: `Check out ${cardData.name}'s business card: ${cardData.title} at ${cardData.company}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      const cardInfo = `${cardData.name}\n${cardData.title}\n${cardData.company}\n${cardData.email}\n${cardData.phone}`;
      navigator.clipboard.writeText(cardInfo);
      alert('Card information copied to clipboard!');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
          <Download className="w-5 h-5 text-indigo-500" />
          <span>Export & Share</span>
        </h3>
        <p className="text-gray-600 text-sm">Download or share your professional card</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={exportAsPNG}
          disabled={isExporting}
          className="group w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
        >
          <FileImage className="w-5 h-5" />
          <span className="font-semibold">
            {isExporting ? 'Exporting...' : 'Download as PNG'}
          </span>
          {!isExporting && <Sparkles className="w-4 h-4 opacity-70" />}
        </button>

        <button
          onClick={printCard}
          className="group w-full flex items-center justify-center space-x-3 px-6 py-4 bg-white/50 backdrop-blur-sm hover:bg-white/70 text-gray-700 hover:text-gray-900 rounded-2xl transition-all duration-300 hover:scale-[1.02] border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl"
        >
          <Printer className="w-5 h-5" />
          <span className="font-semibold">Print Card</span>
        </button>

        <button
          onClick={shareCard}
          className="group w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
        >
          <Share2 className="w-5 h-5" />
          <span className="font-semibold">Share Card</span>
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
          <Info className="w-4 h-4 text-indigo-500" />
          <span>Export Guidelines</span>
        </h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
            <span>PNG format provides the best quality for digital sharing</span>
          </li>
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
            <span>Print on premium business card stock (350gsm recommended)</span>
          </li>
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
            <span>Standard size: 3.5" × 2" (89mm × 51mm)</span>
          </li>
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
            <span>Consider ordering in bulk for better pricing</span>
          </li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>Card Specifications</span>
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Dimensions:</span>
            <p className="text-gray-600">3.5" × 2" (Standard)</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Resolution:</span>
            <p className="text-gray-600">300 DPI (Print Quality)</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Template:</span>
            <p className="text-gray-600 capitalize">{cardStyle.template}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Font:</span>
            <p className="text-gray-600">{cardStyle.font}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportTools;