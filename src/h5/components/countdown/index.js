import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View, Text } from "@tarojs/components";

import "./index.less";

export default class Countdown extends Taro.Component {
  static options = {
    addGlobalClass: true
  };

  static defaultProps = {
    targetTime: "", // 以时间来进行倒计时
    color: "inherit", // 字体颜色

    // targetTime 模式下生效
    showText: false, //  显示时分秒
    showDay: false, // 显示天数
    symbol: ":", // 间隔符号
    isClose: false, // 手动关闭倒计时

    pStyles: {}, // 父组件定义样式
    // 共用事件
    onTick: () => {}, // 倒计时过程事件
    onEnd: () => {} // 倒计时结束事件
  };

  constructor() {
    super(...arguments);
    this.state = {
      day: "0",
      hour: "00",
      minute: "00",
      second: "00"
    };
    this.targetTimestamp = null;
    this.timer = null;
  }

  componentDidMount() {
    const { targetTime } = this.props;
    if (targetTime) {
      this.formatTargetTime(targetTime);
    }
  }

  componentWillUnmount() {
    this.targetTimestamp = null;
    clearInterval(this.timer);
  }

  componentDidHide() {
    this.targetTimestamp = null;
    clearInterval(this.timer);
  }

  componentDidShow() {
    const { targetTime } = this.props;
    if (targetTime) {
      this.formatTargetTime(targetTime);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { targetTime } = nextProps;
    if (targetTime && targetTime !== this.props.targetTime) {
      this.formatTargetTime(targetTime);
    }
  }

  // 处理日期格式
  formatTargetTime(targetTime) {
    if (!targetTime) {
      return;
    }
    // 避免iOS端上的日期格式有问题
    let time = targetTime.replace(/-/g, "/");
    this.targetTimestamp = new Date(time).getTime();
    this.getRemainingSecond();
  }

  // 计算剩余时间秒数
  getRemainingSecond() {
    if (!this.targetTimestamp) return;
    // 当前时间
    let currentTimestamp = new Date().getTime();
    // 剩余时间
    let remainingSecond = Math.floor((this.targetTimestamp - currentTimestamp) / 1000);
    // 天 时 分 秒
    let day = "";
    let hour = "";
    let minute = "";
    let second = "";
    if (remainingSecond > 0 && !this.props.isClose) {
      day = this.formatNum(parseInt(remainingSecond / 86400));
      hour = this.props.showDay ? this.formatNum(parseInt(remainingSecond % 86400 / 3600)) : this.formatNum(parseInt(remainingSecond / 3600));
      minute = this.formatNum(parseInt(remainingSecond % 3600 / 60));
      second = this.formatNum(parseInt(remainingSecond % 3600 % 60));
      this.timeTick(remainingSecond);
    } else {
      day = "0";
      hour = minute = second = "00";
      this.onTimeEnd();
    }
    this.setTimeState(day, hour, minute, second);
  }

  // 设置时间
  setTimeState(day, hour, minute, second) {
    this.setState({
      day,
      hour,
      minute,
      second
    });
  }

  // 格式数字
  formatNum(num) {
    return num > 9 ? `${num}` : `0${num}`;
  }

  // 倒计时过程事件
  timeTick(remainingSecond) {
    this.props.onTick && this.props.onTick(remainingSecond);
    setTimeout(() => {
      this.getRemainingSecond();
    }, 1000);
  }

  // 倒计时结束触发事件
  onTimeEnd() {
    this.targetTimestamp = null;
    this.props.onEnd && this.props.onEnd();
  }

  render() {
    const {
      color,
      symbol,
      showDay,
      showText,
      targetTime,
      pStyles
    } = this.props;
    const { day, hour, minute, second } = this.state;
    const { timeStyle = {} } = pStyles;
    if (targetTime) {
      return <View className="co-countdown" style={{ color: color }}>
          {showDay && <Text>
              <Text style={timeStyle}> {day}</Text>
              {showText && <Text>天</Text>}
            </Text>}
          <Text>
            <Text style={timeStyle}>{hour}</Text>
            {showText && <Text>时</Text>}
            <Text>{symbol}</Text>
          </Text>
          <Text style={timeStyle}>{minute}</Text>
          {showText && <Text>分</Text>}
          <Text>{symbol}</Text>
          <Text style={timeStyle}>{second}</Text>
          {showText && <Text>秒</Text>}
        </View>;
    }
  }
}