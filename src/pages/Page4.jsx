import React, { Component } from 'react';
import { DatePicker, Button } from 'antd';
import moment from 'moment';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


class Page4 extends Component {
  state = {
    time: moment('2015/01/01')
  }
  onChange = (date, dateString) => {
    console.log(dateString);
  }
  handleChangeTime = (value) => {
    this.setState({
      time: moment('2016/01/01')
    })
  }
  
  render() {
    return (
      <div>
        <Button onClick={this.handleChangeTime}>111</Button>
        <DatePicker onChange={this.onChange} value={this.state.time} />
        <br />
        <MonthPicker onChange={this.onChange} placeholder="Select month" />
        <br />
        <RangePicker onChange={this.onChange} />
        <br />
        <WeekPicker onChange={this.onChange} placeholder="Select week" />
      </div>
    )
  }
}

export default Page4