import React, { Component } from 'react'
import { Route,Redirect } from 'react-router-dom';

class RouterGuard extends Component {
    render() {
        const { pathname } = window.location;
        const { routes } = this.props
        if(pathname === '/login'){
            return <Redirect to='/page1' />
        } else {
            return <Route path={pathname} component={routes.component} />
        }
    }
}

export default RouterGuard