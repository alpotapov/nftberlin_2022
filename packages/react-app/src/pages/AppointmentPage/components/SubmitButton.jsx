/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const withButtonStyle = (color) =>
  `btn rounded-md text-md font-bold bg-${color} border-${color}`;

const SubmitButton = ({
  onClick,
  disabled,
  children,
  className,
  variation,
  type,
}) => {
  return (
    <button
      type={type}
      className={`${className} ${withButtonStyle(variation)}`}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex-grow">{children}</div>
      </div>
    </button>
  );
};

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variation: PropTypes.oneOf(['heliotrope', 'saffron-mango']),
  type: PropTypes.oneOf(['submit', 'button']),
};

SubmitButton.defaultProps = {
  disabled: false,
  className: '',
  variation: 'heliotrope',
  type: 'button',
};

export default SubmitButton;
