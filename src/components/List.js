

import React, { Component,Fragment } from 'react'


export default class List extends Component {
    // constructor(props) {
    //     super(props)
    // }
    static getDerivedStateFromProps(prevProps, prevState) {
        return prevProps
    }

    render() {
        console.log('[this.state]', this.state)
        // 插槽组件
        const childrenElement = React.Children.map(this.props.children, child => React.cloneElement(child, this.props))
        return (
            <Fragment>
                { childrenElement }
            </Fragment>
        )
    }
}

