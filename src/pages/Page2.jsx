import React, { Component } from 'react'
import { observable, action, autorun, extendObservable } from "mobx";
import { _VGroup } from '../components/TBlock'
import { inject, observer } from 'mobx-react';
import './index.less'
import { VGroup, HGroup } from 'v-block.lite/layout'

var Person = function(firstName, lastName) {
  // 在一个新实例上初始化 observable 属性
  extendObservable(this, {
      firstName: firstName,
      lastName: lastName
  });
}

@inject('PageStore')
class Page2 extends Component {


  @observable.shallow obj = {
    a: {
      b: 'b'
      c: '2'
    }
  }

  @observable.shallow arr = [{a:1}]

  @observable.ref test = {
    a: 1
  }

  handleAdd = () => {
    this.props.PageStore.testAction()
  }

  @action
  handleChangeValue = () => {
    // this.arr.push(1)
    this.handler = autorun(() => {
      this.obj.a.b = 'c'
    })
    this.handler()
    this.obj.a.b = 'd'
    console.log('[this.obj]',this.obj)
  }

  // @autorun
  // arrAutoRun = () => {
  //   console.log(this.arr)
  // }




  render() {
    console.log('[this.handleChangeValue]',this.handleChangeValue)
    return (
      <div>
        <div className='title-info'>page2</div>
        <div>{this.test.a}</div>
        <button onClick={this.handleChangeValue}>change</button>
        <button onClick={() => this.props.PageStore.actionTest()}>111</button>
        <_VGroup>321</_VGroup>
        {/* <VGroup horizontalAlign='flex-start' verticalAlign='center' className={'red'}>123</VGroup>
        <HGroup horizontalAlign='left' verticalAlign='stretch' className={'red'}>123</HGroup> */}
        {this.props.PageStore.page}
        <input type='button' onClick={this.handleAdd} value="点击" />
      </div>
    )
  }
}

export default Page2
