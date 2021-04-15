import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import PropTypes from "prop-types";
import { View } from "@tarojs/components";
import "./index.less";

class CoMask extends Taro.Component {
  static propTypes = {
    visible: PropTypes.bool,
    onClick: PropTypes.func,
    zIndex: PropTypes.number,
    style: PropTypes.object
  };

  static defaultProps = {
    visible: false,
    zIndex: 10,
    style: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      _isOpened: false,
      _onClick: () => {},
      _zIndex: 10
    };
  }

  componentDidMount() {
    this.bindMessageListener();
  }

  componentWillUnmount() {
    Taro.eventCenter.off("coMaskOpen");
    Taro.eventCenter.off("coMaskClose");
  }

  componentDidHide() {
    Taro.eventCenter.off("coMaskOpen");
    Taro.eventCenter.off("coMaskClose");
  }

  componentDidShow() {
    this.bindMessageListener();
  }

  onMaskTouchMove = evt => {
    evt.stopPropagation();
  };

  bindMessageListener() {
    Taro.eventCenter.on("coMaskOpen", (options = {}) => {
      const { onClick, zIndex } = options;
      const newState = {
        _isOpened: true,
        _onClick: onClick,
        _zIndex: zIndex
      };
      this.setState(newState);
    });

    Taro.eventCenter.on("coMaskClose", () => {
      const newState = {
        _isOpened: false
      };
      this.setState(newState);
    });
    // 绑定函数
    Taro.coMask = {
      open: Taro.eventCenter.trigger.bind(Taro.eventCenter, "coMaskOpen"),
      close: Taro.eventCenter.trigger.bind(Taro.eventCenter, "coMaskClose")
    };
  }

  render() {
    const { visible, zIndex, style = {}, onClick } = this.props;
    const { _isOpened, _onClick, _zIndex } = this.state;
    const __zIndex = zIndex || _zIndex;
    const __isOpened = visible || _isOpened;
    const __onClick = onClick || _onClick;

    return __isOpened ? <View className="co-mask" style={{
      zIndex: __zIndex,
      ...style
    }} onTouchMove={this.onMaskTouchMove} onClick={__onClick} /> : null;
  }
}

export default CoMask;