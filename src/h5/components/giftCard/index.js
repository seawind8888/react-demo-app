import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View, Image, Text } from "@tarojs/components";
import PropTypes from "prop-types";

import "./index.less";

export default class GiftCard extends Taro.Component {
  render() {
    const { theme } = this.props;
    return <View className="co-giftCard">
        <View className="co-giftCard__top" style={{ color: theme }}>
          <View className="co-giftCard__top_title">领券后满200减3077777777777777777777<Text className="_innerText">(全店使用)</Text></View>
          <View className="co-giftCard__top_content">
            <View className="imageBox">
              <Image src="https://brand-guide.shuyun.com/IAM/05b7a2ef9d02.svg" className="top_img" />
              <Image src="https://brand-guide.shuyun.com/IAM/05b7a2ef9d02.svg" className="top_img" />
              <Image src="https://brand-guide.shuyun.com/IAM/05b7a2ef9d02.svg" className="top_img" />
            </View>
            <View className="right_price">
              <View className="priceBox">¥<Text className="price">30.00</Text></View>
              <View className="price_button" style={{ backgroundColor: theme }}>立即入会领券</View>
            </View>
          </View>
        </View>
        <View className="co-giftCard__bottom">
          <View className="co-giftCard_box">
            <Image src="https://brand-guide.shuyun.com/IAM/05b7a2ef9d02.svg" className="co-giftCard_box_img" />
          </View>
          <Text className="co-giftCard__bottom_text">天猫旗舰店</Text>
        </View>
      </View>;
  }
}

GiftCard.defaultProps = {
  name: "",
  image: "",
  time: "",
  theme: "#fe5000"
};

GiftCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  time: PropTypes.string,
  theme: PropTypes.string
};