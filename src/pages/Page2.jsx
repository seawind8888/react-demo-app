import React, { Component } from 'react'
import { observable } from "mobx";
import { observer } from 'mobx-react';
// import PageStore from '../stores/PageStore';
// @inject(PageStore)
@observer

class Page2 extends Component {
  @observable title = 1
  handleAdd = () => {
    this.title++
  }
  render() {
    return (
      <div>
        page2
        {this.title}
        <input type='button' onClick={this.handleAdd} value="点击"/>
      </div>
    )
  }
}

export default Page2
