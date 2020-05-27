import React, { Component } from 'react'
import { inject, ViewModel, Store } from 'mmlpx';
import FunCom from '../components/FunCom'
import { Button } from 'antd';

@Store
class UserStore {}

@ViewModel
class Page51 extends Component {
  @inject(UserStore) userStore;

  handleChange = () => {
    this.$refs['func'].change()
  }
  render() {
    return (
      <div>
        page5-1
        <FunCom ref="func" />
        <Button onClick={this.handleChange}>点击</Button>
      </div>
    )
  }
}

export default Page51