import React from 'react';
import './style.scss';

function ForkTag() {
  return (
    <a
      styleName="fork-tag"
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/AlbertLucianto/react-with-throttle"
    >
      <img
        src="https://image.flaticon.com/icons/svg/25/25231.svg"
        styleName="github-icon"
        alt=""
      />
      <div styleName="fork-tag__description">Fork me</div>
    </a>
  );
}

export default ForkTag;
