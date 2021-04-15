import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import PropTypes from 'prop-types';
import { View, Text } from '@tarojs/components';
import cls from 'classnames';
import DatePicker from "./DatePicker/index";
import './index.less';

let defaultTime = new Date().getFullYear();

export default class WPicker extends Taro.Component {
  state = {
    itemHeight: `height: 88rpx;`,
    visible: false,
    result: {},
    confirmFlag: true,
    createKey: null
  };
  componentWillMount() {
    this.props.onRef(this);
    this.setState({
      createKey: Math.random() * 1000
    });
  }
  touchStart = () => {
    if (this.props.timeout) {
      this.setState({
        confirmFlag: false
      });
    }
  };
  touchEnd = () => {
    if (this.props.timeout) {
      setTimeout(() => {
        this.setState({
          confirmFlag: true
        });
      }, 500);
    }
  };
  handlerChange = res => {
    this.setState({
      result: { ...res }
    });
  };
  show = () => {
    this.setState({
      visible: true
    });
  };
  hide = () => {
    this.setState({
      visible: false
    });
  };

  onCancel = () => {
    this.setState({
      visible: false
    });
    this.props.cancel(); // eslint-disable-line
  };

  pickerConfirm = () => {
    if (!this.state.confirmFlag) {
      return;
    }
    this.props.confirm(this.state.result); // eslint-disable-line
    this.setState({
      visible: false
    });
  };

  render() {
    const { itemHeight, visible, createKey } = this.state;
    return <View className="w-picker" key={createKey} data-key={createKey}>
          <View className={cls('mask', { visible })} onTap={this.onCancel} catchtouchmove />
          <View className={cls('w-picker-cnt', { visible })}>
            <View className="w-picker-header" catchtouchmove>
              <Text onTap={this.onCancel}>取消</Text>

              <Text style={'color:' + this.props.themeColor} onTap={this.pickerConfirm}>确定</Text>
            </View>

            <DatePicker className="w-picker-wrapper" startYear={this.props.startYear} endYear={this.props.endYear} value={this.props.value} fields={this.props.fields} itemHeight={itemHeight} current={this.props.current} disabledAfter={this.props.disabledAfter} change={this.handlerChange} touchstart={this.touchStart} touchend={this.touchEnd}>
            </DatePicker>

          </View>
          {this.props.children}
        </View>;
  }
}
WPicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]), // 默认值
  current: PropTypes.bool, // 是否默认显示当前时间，如果是，传的默认值将失效
  second: PropTypes.bool, // time-picker是否显示秒
  mode: PropTypes.string,
  themeColor: PropTypes.string, // 确认按钮主题颜色
  fields: PropTypes.string, // 日期颗粒度:year、month、day、hour、minute、second
  disabledAfter: PropTypes.bool, // 是否禁用当前之后的日期
  options: PropTypes.oneOfType([// selector,region数据源
  PropTypes.array, PropTypes.object]),
  defaultProps: PropTypes.object, // selector,linkagle字段转换配置
  defaultType: PropTypes.string,
  hideArea: PropTypes.bool, // mode=region时，是否隐藏区县列
  level: PropTypes.oneOfType([// 多级联动层级，表示几级联动,区间2-4;
  PropTypes.string, PropTypes.number]),
  timeout: PropTypes.bool, // 是否开启点击延迟,当快速滚动 还没有滚动完毕点击关闭时得到的值是不准确的
  expand: PropTypes.oneOfType([// mode=shortterm 默认往后拓展天数
  PropTypes.string, PropTypes.number]),
  startYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  endYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cancel: PropTypes.func
};
WPicker.defaultProps = {
  value: "",
  current: false,
  second: true,
  mode: "date",
  themeColor: "#f5a200",
  fields: "date",
  disabledAfter: false,
  options: [],
  defaultProps: {
    label: "label",
    value: "value",
    children: "children"
  },
  defaultType: "label",
  hideArea: false,
  level: 2,
  timeout: false,
  expand: 30,
  startYear: 1950,
  endYear: defaultTime,
  cancel: () => {}
};