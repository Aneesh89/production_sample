import React, { lazy } from 'react';
import retry from 'services/retryPromise';
const AddGD = lazy(() => retry(import('./index')));
const SearchandViewGD = lazy(() => retry(import('./searchandViewGD')));
const AssumeGDCharge = lazy(() => retry(import('./AssumeGDCharge')));
const AssigningOfficerInCharge = lazy(() => retry(import('./AssigningOfficerInCharge')));
const ReviewGD = lazy(() => retry(import('./ReviewGD')));

const GDRegistry = {
    "AddGD": AddGD,
    "SearchandViewGD": SearchandViewGD,
    "AssumeGDCharge": AssumeGDCharge,
    "AssignGDCharge": AssigningOfficerInCharge,
    "ReviewGD": ReviewGD
}

export default GDRegistry;
