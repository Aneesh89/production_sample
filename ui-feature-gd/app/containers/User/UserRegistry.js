import React, { lazy } from 'react';
import retry from 'services/retryPromise';
const User = lazy(() => retry(import('./index')));
const ChangeUserPassword = lazy(() => retry(import('./ForcePasswordChange')));

const UserRegistry = {
    "User": User,
    "ChangeUserPassword": ChangeUserPassword
}

export default UserRegistry;
