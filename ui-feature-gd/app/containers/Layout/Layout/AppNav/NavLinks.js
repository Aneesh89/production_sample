import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { BrowserRouter, Link, Route } from 'react-router-dom';

const NavLink = ({
  className,
  classNameActive,
  classNameHasActiveChild,
  active,
  hasActiveChild,
  to,
  externalLink,
  hasSubMenu,
  toggleSubMenu,
  activateMe,
  children,
}) => (
  <Link
    className={classnames(
      className,
      active && classNameActive,
      hasActiveChild && classNameHasActiveChild,
    )}
    to={to}
    onClick={hasSubMenu ? toggleSubMenu : activateMe}
    target={externalLink ? '_blank' : undefined}
  >
    {children}
  </Link>
);

NavLink.defaultProps = {
  externalLink: false,
  toggleSubMenu: null,
};

NavLink.propTypes = {
  className: PropTypes.string.isRequired,
  classNameActive: PropTypes.string.isRequired,
  classNameHasActiveChild: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  hasActiveChild: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
  externalLink: PropTypes.bool,
  hasSubMenu: PropTypes.bool.isRequired,
  toggleSubMenu: PropTypes.func,
  activateMe: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
};

export default NavLink;