import React, { memo } from 'react';
import './style.scss';

function ScrollIcon() {
  return (
    <div className="scroll-downs">
      <div className="mousey">
        <div className="scroller" />
      </div>
    </div>
  );
}

export default memo(ScrollIcon);
