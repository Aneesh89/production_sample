import React, { lazy } from 'react';
import retry from 'services/retryPromise';
// const AddGD = lazy(() => (import('./index')));
const FirHome = lazy(() => retry(import('./index')));
const AddFIR = lazy(() => retry(import('./AddFir/addFir')));
const FIRRegistry = {
  FIRHome: FirHome,
  AddFIR : AddFIR
  //navitems component name :const and also in nav items to
  // "AddGD": AddGD
};

export default FIRRegistry;
