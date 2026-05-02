import { PureComponent } from 'react';

import fallbackImage from '@/assets/images/rick-and-morty-30973.webp';

import Button from './ui/button';

const FALLBACK_CONTENT = {
  TITLE: 'Oooooops! Something went wrong!',
  IMG_ALT: 'The main characters of Rick and Morty',
};

interface Props {
  onReturn: () => void;
}
class FallbackUI extends PureComponent<Props> {
  render() {
    const { onReturn } = this.props;
    return (
      <div className="mt-20 flex flex-col items-center gap-2">
        <h1 className="text-accent text-center text-3xl font-medium tracking-wide">
          {FALLBACK_CONTENT.TITLE}
        </h1>
        <img src={fallbackImage} alt={FALLBACK_CONTENT.IMG_ALT} width={350} />
        <Button text="Return back" type="button" onClick={onReturn} />
      </div>
    );
  }
}

export default FallbackUI;
