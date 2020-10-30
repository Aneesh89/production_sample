/**
 *
 * Modal
 *
 */

import React from 'react';
import LoginForm from '../../containers/Login/LoginForm';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Modal(props) {
  let [show,setShow] = useState(props.show);
  return (
    <>
    <Modal isOpen={show}   backdrop={true}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
          {props.children}
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={this.toggle}>Cancel</Button>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
          </ModalFooter>
        </Modal>
    </>
  );
}

Modal.propTypes = {};

export default Modal;
