import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import PropTypes from "prop-types";
import { View, Text } from "@tarojs/components";
import { awardCode } from "../../consts";
import "./index.less";

class Carousels extends Taro.Component {

  get dataSource() {
    const { dataSource = [] } = this.props;
    if (!dataSource.length) return [];
    const interceptName = str => {
      if (str && str.length > 10) {
        return `${str.substr(0, 10)}...`;
      }
      return str;
    };
    const list = dataSource.reduce((acc, winner) => {
      let displayN = Object.assign({}, winner);
      displayN.rewardName = interceptName(displayN.rewardName);
      acc.push(displayN);
      return acc;
    }, []);
    const perfectList = data => {
      if (data.length < 4) {
        const surplusNum = 6 - data.length;
        const ls = [...data, ...data.slice(0, surplusNum)];
        if (ls.length < 4) {
          return perfectList(ls);
        }
        return ls;
      }
      return data;
    };
    const data = perfectList(list);
    return [...data, data[0]];
  }

  render() {
    const { awardColor, style } = this.props;
    const dataLen = this.dataSource.length;
    const animationClass = `scrollAnamintion${dataLen - 1}`;
    return <View className="winnerList" style={style}>
        <View className="winnerContainer">
          {dataLen ? <View className={`winnerScroller scrollAnamintion${dataLen - 1}`}>
              {this.dataSource.map((item, index) => <View key={`winner-${index}`} className="winnerItem">
                  <Text className="name">{item.name}</Text>
                  <Text>抽中</Text>
                  {item.code ? <Text className="m20">
                      {awardCode[item.code]}
                    </Text> : null}
                  <Text className="awardValue" style={{
              color: awardColor
            }}>
                    {item.rewardName}
                  </Text>
                </View>)}
            </View> : <Text>暂时无人中奖</Text>}
        </View>
      </View>;
  }
}

Carousels.propTypes = {
  dataSource: PropTypes.array,
  className: PropTypes.string,
  awardColor: PropTypes.string,
  style: PropTypes.object
};

Carousels.defaultProps = {
  dataSource: [],
  className: "",
  awardColor: "#000",
  style: {}
};

export default Carousels;