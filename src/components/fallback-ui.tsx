import { PureComponent } from 'react';

import Button from './ui/button';

interface Props {
  onReturn: () => void;
}
class FallbackUI extends PureComponent<Props> {
  render() {
    const { onReturn } = this.props;
    return (
      <div className="flex flex-col items-center gap-2">
        <h1>Oooooops! Something went wrong!</h1>
        <Button text="Return back" type="button" onClick={onReturn} />
      </div>
    );
  }
}

export default FallbackUI;
