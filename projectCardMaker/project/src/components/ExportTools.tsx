import React, { useState } from 'react';
import { Download, FileImage, Printer, Share2 } from 'lucide-react';
import { CardData, CardStyle } from '../App';

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
      // Create a canvas to render the card
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size (business card standard: 3.5" x 2" at 300 DPI)
      canvas.width = 1050; // 3.5" * 300 DPI
      canvas.height = 600;  // 2" * 300 DPI
      
      if (ctx) {
        // Create a simple card representation
        const cardElement = cardRef.current;
        const rect = cardElement.getBoundingClientRect();
        
        // Scale to canvas size
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        // For now, create a simple representation
        // In a real app, you'd use html2canvas or similar library
        ctx.fillStyle = cardStyle.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add text (simplified)
        ctx.fillStyle = cardStyle.textColor;
        ctx.font = '48px Arial';
        ctx.fillText(cardData.name, 50, 100);
        
        ctx.font = '24px Arial';
        ctx.fillText(cardData.title, 50, 150);
        ctx.fillText(cardData.company, 50, 200);
        
        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${cardData.name.replace(/\s+/g, '_')}_business_card.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
        });
      }
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
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Export & Share</h3>

      <div className="space-y-3">
        <button
          onClick={exportAsPNG}
          disabled={isExporting}
          className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
        >
          <FileImage className="w-5 h-5" />
          <span>{isExporting ? 'Exporting...' : 'Download as PNG'}</span>
        </button>

        <button
          onClick={printCard}
          className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          <Printer className="w-5 h-5" />
          <span>Print Card</span>
        </button>

        <button
          onClick={shareCard}
          className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span>Share Card</span>
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Export Tips</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• PNG format is ideal for digital sharing</li>
          <li>• Print on standard business card stock (3.5" × 2")</li>
          <li>• Use high-quality paper for best results</li>
          <li>• Consider printing in bulk for cost savings</li>
        </ul>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Card Information</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <div><strong>Dimensions:</strong> 3.5" × 2" (Standard)</div>
          <div><strong>Resolution:</strong> 300 DPI (Print Quality)</div>
          <div><strong>Template:</strong> {cardStyle.template}</div>
          <div><strong>Font:</strong> {cardStyle.font}</div>
        </div>
      </div>
    </div>
  );
};

export default ExportTools;