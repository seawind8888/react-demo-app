import React from 'react'
import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View } from "@tarojs/components";
import "./index.less";

class ProgressBar extends Taro.Component {
  render() {
    const { percent = 0, className = "", barStyle = {} } = this.props;

    const mergedBarStyle = { width: `${percent}%`, ...barStyle };
    return <View className={`${className} co-progress`}>
      <View className="co-progress-bar" style={mergedBarStyle} />
    </View>;
  }

}

export default Taro.memo(ProgressBar);