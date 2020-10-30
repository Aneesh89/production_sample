import React from 'react';

function Options(props) {
  
   let o = props.list.map((item, i) =>
        <option key={i} value={item[props.value]}>{item[props.label]}</option>
    );
    return (
      <>
      <option value=''>Select</option>
      {o}
      </>
    );
  }

  export default Options;