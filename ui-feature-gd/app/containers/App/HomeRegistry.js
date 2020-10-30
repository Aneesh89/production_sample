import React, { lazy } from 'react';
import retry from 'services/retryPromise';
const Fir = lazy(() => retry(import('../HomePage/Fir')));
const Home = lazy(() => retry(import('../HomePage/index')));
const Menu1 = lazy(() => retry(import('../MenuManagement/index')));
const Role = lazy(() => retry(import('../MenuManagement/RoleManagement')));
const Rolegroup = lazy(() => retry(import('../MenuManagement/RolegroupManagement')));
const GeneralDiary = lazy(() => retry(import('../GeneralDiary/index')));


const HomeRegistry = {
    "Fir": Fir,
    "Home": Home,
    "Menu": Menu1,
    "Role": Role,
    "Rolegroup": Rolegroup
}

export default HomeRegistry;