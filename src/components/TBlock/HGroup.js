import React from 'react'
import cls from 'classnames';
import './index.less'

export default class HGroup extends React.Component {
 
  render() {
    const { className = '' } = this.props
    return (
      <div className={cls('h-group-container', className)}>
        {this.props.children}
      </div>
    );
  }
}
