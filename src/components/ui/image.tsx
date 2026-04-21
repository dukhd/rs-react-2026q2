import { PureComponent } from 'react';

import { type ImageSize, POSTER_SIZES } from '@/constants/image-variants';

interface ImageProps {
  alt: string;
  src: string;
  size: ImageSize;
  className?: string;
}

class Image extends PureComponent<ImageProps> {
  render() {
    const { src, alt, size, className = '' } = this.props;

    const sizeClassName = POSTER_SIZES[size];
    const baseClassName = `cursor-pointer object-cover ${sizeClassName}`;

    return (
      <img src={src} alt={alt} className={`${baseClassName} ${className}`} />
    );
  }
}

export default Image;
