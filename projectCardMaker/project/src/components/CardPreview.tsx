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
            borderLeft: `4px solid ${cardStyle.primaryColor}`,
          };
        case 'professional':
          return {
            ...baseStyles,
            borderTop: `3px solid ${cardStyle.primaryColor}`,
          };
        case 'creative':
          return {
            ...baseStyles,
            background: `${cardStyle.backgroundColor}`,
            position: 'relative' as const,
          };
        default:
          return baseStyles;
      }
    };

    const renderModernTemplate = () => (
      <div className="h-full flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">{cardData.name}</h2>
          <p className="text-lg opacity-90 mb-4">{cardData.title}</p>
          <p className="text-base opacity-80 font-medium">{cardData.company}</p>
        </div>
        <div className="space-y-2 text-sm opacity-90">
          {cardData.email && (
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{cardData.email}</span>
            </div>
          )}
          {cardData.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>{cardData.phone}</span>
            </div>
          )}
          {cardData.website && (
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>{cardData.website}</span>
            </div>
          )}
        </div>
      </div>
    );

    const renderMinimalTemplate = () => (
      <div className="h-full flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: cardStyle.primaryColor }}>
            {cardData.name}
          </h2>
          <p className="text-lg text-gray-600 mb-4">{cardData.title}</p>
          <p className="text-base font-medium text-gray-800">{cardData.company}</p>
        </div>
        <div className="space-y-1 text-sm text-gray-600">
          {cardData.email && <div>{cardData.email}</div>}
          {cardData.phone && <div>{cardData.phone}</div>}
          {cardData.website && <div>{cardData.website}</div>}
        </div>
      </div>
    );

    const renderProfessionalTemplate = () => (
      <div className="h-full p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2" style={{ color: cardStyle.primaryColor }}>
            {cardData.name}
          </h2>
          <p className="text-lg text-gray-600 mb-1">{cardData.title}</p>
          <p className="text-base font-medium text-gray-800">{cardData.company}</p>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          {cardData.email && (
            <div className="flex items-center justify-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{cardData.email}</span>
            </div>
          )}
          {cardData.phone && (
            <div className="flex items-center justify-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>{cardData.phone}</span>
            </div>
          )}
          {cardData.website && (
            <div className="flex items-center justify-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>{cardData.website}</span>
            </div>
          )}
          {cardData.address && (
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="text-center">{cardData.address}</span>
            </div>
          )}
        </div>
      </div>
    );

    const renderCreativeTemplate = () => (
      <div className="h-full relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10"
          style={{ backgroundColor: cardStyle.primaryColor, transform: 'translate(12px, -12px)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-16 h-16 rounded-full opacity-10"
          style={{ backgroundColor: cardStyle.secondaryColor, transform: 'translate(-8px, 8px)' }}
        />
        <div className="relative z-10 h-full flex flex-col justify-between p-6">
          <div>
            <h2 className="text-2xl font-bold mb-1" style={{ color: cardStyle.primaryColor }}>
              {cardData.name}
            </h2>
            <p className="text-lg mb-4" style={{ color: cardStyle.secondaryColor }}>
              {cardData.title}
            </p>
            <p className="text-base font-medium text-gray-800">{cardData.company}</p>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            {cardData.email && <div>{cardData.email}</div>}
            {cardData.phone && <div>{cardData.phone}</div>}
            {cardData.website && <div>{cardData.website}</div>}
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
      <div className="flex flex-col items-center space-y-4">
        <div
          ref={ref}
          className="w-96 h-56 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
          style={getTemplateStyles()}
        >
          {renderTemplate()}
        </div>
        <p className="text-sm text-gray-500">Business Card Preview (3.5" × 2")</p>
      </div>
    );
  }
);

CardPreview.displayName = 'CardPreview';

export default CardPreview;