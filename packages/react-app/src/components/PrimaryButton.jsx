/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const withButtonStyle = (color) =>
  `btn rounded-md text-md font-bold bg-${color} border-${color}`;

const PrimaryButton = ({
  onClick,
  disabled,
  children,
  className,
  icon,
  variation,
  type,
  smallTX,
}) => {
  return (
    <button
      type={type}
      className={`${className} ${withButtonStyle(variation)}`}
      disabled={disabled}
      onClick={onClick}
    >
      <div
        className={`${
          smallTX ? 'text-xs' : ''
        } w-full flex flex-row justify-between items-center`}
      >
        {icon ? (
          <img
            src={icon}
            alt="Button Icon"
            className={`flex-shrink ${smallTX ? 'w-4' : 'w-6'}`}
          />
        ) : null}
        <div className="flex-grow">{children}</div>
      </div>
    </button>
  );
};

PrimaryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  icon: PropTypes.node,
  variation: PropTypes.oneOf(['heliotrope', 'saffron-mango']),
  type: PropTypes.oneOf(['submit', 'button']),
  smallTX: PropTypes.bool,
};

PrimaryButton.defaultProps = {
  disabled: false,
  className: '',
  icon: undefined,
  variation: 'heliotrope',
  type: 'button',
  smallTX: false,
};

export default PrimaryButton;
