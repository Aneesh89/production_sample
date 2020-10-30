import React from 'react';
import Select from "react-select";
// import "react-select/dist/react-select.css";


function RSelectMulti(props) {   
  
  const style={
    // ...styles,
    control: (base, state) => ({
        ...base,
        borderColor: '#DC3545',
       // overwrittes hover style
    '&:hover': {
        borderColor: '#DC3545'
      }
    }),
}
return(
<div>
<Select
          name={props.name}   
          isMulti
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}     
          styles={ props.error && props.touched ?  style : 'none' }  
          options={props.options}
          isLoading={props.isLoading}
        /> 
{!!props.error && props.touched && (
          <div style={{ color: "#DC3545",fontSize:11.264, marginTop: ".4rem" }}>
            {props.error}
          </div>
        )}       
  </div>  
)
}

export default RSelectMulti;
