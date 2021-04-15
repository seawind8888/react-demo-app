import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import PropTypes from "prop-types";
import { View } from "@tarojs/components";
import "./index.less";

class CoMessage extends Taro.Component {

  constructor(props) {
    super(props);
    this.state = {
      _visible: false,
      _message: ""
    };
  }

  componentDidMount() {
    this.bindMessageListener();
  }

  // eslint-disable-next-line react/sort-comp
  componentDidShow() {
    this.bindMessageListener();
  }

  componentWillUnmount() {
    Taro.eventCenter.off("coMessage");
  }
  componentDidHide() {
    Taro.eventCenter.off("coMessage");
  }

  bindMessageListener() {
    const { onAutoClose } = this.props;
    Taro.eventCenter.on("coMessage", (options = {}) => {
      const { message, duration } = options;
      const _duration = duration || this.props.duration;
      this.setState({
        _visible: true,
        _message: message
      }, () => {
        setTimeout(() => {
          this.setState({
            _visible: false
          });
          onAutoClose();
        }, _duration);
      });
    });
    Taro.coMessage = Taro.eventCenter.trigger.bind(Taro.eventCenter, "coMessage");
  }

  render() {
    const { _visible, _message } = this.state;
    const __message = [...[_message]];
    return _visible ? <View className="co-message">
        {__message.map((item, i) => {
        return <View key={i}> {item} </View>;
      })}
      </View> : null;
  }
}

CoMessage.propTypes = {
  onAutoClose: PropTypes.func,
  duration: PropTypes.number
};

CoMessage.defaultProps = {
  onAutoClose: () => {},
  duration: 2000
};

export default CoMessage;