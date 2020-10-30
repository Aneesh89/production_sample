import React, {Component} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import layoutreducer from '../../reducer';
import {
    Breadcrumb, BreadcrumbItem
} from 'reactstrap';

import {
    faHome

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function PageTitle(props){
    return (

        <div className="app-page-title">
            <div className="page-title-wrapper">
                <div className="page-title-heading" padding = "10px">                   
                     <div
                        // className={cx("page-title-icon", {'d-none': !props.enablePageTitleIcon})}
                        className={cx("page-title-icon")}
                        >
                        <i className={props.icon}/>
                    </div>
                    <div>
                        {props.heading}
                        <div
                            // className={cx("page-title-subheading", {'d-none': !props.enablePageTitleSubheading})}
                            className={cx("page-title-subheading")}
                            >
                            {props.subheading}
                        </div>
                    </div>
                </div>
                <div className="page-title-actions">                   
                    <Breadcrumb>
                        <BreadcrumbItem><a href="/">
                            <FontAwesomeIcon icon={faHome}/></a>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <a href={props.href}>{props.content}</a>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.activeContent}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = () => ({
        enablePageTitleIcon:layoutreducer.enablePageTitleIcon,
    enablePageTitleSubheading: layoutreducer.enablePageTitleSubheading,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);