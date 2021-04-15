import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View, Image, Text } from "@tarojs/components";
import PropTypes from "prop-types";

import "./index.less";

export default class AwardItem extends Taro.Component {
  render() {
    const { isOperate, image, name, theme, checked, onClickItem } = this.props;
    return <View className="co-awardItem" style={{ color: theme }}>
        <View className="co-awardItem__inner">
          <View className="co-awardItem__left">
            <View className="co-award-icon">
              <Image className="co-award-img" src={image} />
            </View>
            <View className="co-award-content">
              <View className="co-award-title">{name}</View>
              {this.props.renderSub}
            </View>
          </View>
          {isOperate && <View className="co-awardItem__right" style={{ color: theme }} onClick={onClickItem}>
            {!checked && <Text className="co-awardItem-btfault">立即领取</Text>}
            {checked && <Text className="co-awardItem-btover">已领取</Text>}
          </View>}
        </View>
      </View>;
  }
}

AwardItem.defaultProps = {
  isOperate: false,
  name: "",
  image: "",
  theme: "#fe5000",
  checked: false,
  renderSub: null,
  onClickItem: () => {}
};

AwardItem.propTypes = {
  isOperate: PropTypes.bool,
  name: PropTypes.string,
  image: PropTypes.string,
  theme: PropTypes.string,
  checked: PropTypes.bool,
  renderSub: PropTypes.node,
  onClickItem: PropTypes.func
};