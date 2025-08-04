import React, { forwardRef } from 'react';
import { CardData, CardStyle } from '../App';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface CardPreviewProps {
  cardData: CardData;
  cardStyle: CardStyle;
}

const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(
  ({ cardData, cardStyle }, ref) => {
    const getTemplateStyles = () => {
      const baseStyles = {
        fontFamily: cardStyle.font,
        backgroundColor: cardStyle.backgroundColor,
        color: cardStyle.textColor,
      };

      switch (cardStyle.template) {
        case 'modern':
          return {
            ...baseStyles,
            background: `linear-gradient(135deg, ${cardStyle.primaryColor} 0%, ${cardStyle.secondaryColor} 100%)`,
            color: 'white',
          };
        case 'minimal':
          return {
            ...baseStyles,
            borderLeft: `6px solid ${cardStyle.primaryColor}`,
          };
        case 'professional':
          return {
            ...baseStyles,
            borderTop: `4px solid ${cardStyle.primaryColor}`,
          };
        case 'creative':
          return {
            ...baseStyles,
            background: `linear-gradient(135deg, ${cardStyle.backgroundColor} 0%, ${cardStyle.backgroundColor}f0 100%)`,
            position: 'relative' as const,
          };
        default:
          return baseStyles;
      }
    };

    const renderModernTemplate = () => (
      <div className="h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-white/10 rounded-full transform translate-x-10 sm:translate-x-16 -translate-y-10 sm:-translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full transform -translate-x-8 sm:-translate-x-12 translate-y-8 sm:translate-y-12"></div>
        
        <div className="relative z-10">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 leading-tight">{cardData.name}</h2>
          <p className="text-sm sm:text-lg lg:text-xl opacity-90 mb-2 sm:mb-4 font-medium">{cardData.title}</p>
          <p className="text-sm sm:text-base lg:text-lg opacity-80 font-semibold">{cardData.company}</p>
        </div>
        
        <div className="space-y-1 sm:space-y-2 lg:space-y-3 text-xs sm:text-sm lg:text-base opacity-90 relative z-10">
          {cardData.email && (
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" />
              <span className="truncate">{cardData.email}</span>
            </div>
          )}
          {cardData.phone && (
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" />
              <span>{cardData.phone}</span>
            </div>
          )}
          {cardData.website && (
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Globe className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" />
              <span className="truncate">{cardData.website}</span>
            </div>
          )}
        </div>
      </div>
    );

    const renderMinimalTemplate = () => (
      <div className="h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8">
        <div>
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 leading-tight" style={{ color: cardStyle.primaryColor }}>
            {cardData.name}
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 mb-2 sm:mb-4 font-medium">{cardData.title}</p>
          <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">{cardData.company}</p>
        </div>
        <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
          {cardData.email && <div className="font-medium">{cardData.email}</div>}
          {cardData.phone && <div className="font-medium">{cardData.phone}</div>}
          {cardData.website && <div className="font-medium">{cardData.website}</div>}
        </div>
      </div>
    );

    const renderProfessionalTemplate = () => (
      <div className="h-full p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight" style={{ color: cardStyle.primaryColor }}>
            {cardData.name}
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 mb-1 sm:mb-2 font-medium">{cardData.title}</p>
          <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">{cardData.company}</p>
        </div>
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
          {cardData.email && (
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium">{cardData.email}</span>
            </div>
          )}
          {cardData.phone && (
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium">{cardData.phone}</span>
            </div>
          )}
          {cardData.website && (
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium">{cardData.website}</span>
            </div>
          )}
          {cardData.address && (
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-center font-medium">{cardData.address}</span>
            </div>
          )}
        </div>
      </div>
    );

    const renderCreativeTemplate = () => (
      <div className="h-full relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 rounded-full opacity-20"
          style={{ 
            backgroundColor: cardStyle.primaryColor, 
            transform: 'translate(10px, -10px) sm:translate(16px, -16px)',
            background: `linear-gradient(135deg, ${cardStyle.primaryColor} 0%, ${cardStyle.secondaryColor} 100%)`
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full opacity-15"
          style={{ 
            backgroundColor: cardStyle.secondaryColor, 
            transform: 'translate(-8px, 8px) sm:translate(-10px, 10px)' 
          }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 rounded-full opacity-10"
          style={{ backgroundColor: cardStyle.primaryColor }}
        />
        
        <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8">
          <div>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 leading-tight" style={{ color: cardStyle.primaryColor }}>
              {cardData.name}
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl mb-2 sm:mb-4 font-medium" style={{ color: cardStyle.secondaryColor }}>
              {cardData.title}
            </p>
            <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">{cardData.company}</p>
          </div>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
            {cardData.email && <div className="font-medium">{cardData.email}</div>}
            {cardData.phone && <div className="font-medium">{cardData.phone}</div>}
            {cardData.website && <div className="font-medium">{cardData.website}</div>}
          </div>
        </div>
      </div>
    );

    const renderTemplate = () => {
      switch (cardStyle.template) {
        case 'modern':
          return renderModernTemplate();
        case 'minimal':
          return renderMinimalTemplate();
        case 'professional':
          return renderProfessionalTemplate();
        case 'creative':
          return renderCreativeTemplate();
        default:
          return renderModernTemplate();
      }
    };

    return (
      <div className="flex flex-col items-center space-y-6">
        <div
          ref={ref}
          className="w-full max-w-[480px] h-[240px] sm:h-[280px] rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] border border-white/20 mx-auto"
          style={getTemplateStyles()}
        >
          {renderTemplate()}
        </div>
        
        <div className="text-center">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Business Card Preview</p>
          <p className="text-xs text-gray-500">Standard Size: 3.5" × 2" (89mm × 51mm)</p>
        </div>
      </div>
    );
  }
);

CardPreview.displayName = 'CardPreview';

export default CardPreview;