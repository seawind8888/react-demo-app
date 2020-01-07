import React from 'react';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import './App.css';
import 'cloud-react/cloud-react.css'

function App() {
  return (
    <div>
        <div>
          <Link to='/page1'>page1</Link>
          <Link to='/page2'>page2</Link>
          <Link to='/page3'>page3</Link>
        </div>
        <div>
          <Switch>
            <Route component={Page1} path='/page1'></Route>
            <Route component={Page2} path='/page2'></Route>
            <Route component={Page3} path='/page3'></Route>
            {/* <Route component={() => import('./pages/Page1')} path='/page1'></Route> */}
            {/* <Route component={() => import('./pages/Page2')} path='/page2'></Route> */}
            <Redirect from='/' to='/page1'></Redirect>
          </Switch>
        </div>
      </div>
  );
}

export default App;
