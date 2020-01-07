import React, { Component } from 'react'
// import PropTypes from "prop-types";

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            html: '<a href="#">这是一段html代码</a><a href="#">2</a><a href="#">3</a>'
        }
    }
    // 老版获取context
    // static contextTypes = {
    //     color:PropTypes.string
    // }
    // onButtonClick = () => {
    //     this.context.color = 'dedde'
    // }
    render() {
        return (
            <React.Fragment>
                {this.context.color}
                {Object.keys(this.props).map((e,i) => {
                    return (<span key={i}>{e}</span>)
                })}
                <button onClick={this.onButtonClick}>修改context</button>
                <div dangerouslySetInnerHTML={{__html: this.state.html}}></div>
            </React.Fragment>
        )
    }
}
