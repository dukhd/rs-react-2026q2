import { PureComponent } from 'react';

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
      <div className="flex flex-col items-center gap-2">
        <h1>{FALLBACK_CONTENT.TITLE}</h1>
        <img
          src="/src/assets/images/rick-and-morty-30973.webp"
          alt={FALLBACK_CONTENT.IMG_ALT}
        />
        <Button text="Return back" type="button" onClick={onReturn} />
      </div>
    );
  }
}

export default FallbackUI;
