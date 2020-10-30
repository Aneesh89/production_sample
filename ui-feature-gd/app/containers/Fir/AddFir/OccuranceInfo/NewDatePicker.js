import React, {Fragment, useState} from 'react'

import {
    InputGroup, InputGroupAddon, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';


import {
    faCalendarAlt,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import DatePicker from 'react-datepicker';


function MyDatepicker(props)
{
    // const [startDate, setStartDate] = useState(new Date());
    return (
        <Fragment>
         
                     
                    
                            <InputGroup>
                        <DatePicker
                                    selected={props.startDate}
                                    onChange={date => setStartDate(date)}
                                    onChange={props.onChangeValue}
                                    className={props.datePicker.className}
                                    dateFormat={props.datePicker.dateFormat}
                                    
                        />
                        <InputGroupAddon addonType="append">
                            <div className="input-group-text">
                                <FontAwesomeIcon icon={faCalendarAlt}/>
                            </div>
                        </InputGroupAddon>
                        </InputGroup>
             
       
        </Fragment>
    )

}
export default MyDatepicker;


// class MyDatepicker extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             startDate: new Date()
//         };
//         this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange(date) {
//         this.setState({
//             startDate: date
//         });
//     }

//     render() {
//         return (
//             <Fragment>
//                 <Col md="12">
//                     <Card className="main-card mb-3">
//                             <CardBody>
//                             <CardTitle>Datepicker</CardTitle>
//                                 <InputGroup>
//                             <DatePicker
//                                         selected={this.state.startDate}
//                                         onChange={this.handleChange}
//                                         showTimeSelect
//                                         className="form-control"
//                                         timeFormat="HH:mm"
//                                         timeIntervals={30}
//                                         dateFormat="Pp"
//                                         timeCaption="Time"
//                             />
//                             <InputGroupAddon addonType="append">
//                                 <div className="input-group-text">
//                                     <FontAwesomeIcon icon={faCalendarAlt}/>
//                                 </div>
//                             </InputGroupAddon>
//                             </InputGroup>
//                             </CardBody>
//                     </Card>
//                 </Col>
           
//             </Fragment>
//         )
//     }
// }

// export default MyDatepicker;