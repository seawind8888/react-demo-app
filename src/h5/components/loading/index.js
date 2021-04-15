import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import cls from 'classnames';
import './index.less';

class Loading extends Taro.Component {
  render() {
    const { noCenter, style } = this.props;
    const classes = cls({
      ['co-loading_isCenter']: !noCenter,
      ['co-loading_noCenter']: noCenter
    });
    return <View className={classes} style={style}>
        <View className="co-loading_loading_dot"></View>
        <View className="co-loading_loading_dot"></View>
        <View className="co-loading_loading_dot"></View>
        <View className="co-loading_loading_dot"></View>
        <View className="co-loading_loading_dot"></View>
        <View className="co-loading_loading_dot"></View>
        <View className="co-loading_loading_dot"></View>
        <View className="co-loading_loading_dot"></View>
      </View>;
  }

}

export default Loading;