import React from 'react';

interface ImageProps {
    src: string;
    alt?: string;
    width?: string;
    height?: string;
    className?: string;
    sizes?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, width, height, className, sizes }) => {
    return (
        <img 
            className={className} 
            loading="lazy" 
            width={width} 
            height={height} 
            decoding="async" 
            data-nimg="1"  
            src={src} 
            alt={alt}
            sizes={sizes}
        />
    );
};

export default Image;
