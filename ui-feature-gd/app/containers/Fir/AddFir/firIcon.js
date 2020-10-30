import React, { Fragment, memo,useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import cx from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import {fetchTab } from '../actions';
import makeSelectFir from '../selectors';
export function FirIcon(props) {
  useInjectReducer({ key: 'fir', reducer });
  useInjectSaga({ key: 'fir', saga });
  // console.log(props);
const [tab,setTab]=useState();
const clickTab=(i)=>{
  props.tabCurrentActive(i);
}
  return (<Fragment>

      
      {

      props.firicon.map((data, i) => (
        // console.log(data.tab_id),
        <Col sm="6" md="1" xl="1" key={i} onClick={()=>clickTab(data.tab_id)}>
        <div className={`widget-chart widget-chart-hover ${props.lastactiveTab===data.tab_id? 'fir-active':'' }`}>
          <div className="icon-wrapper rounded-circle">
            <div className={`icon-wrapper-bg opacity-9 ${data.tab_status==='inactive'?'bg-secondary': `${data.tab_status==='active'?'bg-danger':'bg-success'}`}`}/>
            <i className={`${data.icon_name} text-white`}/>
            </div>
          <div className="widget-description text-dark fir-icon-desc ">                           
            <span className="pl-1" >
              {data.tab_name}
            </span>
            </div>
          </div>
        <div className="divider m-0 d-md-none d-sm-block"/>
        </Col>
        ))
          
        }

    </Fragment>
  );
}
FirIcon.propTypes = {

};

const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
  return {
    onFetchTab:()=>dispatch(fetchTab())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FirIcon);