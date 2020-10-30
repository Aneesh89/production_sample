/**
 *
 * Router for user management 
 *
 */
import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Home from './Loadable';
import Fir from './Fir';
import NotFoundPage from '../NotFoundPage/Loadable';
import Layout from '../Layout'
export default function NotFoundRouters() {
  return (
    <>
      <Layout component={NotFoundPage} />
    </>
  );
}
