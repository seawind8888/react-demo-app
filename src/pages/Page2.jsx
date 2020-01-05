import React, { Component } from 'react'
// import { observer } from 'mobx-react';
// import { observable } from "mobx";
import { inject, observer } from 'mobx-react';

@inject('testStore')
@observer

class Page2 extends Component {
  handleAdd() {
    this.props.testStore.testAction()
  }
  render() {
    return (
      <div>
        page2
        {this.props.testStore.page}
        <input type='button' onClick={this.handleAdd}>点击</input>
      </div>
    )
  }
}

export default Page2
