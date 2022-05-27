/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

const StringInput = ({
  title,
  subtext,
  placeholder,
  register,
  disabled,
  control,
}) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-2xl text-white">{title}</span>
        </label>
        <label className="label">
          <span className="label-text-alt  text-gray-400">{subtext}</span>
        </label>
        <input
          type="text"
          placeholder={placeholder}
          className="
          input w-full focus:ring-0 border-0 border-b-2 rounded-none p-0 px-1 border-white text-white bg-minsk
          disabled:bg-minsk disabled:text-white
        "
          {...register}
          disabled={disabled}
          control={control}
        />
      </div>
    </div>
  );
};

StringInput.propTypes = {
  title: PropTypes.string.isRequired,
  subtext: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  register: PropTypes.shape().isRequired,
  disabled: PropTypes.bool,
  control: PropTypes.shape().isRequired,
};

StringInput.defaultProps = {
  disabled: false,
};

export default StringInput;
