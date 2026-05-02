import { PureComponent } from 'react';

import { type ImageSize, POSTER_SIZES } from '@/constants/image-variants';

interface ImageProps {
  alt: string;
  src: string;
  size: ImageSize;
}

class Image extends PureComponent<ImageProps> {
  render() {
    const { src, alt, size } = this.props;

    const sizeClassName = POSTER_SIZES[size];

    return (
      <div className={`${sizeClassName} overflow-hidden rounded-l-xl`}>
        <img
          src={src}
          alt={alt}
          className={`text-4 text-accent rounded-l-xl bg-gray-300 object-cover font-semibold tracking-wide transition-transform duration-500 ease-out hover:scale-110 ${sizeClassName}`}
        />
      </div>
    );
  }
}

export default Image;
