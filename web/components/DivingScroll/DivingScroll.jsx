import React, {
  useState,
  useCallback,
  useRef,
  memo,
} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import WithThrottle from '../../../dist/index.esm';
import ScrollIcon from '../ScrollIcon';
import NumberWithSpinner from '../NumberWithSpinner';

import './style.scss';

const renderDepth = depth => (
  <NumberWithSpinner
    value={depth}
    styleName="depth-spinner"
  />
);

function DivingScroll({ wait }) {
  const container = useRef(null);
  const [depth, setDepth] = useState(0);
  const onScrollSetDepth = useCallback((e) => {
    setDepth(Math.floor(e.target.scrollTop));
  });

  const content = useRef(null);
  const mouseHidden = container.current
    && (depth + container.current.clientHeight >= content.current.clientHeight);

  return (
    <div styleName="diving-scroll">
      <div styleName={cx('mouse', { hidden: mouseHidden })}>
        <ScrollIcon />
      </div>
      <div
        styleName="container"
        ref={container}
        onScroll={onScrollSetDepth}
      >
        <div ref={content} />
      </div>
      <WithThrottle wait={wait} value={depth}>
        {renderDepth}
      </WithThrottle>
    </div>
  );
}

DivingScroll.propTypes = {
  wait: PropTypes.number.isRequired,
};

export default memo(DivingScroll);
