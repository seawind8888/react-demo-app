import React from 'react'
import cls from 'classnames';
import './index.less'


export default class VGroup extends React.Component {

  render() {
    const { className = '' } = this.props
    return (
      <div className={cls('v-group-container', className)}>
        {this.props.children}
      </div>
    );
  }
}
