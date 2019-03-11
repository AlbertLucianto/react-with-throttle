import cx from 'classnames';
import React, {
  memo,
  useCallback,
  useRef,
  useState,
} from 'react';
import WithThrottle from 'react-with-throttle';
import NumberWithSpinner from '../NumberWithSpinner';
import ScrollIcon from '../ScrollIcon';
import './style.scss';

interface IDivingScrollProps {
  wait: number;
}

const renderDepth = (depth: number) => (
  <NumberWithSpinner
    value={depth}
    className="depth-spinner"
  />
);

function DivingScroll({ wait }: IDivingScrollProps) {
  const container = useRef(null);
  const [depth, setDepth] = useState(0);
  const onScrollSetDepth = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setDepth(Math.floor((e.target as HTMLDivElement).scrollTop));
  }, []);

  const content = useRef(null);
  const mouseHidden = container.current
    && (depth + container.current.clientHeight >= content.current.clientHeight);

  return (
    <div className="diving-scroll">
      <div className={cx('mouse', { hidden: mouseHidden })}>
        <ScrollIcon />
      </div>
      <div
        className="container"
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

export default memo(DivingScroll);
