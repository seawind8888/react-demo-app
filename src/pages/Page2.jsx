import React, { Component } from 'react'
import { observable, action } from "mobx";
import { _VGroup } from '../components/TBlock'
import { inject,observer } from 'mobx-react';
import './index.less'
import { VGroup, HGroup } from 'v-block.lite/layout'
@inject('PageStore')
@observer
class Page2 extends Component {


  @observable.shallow obj = {
    // a: {
    //   b: 'b'
    // },
    a: 'a',
    b: 'b'
  }

  @observable.ref test = {
    a:1
  }

  handleAdd = () => {
    this.props.PageStore.testAction()
  }

  @action
  handleChangeObj = () => {
    console.log('[obj]',this.obj)
    // this.obj.a = 'b'
    // this.test.a = 2

    // console.log(this.test)
  }




  render() {
    return (
      <div>
        <div className='title-info'>page2</div>

    <div>{this.obj.a}</div>
    <div>{this.test.a}</div>
    <button onClick={this.handleChangeObj}>change</button>
        <button onClick={() => this.props.PageStore.actionTest()}>111</button>
        <_VGroup>321</_VGroup>
        <VGroup  horizontalAlign='flex-start' verticalAlign='center' className={'red'}>123</VGroup>
        <HGroup  horizontalAlign='left' verticalAlign='stretch' className={'red'}>123</HGroup>
        {this.props.PageStore.page}
        <input type='button' onClick={this.handleAdd} value="点击"/>
      </div>
    )
  }
}

export default Page2
