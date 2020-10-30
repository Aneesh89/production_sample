import React, { useState, useEffect } from 'react'; 
import Select from 'react-select';

const RSelect = props => {
  const { input, options } = props;

  const handleBlur = () => {
    setTimeout(() => {
      const { input } = props;
      input.onBlur(input.value);
    }, 1);
  };

  return (
    <Select 
      {...input} 
      //  onChange={value => input.onChange(value)} 
      onBlur={handleBlur} 
      options={options}
    />
  )
}

export default RSelect;