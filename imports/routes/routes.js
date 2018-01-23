import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Route} from 'react-router';
import {Redirect, Router, Switch} from 'react-router-dom';
import history from '../ui/history';


import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const routes = (
    <Router history={history}>
        <Switch>
            <Route exact path="/" render={() => {
                return Meteor.userId() ? <Redirect to="/links" /> : <Login />
            }} />
            <Route path="/signup" render={() => {
                return Meteor.userId() ? <Redirect to="/links" /> : <Signup />
            }} />
            <Route path="/links" render={() => {
                return !Meteor.userId() ? <Redirect to="/" /> : <Link />
            }} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>

);

export const onAuthChange = (isAuthenticated) => {
    const pathName = history.location.pathname;

    const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
    const isAuthenticatedPage = authenticatedPages.includes(pathName);

    console.log('auth', isAuthenticatedPage);
    console.log('unauth', isUnauthenticatedPage);

    if (isUnauthenticatedPage && isAuthenticated) {
        history.replace('/links');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        history.replace('/');
    }
};