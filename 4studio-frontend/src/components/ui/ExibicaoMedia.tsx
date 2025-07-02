import React from 'react';
import Image from 'next/image';

type ExibicaoMediaProps = {
  tipo: 'imagem' | 'audio' | 'video';
  src: string;
  alt?: string;
  aspectRatio?: '1/1' | '4/3' | '16/9' | '21/9';
  className?: string;
  previewImage?: string;
};

/**
 * Componente responsivo para exibição de mídias (imagens, áudios, vídeos)
 * Implementa abordagem mobile-first com proporções apropriadas
 */
const ExibicaoMedia: React.FC<ExibicaoMediaProps> = ({
  tipo,
  src,
  alt = '',
  aspectRatio = '16/9',
  className = '',
  previewImage
}) => {
  const aspectRatioClasses = {
    '1/1': 'aspect-w-1 aspect-h-1',
    '4/3': 'aspect-w-4 aspect-h-3',
    '16/9': 'aspect-w-16 aspect-h-9',
    '21/9': 'aspect-w-21 aspect-h-9',
  };
  
  const containerClass = `relative ${aspectRatioClasses[aspectRatio]} w-full overflow-hidden rounded-lg ${className}`;
  
  switch (tipo) {
    case 'imagem':
      return (
        <div className={containerClass}>
          <div>
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
              loading="lazy"
            />
          </div>
        </div>
      );
    
    case 'audio':
      return (
        <div className={`${className} rounded-lg overflow-hidden bg-white shadow-md p-3`}>
          <div className="flex flex-col xs:flex-row items-center gap-3">
            {previewImage && (
              <div className="w-full xs:w-1/4 sm:w-1/6 shrink-0">
                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded">
                  <Image
                    src={previewImage}
                    alt={alt || "Visualização do áudio"}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            <div className="w-full grow">
              <audio
                controls
                className="w-full focus:outline-none"
                preload="metadata"
              >
                <source src={src} type="audio/mpeg" />
                Seu navegador não suporta o elemento de áudio.
              </audio>
            </div>
          </div>
        </div>
      );
    
    case 'video':
      return (
        <div className={containerClass}>
          <video
            controls
            playsInline // Melhor para experiência mobile
            poster={previewImage}
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={src} type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>
      );
    
    default:
      return null;
  }
};

export default ExibicaoMedia;
