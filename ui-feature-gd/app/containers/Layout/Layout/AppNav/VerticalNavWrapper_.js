import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import MetisMenu from 'react-metismenu';
import metisMenuReducer from 'react-metismenu/lib/reducers';
import {
    setEnableMobileMenu
} from '../../actions';
import {MainNav, ComponentsNav, FormsNav, WidgetsNav, ChartsNav} from './NavItems';

class Nav extends Component {

    state = {};

    toggleMobileSidebar = () => {        
        let {enableMobileMenu, setEnableMobileMenu} = this.props;
        setEnableMobileMenu(!enableMobileMenu);
    }
    
    render() {
        return (
            <Fragment>
                <h5 className="app-sidebar__heading">Menu</h5>
                <MetisMenu content={MainNav} onSelected={this.toggleMobileSidebar} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>                
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}
const mapStateToProps = state => ({
    enableMobileMenu: state.enableMobileMenu
});

const mapDispatchToProps = dispatch => ({

    setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),

});
export default connect(mapStateToProps, mapDispatchToProps)(Nav);