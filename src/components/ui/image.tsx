import { PureComponent } from 'react';

import { type ImageSize, POSTER_SIZES } from '@/constants/image-variants';

interface ImageProps {
  alt: string;
  src: string;
  size: ImageSize;
  priority?: boolean;
}

class Image extends PureComponent<ImageProps> {
  render() {
    const { src, alt, size, priority = false } = this.props;

    const sizeClassName = POSTER_SIZES[size];

    return (
      <div className={`${sizeClassName} overflow-hidden rounded-l-xl`}>
        <figure>
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            className={`text-4 text-accent rounded-l-xl bg-gray-300 object-cover font-semibold tracking-wide transition-transform duration-500 ease-out hover:scale-110 ${sizeClassName}`}
          />
          <figcaption>{alt}</figcaption>
        </figure>
      </div>
    );
  }
}

export default Image;
