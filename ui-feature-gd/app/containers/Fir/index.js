/**
 *
 * Fir
 *
 */

import React, { Suspense, Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Loader from 'react-loaders';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import makeSelectFir from './selectors';
import reducer from './reducer';
import saga from './saga';
import PageTitle from '../Layout/Layout/AppMain/PageTitle';
import AddFir from './AddFir/addFir';
import AddFirHome from './AddFir/addFirHome';
import { Switch,Route } from 'react-router-dom';
export function Fir() {
  useInjectReducer({ key: 'fir', reducer });
  useInjectSaga({ key: 'fir', saga });

  return (
   
        
        <Fragment>
            <Suspense fallback={<Loader type="ball-pulse-rise" />}>
              <ReactCSSTransitionGroup
                component="div"
                transitionName="MainAnimation"
                transitionAppear
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}
              >
                <PageTitle
                  heading="FIR"
                  subheading="Add FIR"
                  icon="pe-7s-news-paper icon-gradient bg-deep-blue"
                  //  href="generaldiary"
                  content="FIR"
                  activeContent="Add Fir"
                />
                 <Switch>

            
                    <AddFirHome />
                  
                    
                    {/* <AddFir exact path="/AddFIR" component={AddFir} /> */}
                    {/* <AddFirHome/> */}
                 </Switch>
               
                {/* <AddFir /> */}
              </ReactCSSTransitionGroup>
        </Suspense>
    </Fragment>


  );
}

Fir.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fir: makeSelectFir(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Fir);
