import Nerv from "nervjs";
/* eslint-disable react/forbid-elements */
import Taro, { getSystemInfoSync as _getSystemInfoSync } from "@tarojs/taro-h5";
import PropTypes from "prop-types";
import { View, MovableArea, MovableView, Text } from "@tarojs/components";
import "./index.less";

class Affix extends Taro.Component {
  static propTypes = {
    onOpenRecord: PropTypes.func,
    onMoreInteract: PropTypes.func,
    right: PropTypes.number,
    bottom: PropTypes.number
  };

  static defaultProps = {
    onOpenRecord: () => {},
    onMoreInteract: () => {},
    right: 20,
    bottom: 114
  };

  isDrag = false;
  prevPageX = 0;
  prevPageY = 0;

  lastPageX = 0;
  lastPageY = 0;

  onTouchStart = evt => {
    this.isDrag = true;
    const { pageX, pageY } = evt.touches[0];
    this.prevPageX = pageX;
    this.prevPageY = pageY;
  };

  onTouchMove = evt => {
    evt.stopPropagation();
    evt.preventDefault();
    if (this.isDrag) {
      const { pageX, pageY } = evt.touches[0];
      const _x = pageX - this.prevPageX;
      const _y = pageY - this.prevPageY;
      this.prevPageX = pageX;
      this.prevPageY = pageY;
      const { windowHeight, windowWidth } = _getSystemInfoSync();
      const right = this.lastPageX;
      const bottom = this.lastPageY;
      const { width, height } = this.refs.box.getBoundingClientRect();
      let _right = right - _x > 0 ? right - _x : 0;
      if (_right > windowWidth - width) {
        _right = windowWidth - width;
      }
      let _bottom = bottom - _y > 0 ? bottom - _y : 0;
      if (_bottom > windowHeight - height) {
        _bottom = windowHeight - height;
      }
      this.lastPageX = _right;
      this.lastPageY = _bottom;
      this.refs.box.style.right = _right + "px";
      this.refs.box.style.bottom = _bottom + "px";
    }
  };

  onTouchEnd = () => {
    this.isDrag = false;
  };

  render() {
    const { right, bottom, onMoreInteract, onOpenRecord } = this.props;
    {
      return <div className="co-affix">
          <div ref="box" style={{
          right: Taro.pxTransform(right),
          bottom: Taro.pxTransform(bottom)
        }} className="co-mview" onTouchStart={this.onTouchStart} draggable onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd}>
            <div className="co-affixBt" onClick={onOpenRecord}>
              <label className="co-affixText">奖励记录</label>
            </div>
            <div className="co-affixBt" onClick={onMoreInteract}>
              <label className="co-affixText">更多互动</label>
            </div>
          </div>
        </div>;
    }
    return <MovableArea className="co-affix">
        <MovableView className="co-mview" style={{
        right: Taro.pxTransform(right),
        bottom: Taro.pxTransform(bottom)
      }} direction="all">
          <View className="co-affixBt" onClick={onOpenRecord}>
            <Text className="co-affixText">奖励记录</Text>
          </View>
          <View className="co-affixBt" onClick={onMoreInteract}>
            <Text className="co-affixText">更多互动</Text>
          </View>
        </MovableView>
      </MovableArea>;
  }
}

export default Affix;