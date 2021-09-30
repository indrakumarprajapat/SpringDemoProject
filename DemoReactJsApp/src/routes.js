import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from './Views/app';

const RoutesNavigation = () =>{
    return(
        <Router>
        <Switch>
            <Route component={App}></Route>
        </Switch>
        </Router>
    )
}

export default RoutesNavigation;