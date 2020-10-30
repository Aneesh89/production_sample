/**
 *
 * MenuManagement
 *
 */

import React, { memo,Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from 'react-loaders';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeMenuViewlistselector } from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  menuViewList
} from './actions';
import PageTitle from '../Layout/Layout/AppMain/PageTitle';
import MenuManage from './MenuManage';

export function MenuManagement(props) {
  useInjectReducer({ key: 'menuManagement', reducer });
  useInjectSaga({ key: 'menuManagement', saga });


  return (
    <>
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
            heading="Manage Menu"
            subheading="These are helpers that manages Menu."
            icon="pe-7s-menu icon-gradient bg-deep-blue"
            href="menus"
            content="Menu Management"
            activeContent="Manage Menu"
          />
          <MenuManage />
        </ReactCSSTransitionGroup>
      </Suspense>
    </>
  );
}


MenuManagement.propTypes = {
  menuViewList: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  menuViewList: makeMenuViewlistselector(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadmenuViewList: () =>
      dispatch(menuViewList()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MenuManagement);
