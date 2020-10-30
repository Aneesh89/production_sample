import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [isShowingAddress, setIsShowingAddress] = useState(false);
  const [isShowingIdentity, setIsShowingIdentity] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEnableModal, setShowEnableModal] = useState(true);

  function toggle() {
    setIsShowing(isShowing =>!isShowing);   
  }
  function toggleAddress() {
    setIsShowingAddress(isShowingAddress =>!isShowingAddress);   
  }
  function toggleIdentity() {
    setIsShowingIdentity(isShowingIdentity =>!isShowingIdentity);   
  }
  function toggleEdit() {
    setShowEditModal(showEditModal =>!showEditModal);
  }
  function toggleViewData() {
    setShowViewModal(showViewModal =>!showViewModal);
  }
  function toggleEnable() {
    setShowEnableModal(showEnableModal =>!showEnableModal);   
  }

  return {
    isShowing,
    isShowingAddress,
    isShowingIdentity,
    showEditModal,
    showViewModal,
    showEnableModal,
    toggle,
    toggleAddress,
    toggleIdentity,
    toggleEdit,
    toggleViewData,
    toggleEnable
  }
};

export default useModal;