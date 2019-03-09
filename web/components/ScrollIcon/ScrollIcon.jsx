import React, { memo } from 'react';
import './style.scss';

function ScrollIcon() {
  return (
    <div styleName="scroll-downs">
      <div styleName="mousey">
        <div styleName="scroller" />
      </div>
    </div>
  );
}

export default memo(ScrollIcon);
