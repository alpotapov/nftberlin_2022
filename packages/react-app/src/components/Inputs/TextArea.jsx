import React from 'react';
import PropTypes from 'prop-types';

const TextAreaInput = ({ title, subtext, placeholder, register }) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="form-control">
        <label className="label">
          <span className="label-text text-2xl text-white">{title}</span>
        </label>
        <label className="label">
          <span className="label-text-alt text-gray-400">{subtext}</span>
        </label>
        <textarea
          className="textarea focus:ring-0 border-0 border-b-2 rounded-none p-0 px-1 border-white bg-minsk text-white h-32"
          placeholder={placeholder}
          {...register}
        />
      </div>
    </div>
  );
};

TextAreaInput.propTypes = {
  title: PropTypes.string.isRequired,
  subtext: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  register: PropTypes.shape().isRequired,
};

export default TextAreaInput;
