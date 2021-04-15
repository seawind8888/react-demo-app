import React from 'react';

import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { applyPolyfills, defineCustomElements } from '@tarojs/components/loader';


import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
// import routes from './routes'
// import RouterGuard from './components/RouterGuard'

import './App.css';

import 'antd/dist/antd.css';

applyPolyfills().then(() => {
  defineCustomElements(window);
});

function App() {
  
  return (
    <div>
        <div className='router-list'>
          <Link to='/page1'>page1</Link>
          <Link to='/page2'>page2</Link>
          <Link to='/page3'>page3</Link>
          <Link to='/page4'>page4</Link>
          <Link to='/page5'>page5</Link>
        </div>
        <div>
          <Switch>
            {/* <RouterGuard routes={routes} /> */}

            <Route component={Page1} path='/page1'></Route>
            <Route component={Page2} path='/page2'></Route>
            <Route component={Page3} path='/page3'></Route>
            <Route component={Page4} path='/page4'></Route>
            <Route component={Page5} path='/page5'></Route>
            {/* <Route component={() => import('./pages/Page1')} path='/page1'></Route> */}
            {/* <Route component={() => import('./pages/Page2')} path='/page2'></Route> */}
            {/* <Redirect from='/' to='/page1'></Redirect> */}
          </Switch>
        </div>
      </div>
  );
}

export default App;
