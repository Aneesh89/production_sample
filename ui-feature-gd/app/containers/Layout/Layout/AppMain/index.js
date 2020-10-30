import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';
import Loader from 'react-loaders'
import AppHeader from '../AppHeader';
import AppSidebar from '../AppSidebar';
import AppFooter from '../AppFooter';


import {
    ToastContainer,
} from 'react-toastify';



const AppMain = () => {

    return (
        <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner p-0">
                    <h1>Main Content</h1>
                </div>
                <div className="app-wrapper-footer">
                    <AppFooter/>
                </div>
            </div>
        </div>
    </Fragment>
    )
};

export default AppMain;