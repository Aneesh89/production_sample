import React, { memo, Suspense,useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Loader from 'react-loaders';
import makeSelectGeneralDiary from './selectors';
import makeSelectApp from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import http from '../../services/http';
import { GET_MASTER_DATA } from '../../services/constants';
import SearchGD from './searchGD';
import AddGD from './addGD';
import PageTitle from '../Layout/Layout/AppMain/PageTitle';
import {
  toast
} from 'react-toastify';

export function GeneralDiary(props) {
  useInjectReducer({ key: 'generalDiary', reducer });
  useInjectSaga({ key: 'generalDiary', saga });

  const [gdType, setGdType] = useState();
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    async function getGDType() {
      setIsLoading(true);
      await http({
        method: 'POST',
        url: GET_MASTER_DATA,
        data: {
          requestName: 'getForgdType_m_r_gd_entry_type',
        },
      })
        .then(function (response) {
          setGdType(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          toast(error, { position: 'top-right', type: 'error' });
          setIsLoading(false);
        });
    }
    getGDType();
  }, []);
  
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
            heading="General Diary"
            subheading="Add General Diary"
            icon="pe-7s-news-paper icon-gradient bg-deep-blue"
            content="General Diary"
            activeContent="Add"
          />
          <AddGD gdType={gdType} isLoading={isLoading} currentUser={props.app.user.data.username} currentProfile={props.app.user.data.profileName} />
          <SearchGD gdType={gdType} isLoading={isLoading}/>
        </ReactCSSTransitionGroup>
      </Suspense>
    </>
  );
}

GeneralDiary.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  generalDiary: makeSelectGeneralDiary(),
  app: makeSelectApp(),
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
)(GeneralDiary);
