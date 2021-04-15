import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View, PickerView, PickerViewColumn } from '@tarojs/components';

import PropTypes from 'prop-types';
import './index.less';

export default class DatePicker extends Taro.Component {
  state = {
    pickVal: [],
    range: {
      years: [],
      months: [],
      days: [],
      hours: [],
      minutes: [],
      seconds: [],
      values: null,
      fields2: null
    },
    checkObj: {}
  };
  componentWillMount() {
    this.initData();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.state.values) {
      this.setState({ // eslint-disable-line
        values: prevProps.value
      }, () => {
        this.initData();
      });
    }
    if (prevProps.fields !== this.state.fields2) {
      this.setState({ // eslint-disable-line
        fields2: prevProps.fields
      }, () => {
        this.initData();
      });
    }
  }

  formatNum = n => {
    return Number(n) < 10 ? '0' + Number(n) : Number(n) + '';
  };

  checkValue = value => {
    let strReg, example;
    switch (this.props.fields) {
      case "year":
        strReg = /^\d{4}$/;
        example = "2019";
        break;
      case "month":
        strReg = /^\d{4}-\d{2}$/;
        example = "2019-02";
        break;
      case "day":
        strReg = /^\d{4}-\d{2}-\d{2}$/;
        example = "2019-02-01";
        break;
      case "hour":
        strReg = /^\d{4}-\d{2}-\d{2} \d{2}(:\d{2}){1,2}?$/;
        example = "2019-02-01 18:00:00或2019-02-01 18";
        break;
      case "minute":
        strReg = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2}){0,1}?$/;
        example = "2019-02-01 18:06:00或2019-02-01 18:06";
        break;
      case "second":
        strReg = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        example = "2019-02-01 18:06:01";
        break;
    }
    if (!strReg.test(value)) {
      console.log(new Error("请传入与mode、fields匹配的value值，例value=" + example + ""));
    }
    return strReg.test(value);
  };

  resetData = (year, month, day, hour, minute) => {
    let curDate = this.getCurrenDate();
    let curYear = curDate.curYear;
    let curMonth = curDate.curMonth;
    let curDay = curDate.curDay;
    let curHour = curDate.curHour;
    let curMinute = curDate.curMinute;
    let curSecond = curDate.curSecond;
    let months = [],
        days = [],
        hours = [],
        minutes = [],
        seconds = [];
    let disabledAfter = this.props.disabledAfter;
    let monthsLen = disabledAfter ? year * 1 < curYear ? 12 : curMonth : 12;
    let totalDays = new Date(year, month, 0).getDate(); // 计算当月有几天;
    let daysLen = disabledAfter ? year * 1 < curYear || month * 1 < curMonth ? totalDays : curDay : totalDays;
    let hoursLen = disabledAfter ? year * 1 < curYear || month * 1 < curMonth || day * 1 < curDay ? 24 : curHour + 1 : 24;
    let minutesLen = disabledAfter ? year * 1 < curYear || month * 1 < curMonth || day * 1 < curDay || hour * 1 < curHour ? 60 : curMinute + 1 : 60;
    let secondsLen = disabledAfter ? year * 1 < curYear || month * 1 < curMonth || day * 1 < curDay || hour * 1 < curHour || minute * 1 < curMinute ? 60 : curSecond + 1 : 60;
    for (let m = 1; m <= monthsLen; m++) {
      months.push(this.formatNum(m));
    };
    for (let d = 1; d <= daysLen; d++) {
      days.push(this.formatNum(d));
    }
    for (let h = 0; h < hoursLen; h++) {
      hours.push(this.formatNum(h));
    }
    for (let m = 0; m < minutesLen; m++) {
      minutes.push(this.formatNum(m));
    }
    for (let s = 0; s < secondsLen; s++) {
      seconds.push(this.formatNum(s));
    }
    return {
      months,
      days,
      hours,
      minutes,
      seconds
    };
  };

  getData(dVal) {
    // 用来处理初始化数据
    let curFlag = this.props.current;
    let disabledAfter = this.props.disabledAfter;
    let curDate = this.getCurrenDate();
    let curYear = curDate.curYear;
    let curMonthdays = curDate.curMonthdays;
    let curMonth = curDate.curMonth;
    let curDay = curDate.curDay;
    let curHour = curDate.curHour;
    let curMinute = curDate.curMinute;
    let defaultDate = this.getDefaultDate();
    let startYear = this.getStartDate().getFullYear();
    let endYear = this.getEndDate().getFullYear();
    // 颗粒度，禁用当前之后日期仅对year,month,day,hour生效;分钟秒禁用没有意义,
    let years = [],
        months = [],
        days = [],
        hours = [],
        minutes = [],
        seconds = [];
    let year = dVal[0] * 1;
    let month = dVal[1] * 1;
    let day = dVal[2] * 1;
    let hour = dVal[3] * 1;
    let monthsLen = disabledAfter ? year < curYear ? 12 : curDate.curMonth : 12;
    let daysLen = disabledAfter ? year < curYear || month < curMonth ? defaultDate.defaultDays : curDay : curFlag ? curMonthdays : defaultDate.defaultDays;
    let hoursLen = disabledAfter ? year < curYear || month < curMonth || day < curDay ? 24 : curHour + 1 : 24;
    let minutesLen = disabledAfter ? year < curYear || month < curMonth || day < curDay || hour < curHour ? 60 : curMinute + 1 : 60;
    for (let y = startYear; y <= (disabledAfter ? curYear : endYear); y++) {
      years.push(y.toString());
    }
    for (let m = 1; m <= monthsLen; m++) {
      months.push(this.formatNum(m));
    }
    for (let d = 1; d <= daysLen; d++) {
      days.push(this.formatNum(d));
    }
    for (let h = 0; h < hoursLen; h++) {
      hours.push(this.formatNum(h));
    }
    for (let m = 0; m < minutesLen; m++) {
      minutes.push(this.formatNum(m));
    }
    // for(let second=0;second<(disabledAfter?curDate.curSecond+1:60);second++){
    // 	seconds.push(this.formatNum(second));
    // }
    for (let s = 0; s < 60; s++) {
      seconds.push(this.formatNum(s));
    }
    return {
      years,
      months,
      days,
      hours,
      minutes,
      seconds
    };
  }

  getCurrenDate() {
    let curDate = new Date();
    let curYear = curDate.getFullYear();
    let curMonth = curDate.getMonth() + 1;
    let curMonthdays = new Date(curYear, curMonth, 0).getDate();
    let curDay = curDate.getDate();
    let curHour = curDate.getHours();
    let curMinute = curDate.getMinutes();
    let curSecond = curDate.getSeconds();
    return {
      curDate,
      curYear,
      curMonth,
      curMonthdays,
      curDay,
      curHour,
      curMinute,
      curSecond
    };
  }

  getDefaultDate() {
    let value = this.props.value;
    let reg = /[-|.]/g;
    let defaultDate = value ? new Date(value.replace(reg, "/")) : new Date();
    let defaultYear = defaultDate.getFullYear();
    let defaultMonth = defaultDate.getMonth() + 1;
    let defaultDay = defaultDate.getDate();
    let defaultDays = new Date(defaultYear, defaultMonth, 0).getDate() * 1;
    return {
      defaultDate,
      defaultYear,
      defaultMonth,
      defaultDay,
      defaultDays
    };
  }

  getStartDate = () => {
    let start = this.props.startYear;
    let startDate = "";
    if (start) {
      startDate = new Date(start + "/01/01");
    } else {
      startDate = new Date("1970/01/01");
    }
    return startDate;
  };

  getEndDate = () => {
    let end = this.props.endYear;
    let endDate = "";
    if (end) {
      endDate = new Date(end + "/12/01");
    } else {
      endDate = new Date();
    }
    return endDate;
  };

  getDval() {
    let reg = /[/|.]/g;
    let value = this.props.value.replace(reg, '-');
    let dVal = null;
    let aDate = new Date();
    let year = this.formatNum(aDate.getFullYear());
    let month = this.formatNum(aDate.getMonth() + 1);
    let day = this.formatNum(aDate.getDate());
    let hour = this.formatNum(aDate.getHours());
    let minute = this.formatNum(aDate.getMinutes());
    let second = this.formatNum(aDate.getSeconds());
    if (value) {
      let flag = this.checkValue(value);
      if (!flag) {
        dVal = [year, month, day, hour, minute, second];
      } else {
        switch (this.props.fields) {
          case "year":
            dVal = value ? [value] : [];
            break;
          case "month":
            dVal = value ? value.split("-") : [];
            break;
          case "day":
            dVal = value ? value.split("-") : [];
            break;
          case "hour":
            dVal = [...value.split(" ")[0].split("-"), ...value.split(" ")[1].split(":")];
            break;
          case "minute":
            dVal = value ? [...value.split(" ")[0].split("-"), ...value.split(" ")[1].split(":")] : [];
            break;
          case "second":
            dVal = [...value.split(" ")[0].split("-"), ...value.split(" ")[1].split(":")];
            break;
        }
      }
    } else {
      dVal = [year, month, day, hour, minute, second];
    }
    return dVal;
  }

  initData() {
    let years = [],
        months = [],
        days = [],
        hours = [],
        minutes = [],
        seconds = [];
    let dVal = [],
        pickVal = [];
    let range = {};
    let result = "",
        full = "",
        year,
        month,
        day,
        hour,
        minute,
        second,
        obj = {};
    let curFlag = this.props.current;
    let disabledAfter = this.props.disabledAfter;
    let curDate = this.getCurrenDate();
    let curYear = curDate.curYear;
    let curMonth = curDate.curMonth;
    let curDay = curDate.curDay;
    let curHour = curDate.curHour;
    let curMinute = curDate.curMinute;
    let curSecond = curDate.curSecond;
    let dateData = [];
    dVal = this.getDval();

    dateData = this.getData(dVal);
    years = dateData.years;
    months = dateData.months;
    days = dateData.days;
    hours = dateData.hours;
    minutes = dateData.minutes;
    seconds = dateData.seconds;
    switch (this.props.fields) {
      case "year":
        pickVal = disabledAfter ? [dVal[0] && years.indexOf(dVal[0]) !== -1 ? years.indexOf(dVal[0]) : 0] : curFlag ? [years.indexOf(curYear + '')] : [dVal[0] && years.indexOf(dVal[0]) !== -1 ? years.indexOf(dVal[0]) : 0];
        range = { years };
        year = dVal[0] ? dVal[0] : years[0];
        result = full = `${year}`;
        obj = {
          year
        };
        break;
      case "month":
        pickVal = disabledAfter ? [dVal[0] && years.indexOf(dVal[0]) !== -1 ? years.indexOf(dVal[0]) : 0, dVal[1] && months.indexOf(dVal[1]) !== -1 ? months.indexOf(dVal[1]) : 0] : curFlag ? [years.indexOf(curYear + ''), months.indexOf(this.formatNum(curMonth))] : [dVal[0] && years.indexOf(dVal[0]) !== -1 ? years.indexOf(dVal[0]) : 0, dVal[1] && months.indexOf(dVal[1]) !== -1 ? months.indexOf(dVal[1]) : 0];
        range = { years, months };
        year = dVal[0] ? dVal[0] : years[0];
        month = dVal[1] ? dVal[1] : months[0];
        result = full = `${year + '-' + month}`;
        obj = {
          year,
          month
        };
        break;
      case "day":
        pickVal = disabledAfter ? [dVal[0] && years.indexOf(dVal[0]) !== -1 ? years.indexOf(dVal[0]) : 0, dVal[1] && months.indexOf(dVal[1]) !== -1 ? months.indexOf(dVal[1]) : 0, dVal[2] && days.indexOf(dVal[2]) !== -1 ? days.indexOf(dVal[2]) : 0] : curFlag ? [years.indexOf(curYear + ''), months.indexOf(this.formatNum(curMonth)), days.indexOf(this.formatNum(curDay))] : [dVal[0] && years.indexOf(dVal[0]) !== -1 ? years.indexOf(dVal[0]) : 0, dVal[1] && months.indexOf(dVal[1]) !== -1 ? months.indexOf(dVal[1]) : 0, dVal[2] && days.indexOf(dVal[2]) !== -1 ? days.indexOf(dVal[2]) : 0];
        range = { years, months, days };
        year = dVal[0] ? dVal[0] : years[0];
        month = dVal[1] ? dVal[1] : months[0];
        day = dVal[2] ? dVal[2] : days[0];
        result = full = `${year + '-' + month + '-' + day}`;
        obj = {
          year,
          month,
          day
        };
        break;
      case "hour":
        pickVal = disabledAfter ? [dVal[0] && years.indexOf(dVal[0]) !== -1 ? years.indexOf(dVal[0]) : 0, dVal[1] && months.indexOf(dVal[1]) !== -1 ? months.indexOf(dVal[1]) : 0, dVal[2] && days.indexOf(dVal[2]) !== -1 ? days.indexOf(dVal[2]) : 0, dVal[3] && hours.indexOf(dVal[3]) !== -1 ? hours.indexOf(dVal[3]) : 0] : curFlag ? [years.indexOf(curYear + ''), months.indexOf(this.formatNum(curMonth)), days.indexOf(this.formatNum(curDay)), hours.indexOf(this.formatNum(curHour))] : [dVal[0] && years.indexOf(dVal[0]) !== -1 ? years.indexOf(dVal[0]) : 0, dVal[1] && months.indexOf(dVal[1]) !== -1 ? months.indexOf(dVal[1]) : 0, dVal[2] && days.indexOf(dVal[2]) !== -1 ? days.indexOf(dVal[2]) : 0, dVal[3] && hours.indexOf(dVal[3]) !== -1 ? hours.indexOf(dVal[3]) : 0];
        range = { years, months, days, hours };
        year = dVal[0] ? dVal[0] : years[0];
        month = dVal[1] ? dVal[1] : months[0];
        day = dVal[2] ? dVal[2] : days[0];
        hour = dVal[3] ? dVal[3] : hours[0];
        result = `${year + '-' + month + '-' + day + ' ' + hour}`;
        full = `${year + '-' + month + '-' + day + ' ' + hour + ':00:00'}`;
        obj = {
          year,
          month,
          day,
          hour
        };
        break;
      case "minute":
        pickVal = disabledAfter ? [dVal[0] && years.indexOf(dVal[0]) !== -1 ? years.indexOf(dVal[0]) : 0, dVal[1] && months.indexOf(dVal[1]) !== -1 ? months.indexOf(dVal[1]) : 0, dVal[2] && days.indexOf(dVal[2]) !== -1 ? days.indexOf(dVal[2]) : 0, dVal[3] && hours.indexOf(dVal[3]) !== -1 ? hours.indexOf(dVal[3]) : 0, dVal[4] && minutes.indexOf(dVal[4]) !== -1 ? minutes.indexOf(dVal[4]) : 0] : curFlag ? [years.indexOf(curYear + ''), months.indexOf(this.formatNum(curMonth)), days.indexOf(this.formatNum(curDay)), hours.indexOf(this.formatNum(curHour)), minutes.indexOf(this.formatNum(curMinute))] : [dVal[0] && years.indexOf(dVal[0]) !== -1 ? years.indexOf(dVal[0]) : 0, dVal[1] && months.indexOf(dVal[1]) !== -1 ? months.indexOf(dVal[1]) : 0, dVal[2] && days.indexOf(dVal[2]) !== -1 ? days.indexOf(dVal[2]) : 0, dVal[3] && hours.indexOf(dVal[3]) !== -1 ? hours.indexOf(dVal[3]) : 0, dVal[4] && minutes.indexOf(dVal[4]) !== -1 ? minutes.indexOf(dVal[4]) : 0];
        range = { years, months, days, hours, minutes };
        year = dVal[0] ? dVal[0] : years[0];
        month = dVal[1] ? dVal[1] : months[0];
        day = dVal[2] ? dVal[2] : days[0];
        hour = dVal[3] ? dVal[3] : hours[0];
        minute = dVal[4] ? dVal[4] : minutes[0];
        full = `${year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':00'}`;
        result = `${year + '-' + month + '-' + day + ' ' + hour + ':' + minute}`;
        obj = {
          year,
          month,
          day,
          hour,
          minute
        };
        break;
      case "second":
        pickVal = disabledAfter ? [dVal[0] && years.indexOf(dVal[0]) !== -1 ? years.indexOf(dVal[0]) : 0, dVal[1] && months.indexOf(dVal[1]) !== -1 ? months.indexOf(dVal[1]) : 0, dVal[2] && days.indexOf(dVal[2]) !== -1 ? days.indexOf(dVal[2]) : 0, dVal[3] && hours.indexOf(dVal[3]) !== -1 ? hours.indexOf(dVal[3]) : 0, dVal[4] && minutes.indexOf(dVal[4]) !== -1 ? minutes.indexOf(dVal[4]) : 0, dVal[5] && seconds.indexOf(dVal[5]) !== -1 ? seconds.indexOf(dVal[5]) : 0] : curFlag ? [years.indexOf(curYear + ''), months.indexOf(this.formatNum(curMonth)), days.indexOf(this.formatNum(curDay)), hours.indexOf(this.formatNum(curHour)), minutes.indexOf(this.formatNum(curMinute)), seconds.indexOf(this.formatNum(curSecond))] : [dVal[0] && years.indexOf(dVal[0]) !== -1 ? years.indexOf(dVal[0]) : 0, dVal[1] && months.indexOf(dVal[1]) !== -1 ? months.indexOf(dVal[1]) : 0, dVal[2] && days.indexOf(dVal[2]) !== -1 ? days.indexOf(dVal[2]) : 0, dVal[3] && hours.indexOf(dVal[3]) !== -1 ? hours.indexOf(dVal[3]) : 0, dVal[4] && minutes.indexOf(dVal[4]) !== -1 ? minutes.indexOf(dVal[4]) : 0, dVal[5] && seconds.indexOf(dVal[5]) !== -1 ? seconds.indexOf(dVal[5]) : 0];
        range = { years, months, days, hours, minutes, seconds };
        year = dVal[0] ? dVal[0] : years[0];
        month = dVal[1] ? dVal[1] : months[0];
        day = dVal[2] ? dVal[2] : days[0];
        hour = dVal[3] ? dVal[3] : hours[0];
        minute = dVal[4] ? dVal[4] : minutes[0];
        second = dVal[5] ? dVal[5] : seconds[0];
        result = full = `${year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second}`;
        obj = {
          year,
          month,
          day,
          hour,
          minute,
          second
        };
        break;
      default:
        range = { years, months, days };
        break;
    }
    this.setState({
      range,
      checkObj: obj
    }, () => {
      this.setState({
        pickVal
      });
    });
    this.props.change({ // eslint-disable-line
      result: result,
      value: full,
      obj: obj
    });
  }

  handlerChange = e => {
    let arr = [...e.detail.value];
    let data = this.state.range;
    let year = "",
        month = "",
        day = "",
        hour = "",
        minute = "",
        second = "";
    let result = "",
        full = "",
        obj = {};
    let months = null,
        days = null,
        hours = null,
        minutes = null;
    let range = this.state.range;
    year = arr[0] || arr[0] === 0 ? data.years[arr[0]] || data.years[data.years.length - 1] : "";
    month = arr[1] || arr[1] === 0 ? data.months[arr[1]] || data.months[data.months.length - 1] : "";
    day = arr[2] || arr[2] === 0 ? data.days[arr[2]] || data.days[data.days.length - 1] : "";
    hour = arr[3] || arr[3] === 0 ? data.hours[arr[3]] || data.hours[data.hours.length - 1] : "";
    minute = arr[4] || arr[4] === 0 ? data.minutes[arr[4]] || data.minutes[data.minutes.length - 1] : "";
    second = arr[5] || arr[5] === 0 ? data.seconds[arr[5]] || data.seconds[data.seconds.length - 1] : "";
    let resetData = this.resetData(year, month, day, hour, minute);
    switch (this.props.fields) {
      case "year":
        result = full = `${year}`;
        obj = {
          year
        };
        break;
      case "month":
        result = full = `${year + '-' + month}`;
        if (this.props.disabledAfter) months = resetData.months;
        if (months) {
          range.months = months;
          this.setState({
            range
          });
        }
        obj = {
          year,
          month
        };
        break;
      case "day":
        result = full = `${year + '-' + month + '-' + day}`;
        if (this.props.disabledAfter) {
          months = resetData.months;
          days = resetData.days;
        } else {
          if (year % 4 === 0 || month !== this.state.checkObj.month) {
            days = resetData.days;
          }
        }
        if (months) range.months = months;
        if (days) range.days = days;
        this.setState({
          range
        });
        obj = {
          year,
          month,
          day
        };
        break;
      case "hour":
        result = `${year + '-' + month + '-' + day + ' ' + hour}`;
        full = `${year + '-' + month + '-' + day + ' ' + hour + ':00:00'}`;
        if (this.props.disabledAfter) {
          months = resetData.months;
          days = resetData.days;
          hours = resetData.hours;
        } else {
          if (year % 4 === 0 || month !== this.state.checkObj.month) {
            days = resetData.days;
          }
        }
        if (months) range.months = months;
        if (days) range.days = days;
        if (hours) range.hours = hours;
        this.setState({
          range
        });
        obj = {
          year,
          month,
          day,
          hour
        };
        break;
      case "minute":
        full = `${year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':00'}`;
        result = `${year + '-' + month + '-' + day + ' ' + hour + ':' + minute}`;
        if (this.props.disabledAfter) {
          months = resetData.months;
          days = resetData.days;
          hours = resetData.hours;
          minutes = resetData.minutes;
        } else {
          if (year % 4 === 0 || month !== this.state.checkObj.month) {
            days = resetData.days;
          }
        }
        if (months) range.months = months;
        if (days) range.days = days;
        if (hours) range.hours = hours;
        if (minutes) range.minutes = minutes;
        this.setState({
          range
        });
        obj = {
          year,
          month,
          day,
          hour,
          minute
        };
        break;
      case "second":
        result = full = `${year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second}`;
        if (this.props.disabledAfter) {
          months = resetData.months;
          days = resetData.days;
          hours = resetData.hours;
          minutes = resetData.minutes;
          // seconds=resetData.seconds;
        } else {
          if (year % 4 === 0 || month !== this.state.checkObj.month) {
            days = resetData.days;
          }
        }
        if (months) range.months = months;
        if (days) range.days = days;
        if (hours) range.hours = hours;
        if (minutes) range.minutes = minutes;
        // if(seconds)this.range.seconds=seconds;
        this.setState({
          range
        });
        obj = {
          year,
          month,
          day,
          hour,
          minute,
          second
        };
        break;
    }
    this.setState({
      checkObj: obj
    });
    this.props.change({ // eslint-disable-line
      result: result,
      value: full,
      obj: obj
    });
  };

  render() {
    const { pickVal, range } = this.state;
    return <View className="w-picker-view">
          {this.props.fields === 'year' ? <PickerView className="d-picker-view" indicatorStyle={this.props.itemHeight} value={pickVal} onChange={this.handlerChange}>
              <PickerViewColumn>
                {range.years.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}年</View>;
          })}
              </PickerViewColumn>
            </PickerView> : null}

          {this.props.fields === 'month' ? <PickerView className="d-picker-view" indicatorStyle={this.props.itemHeight} value={pickVal} onChange={this.handlerChange}>
              <PickerViewColumn>
                {range.years.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}年</View>;
          })}
              </PickerViewColumn>
              <PickerViewColumn>
                {range.months.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}月</View>;
          })}
              </PickerViewColumn>
            </PickerView> : null}

          {this.props.fields === 'day' ? <PickerView className="d-picker-view" indicatorStyle={this.props.itemHeight} value={pickVal} onChange={this.handlerChange}>
              <PickerViewColumn>
                {range.years.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}年</View>;
          })}
              </PickerViewColumn>
              <PickerViewColumn>
                {range.months.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}月</View>;
          })}
              </PickerViewColumn>
              <PickerViewColumn>
                {range.days.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}日</View>;
          })}
              </PickerViewColumn>
            </PickerView> : null}

          {this.props.fields === 'hour' ? <PickerView className="d-picker-view" indicatorStyle={this.props.itemHeight} value={pickVal} onChange={this.handlerChange}>
              <PickerViewColumn>
                {range.years.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}年</View>;
          })}
              </PickerViewColumn>
              <PickerViewColumn>
                {range.months.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}月</View>;
          })}
              </PickerViewColumn>
              <PickerViewColumn>
                {range.days.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}日</View>;
          })}
              </PickerViewColumn>
              <PickerViewColumn>
                {range.hours.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}时</View>;
          })}
              </PickerViewColumn>
            </PickerView> : null}
          {this.props.fields === 'minute' ? <PickerView className="d-picker-view" indicatorStyle={this.props.itemHeight} value={pickVal} onChange={this.handlerChange}>
              <PickerViewColumn>
                {range.years.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}年</View>;
          })}
              </PickerViewColumn>
              <PickerViewColumn>
                {range.months.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}月</View>;
          })}
              </PickerViewColumn>
              <PickerViewColumn>
                {range.days.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}日</View>;
          })}
              </PickerViewColumn>
              <PickerViewColumn>
                {range.hours.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}时</View>;
          })}
              </PickerViewColumn>
              <PickerViewColumn>
                {range.minutes.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}分</View>;
          })}
              </PickerViewColumn>
            </PickerView> : null}
          {this.props.fields === 'second' ? <PickerView className="d-picker-view" indicatorStyle={this.props.itemHeight} value={pickVal} onChange={this.handlerChange}>
              <PickerViewColumn>
                {range.years.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}年</View>;
          })}
              </PickerViewColumn>
              <PickerViewColumn>
                {range.months.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}月</View>;
          })}
              </PickerViewColumn>
              <PickerViewColumn>
                {range.days.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}日</View>;
          })}
              </PickerViewColumn>
              <PickerViewColumn>
                {range.hours.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}时</View>;
          })}
              </PickerViewColumn>
              <PickerViewColumn>
                {range.minutes.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}分</View>;
          })}
              </PickerViewColumn>
              <PickerViewColumn>
                {range.seconds.map((item, index) => {
            return <View className="w-picker-item" key={index}>{item}秒</View>;
          })}
              </PickerViewColumn>
            </PickerView> : null}
        </View>;
  }
}
DatePicker.propTypes = {
  itemHeight: PropTypes.string,
  startYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  endYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.number]),
  current: PropTypes.bool, // 是否默认选中当前日期
  disabledAfter: PropTypes.bool, // 是否禁用当前之后的日期
  fields: PropTypes.string
};
DatePicker.defaultProps = {
  itemHeight: "44px",
  startYear: "",
  endYear: "",
  value: "",
  current: false,
  disabledAfter: false,
  fields: "day"
};