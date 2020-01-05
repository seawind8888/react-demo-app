import React, { Component } from 'react';
import List from '../components/List';
import Item from '../components/Item';
class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      name: 'aaa'
    };
    console.log(this.props.num);
  }
  componentWillMount() {}
  componentDidMount() {
    // setState测试
    this.setStateTest();
  }
  componentWillReceiveProps() {}
  componentWillUpdate(nextProps, nextState) {
    console.log('[update]');
    // this.setState({
    //     name: 'bbb'
    // })
  }
  componentDidUpdate() {}
  componentWillUnmount() {}

  onClick() {
    // this.props.num = 3
    this.setState({
      count: this.state.count + 1
    });
    // this.setState({
    //     count: me.state.count + 1
    // });
  }

  setStateTest() {
    this.setState({ val: this.state.val + 1 }, () => {
      console.log('[setStateTest]In callback ' + this.state.val);
    });
    console.log('[setStateTest] Direct call ' + this.state.val);
    setTimeout(() => {
      console.log('[setStateTest] begin of setTimeout' + this.state.val);
      this.setState({ val: this.state.val + 1 }, () => {
        console.log(
          '[setStateTest] setTimeout setState callback ' + this.state.val
        );
      });
      setTimeout(() => {
        console.log(
          '[setStateTest] setTimeout of settimeout ' + this.state.val
        );
      }, 0);
      console.log('[setStateTest] end of setTimeout ' + this.state.val);
    }, 0);
    // Direct call 0
    // In callback 1
    // begin of setTimeout 1
    // setTimeout setState callback 2
    // end of setTimeout 2
    // setTimeout of settimeout 2
  }

  render() {
    console.log(this.state.count);
    console.log('1111111111111111111111111111111111111111111');
    console.log('[props]', this.props.num);
    return (
      <div>
        <h1>{this.state.count}</h1>
        <div>{this.state.name}</div>
        <input type='button' value='点击我' onClick={this.onClick.bind(this)} />
        <br />
        <List ccc={333}>
          <Item key={1} aaa={11} bbb={22} />
          <Item key={2} aaa={11} bbb={22} />
          {/* <Item key={2} aaa={11} bbb={22}/> */}
        </List>

        <br />
      </div>
    );
  }
}
export default Page1;
