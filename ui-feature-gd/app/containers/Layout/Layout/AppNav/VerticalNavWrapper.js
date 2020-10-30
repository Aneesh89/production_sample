/**
 *
 * VerticalNavWrapper
 *
 */
import React, { useState, useEffect, Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import BlockUI from 'react-block-ui';
import { Loader } from 'react-loaders';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import MetisMenu from 'react-metismenu';
import { makeSelectLayout } from '../../selectors';

import reducer from '../../reducer';
import saga from '../../saga';

// Architect
import NavLink from './NavLinks';
import { setEnableMobileMenu, fetchMenu } from '../../actions';
import makeSelectApp, { makeSelectMenu } from '../../../App/selectors';
import { CasNav, MainNav, FlatNav } from './NavItems';

export function Nav({ UI, onSetEnableMobileMenu, app, menu }) {
  useInjectReducer({ key: 'layout', reducer });
  useInjectSaga({ key: 'layout', saga });
  const toggleMobileSidebar = () => {
    const { enableMobileMenu } = UI;
    onSetEnableMobileMenu(!enableMobileMenu);
  };

  return (
    <Fragment>
      <h5 className="app-sidebar__heading">Menu</h5>
      <BlockUI
        tag="div"
        blocking={menu.loading}
        loader={<Loader active type="ball-pulse-sync" />}
      >
        <MetisMenu
          // content={menu.list}
          content={FlatNav}
          onSelected={toggleMobileSidebar}
          activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down"
          LinkComponent={NavLink}
        />
      </BlockUI>
    </Fragment>
  );
}

Nav.propTypes = {
  UI: PropTypes.object,
  app: PropTypes.object,
  onSetEnableMobileMenu: PropTypes.func,
  menu: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  UI: makeSelectLayout(),
  app: makeSelectApp(),
  menu: makeSelectMenu(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Nav);
