/**
 *
 * App
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { setSession, fetchUserSuccess, setUnit, fetchMenu, fetchMenuSuccess, fetchMenuFailure } from './actions';
import makeSelectApp from './selectors';
import reducer from './reducer';
import saga from './saga';

import { APIWrapper } from 'services/apiHandler';
import http from 'services/http';
import { GET_MENU } from '../Layout/Api';

import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import AuthService from '../../services/authService';
import Login from '../Login/Loadable';
// import ForcePasswordChange from '../ForcePasswordChange';
import Logout from '../Logout/index';
import NotFoundPage from '../NotFoundPage/Loadable';
import Layout from '../Layout';

// import Home from '../HomePage/Loadable';
import AppRegistry from './AppRegistry';
import PublicLayout from '../Layout/PublicLayout';
import ForceLayout from '../Layout/ForceLayout';
import NoLayout from '../Layout/NoLayout';
import 'react-block-ui/style.css';
import { ToastContainer } from 'react-toastify';
import ForcePasswordChange from '../User/ForcePasswordChange';
import axios from 'axios';
import { CasNav, MainNav, FlatNav } from '../Layout/Layout/AppNav/NavItems';
export function App({
  app,
  onFetchUser,
  onSetSession,
  onSetUnit,
  onFetchMenu,
  onFetchMenuSuccess,
  onFetchMenuFailure,
}) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });
  const [userSession, setUserSession] = useState(true);
  // const isLogin = AuthService.isLoggedIn();
  const page = { ...AppRegistry };
  const unit = AuthService.getUnit();
  const user = AuthService.getUser();

  useEffect(() => {
    const fetchData = async () => {
      const result = AuthService.isLogin();
      onSetSession(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (unit) {
      onSetUnit(JSON.parse(unit));
      // getMenu();
    }
  }, [unit]);

  useEffect(() => {
    if (user) {
      onFetchUser(JSON.parse(user));
    }
  }, [user]);

  const [FlatNavAPI, setFlatNavAPI] = useState([]);
  // axios for Sidebar FlatNav

  function getMenu() {
    onFetchMenu();
    http.get(GET_MENU).then(
      response => {
        setFlatNavAPI(response.data);
        const menu = response.data.map(obj => {
          if (obj.menuDisplay == 'Y') {
            return {
              id: obj.menuCd,
              icon: obj.menuIcon,
              label: obj.menu,
              to: obj.menuTo,
              component: obj.menuComponent,
              parentId: obj.parentMenuCd,
            };
          }
        });
        onFetchMenuSuccess(menu);
      },
      error => {
        onFetchMenuFailure();
      },
    );
  }

  return (
    <>
      <Switch>
        <PublicLayout exact path="/login" component={Login} />
        <PublicLayout exact path="/forgotpassword" component={Login} />
        <NoLayout exact path="/logout" component={Logout} />

        {AuthService.isLoggedIn() === true ? (
          <>
            {
              app.user.data.nextPageFlag === "Password" ?
                <ForceLayout >
                  <Route exact path="/changePassword" component={ForcePasswordChange} />
                </ForceLayout>
                :
                ''
            }
            <Layout >                        
              {/* {               
                FlatNavAPI.map((nav, index) => {
                  return nav.menuComponent && <Route key={index} exact path={nav.menuTo} component={page[nav.menuComponent]} />
                })
                
              } */}
               {               
                FlatNav.map((nav, index) => {
                  return nav.component && <Route key={index} exact path={nav.to} component={page[nav.component]} />
                })
                
              }
            </Layout>
          </>
        ) : (
          <Redirect to="/login" />
        )}
        <Route component={NotFoundPage} />
      </Switch>
      <ToastContainer />
    </>
  );
}

App.propTypes = {
  app: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  checkLogin: PropTypes.func,
  onFetchMenuSuccess: PropTypes.any,
  onSetSession: PropTypes.func,
  onSetSession: PropTypes.func,
  onSetUnit: PropTypes.func,
  onFetchMenuFailure: PropTypes.func,
  onFetchMenu: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSetSession: session => dispatch(setSession(session)),
    onFetchUser: user => dispatch(fetchUserSuccess(user)),
    onSetUnit: unit => dispatch(setUnit(unit)),
    onFetchMenu: () => dispatch(fetchMenu()),
    onFetchMenuSuccess: menu => dispatch(fetchMenuSuccess(menu)),
    onFetchMenuFailure: () => dispatch(fetchMenuFailure()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
