import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Loader from 'react-loaders';
import reducer from './reducer';
import saga from './saga';
import {
  Col, Modal, ModalBody, ModalHeader
} from 'reactstrap';
import BlockUI from 'react-block-ui';
import CriminalCaseGD from './CriminalCaseGD';
import ChangeofGDGuard from './ChangeofGDGuard';
import ChangeGdCharge from './ChangeofGdCharge';
import DutyDetailingGD from './DutyDetailingGD';
import AddOtherGD from './AddOtherGD';
import {LoadIndicator} from '../../components/Loader/LoadingIndicator';

export function GeneralDiaryModal(props) {
  useInjectReducer({ key: 'generalDiary', reducer });
  useInjectSaga({ key: 'generalDiary', saga });

  const [loadInd, setLoadInd] = useState(false);
  const handleClose = () => {
    props.hide();
  }
  const closeBtn = <button className="close" onClick={props.hide}>&times;</button>;
  return (
    <>
      <span className="d-inline-block mb-2 mr-2">
        <Modal isOpen={props.isShowing} toggle={props.hide} backdrop={true} size={props.size} >
          <ModalHeader toggle={props.hide} close={closeBtn}>{props.name}</ModalHeader>
          <ModalBody>
            <BlockUI tag="div" blocking={loadInd} loader={<Loader active type={LoadIndicator} />}>

              <Col>
                {(() => {
                  switch (props.name) {
                    case 'Criminal case':
                      return <CriminalCaseGD
                        GDType={props.GDType}
                        setLoadInd={setLoadInd}
                        hide={props.hide}
                        handleClose={handleClose}
                      />
                    case 'Change of GD Charge':
                      return <ChangeGdCharge
                        GDType={props.GDType}
                        currentUser={props.currentUser}
                        currentProfile={props.currentProfile}
                        setLoadInd={setLoadInd}
                        hide={props.hide}
                        handleClose={handleClose} />
                    case 'Change of Guard':
                      return <ChangeofGDGuard
                        GDType={props.GDType}
                        setLoadInd={setLoadInd}
                        hide={props.hide}
                        handleClose={handleClose} />
                    case 'Duty Detailing':
                      return <DutyDetailingGD
                        GDType={props.GDType}
                        setLoadInd={setLoadInd}
                        hide={props.hide}
                        handleClose={handleClose} />
                    default:
                      return <AddOtherGD
                        GDType={props.GDType}
                        setLoadInd={setLoadInd}
                        hide={props.hide}
                        handleClose={handleClose} />

                  }
                })()}
              </Col>
            </BlockUI>
          </ModalBody>
        </Modal>
      </span>

    </>
  )
}

GeneralDiaryModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
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
)(GeneralDiaryModal);
