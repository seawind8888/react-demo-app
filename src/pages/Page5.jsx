import React, { Component } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Page51 from './Page5-1'
import Page52 from './Page5-2'
import Test from '../components/Test'

export default class page5 extends Component {
  state = {
    visible: false
  }
  popupHandler = () => {
    this.setState({
      visible: true
    })
  }
  render() {
    const match = this.props.match
    const { visible } = this.state
    return (
      <div>
        <div>
          <Test visible={visible} />
          <button onClick={this.popupHandler}>change</button>
          <Link to='/page5/1'>page5-1</Link>
          <Link to='/page5/2'>page5-2</Link>
        </div>
        <Switch>
						
          <Route path={`/page5/1`} component={() => <Page51/>} />
          <Route path={`/page5/2`}  component={() => <Page52/>} />
          <Route path='*' component={() => <Page51/>} />
          {/* <Redirect from='/page5' to='/page5/1'></Redirect> */}
        
        </Switch>
      </div>
    )
  }
}
