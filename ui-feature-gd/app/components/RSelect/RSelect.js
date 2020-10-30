import React from "react";
import Select from "react-select";
// import "react-select/dist/react-select.css";
  
 function RSelect(props)  {
  const style={
    // ...styles,
    control: (base, state) => ({
        ...base,
        borderColor: '#DC3545',
       // overwrittes hover style
    '&:hover': {
        borderColor: '#DC3545',
      }
    }),
}
 
    return (
      <div> 
       
        <Select
          name={props.name}
          placeholder={props.placeholder}
          ref={props.ref}
          options={props.options}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}     
          styles={ props.error && props.touched ?  style : 'none' }    
          isLoading={props.isLoading}
          // readOnly = {props.readOnly}
        />
       {!!props.error && props.touched && (
          <div 
          style={{ color: "#DC3545",fontSize:11.264, marginTop: ".4rem" }}
          >
          {props.error}
          </div>
       )} 
      </div>
    );
  }
  export default RSelect;

