import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import PropTypes from "prop-types";
import { View } from "@tarojs/components";
import cls from "classnames";
import { isFunction } from "../../utils/index";
import "./index.less";

class CoAlert extends Taro.Component {
  static propTypes = {
    visible: PropTypes.bool,
    info: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    noMask: PropTypes.bool,
    zIndex: PropTypes.number
  };

  static defaultProps = {
    visible: false,
    info: "",
    noMask: false,
    zIndex: 9999,
    onConfirm: () => {},
    onCancel: () => {}
  };

  constructor(props) {
    super(props);
    const { visible } = this.props;
    this.state = {
      _visible: visible
    };
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.props;
    if (visible !== nextProps.visible) {
      this.setState({
        _visible: nextProps.visible
      });
    }
  }

  defaultControls = [{
    title: "取消",
    onClick: () => {
      this.handleCancel();
    }
  }, {
    title: "确定",
    onClick: () => {
      this.handleConfirm();
    },
    textColor: "#FE5000"
  }];

  handleConfirm() {
    const { onConfirm } = this.props;
    this.setState({
      _visible: false
    });
    if (isFunction(onConfirm)) {
      onConfirm();
    }
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      _visible: false
    });
    if (isFunction(onCancel)) {
      onCancel();
    }
  };

  renderControls() {
    const { controls = this.defaultControls } = this.props;
    const max = controls.length - 1;
    return controls.map((item, idx) => {
      const clsType = (_max, _idx) => {
        if (_max === 0) return "def";
        if (_idx === 0) return "first";
        if (_idx === _max) return "last";
        return "middle";
      };
      return <View className={cls({
        ["co-alert_prompt_ctrl"]: true,
        [clsType(max, idx)]: true
      })} key={item.title} style={{
        width: `${1 / controls.length * 100}%`,
        color: item.textColor
      }} onClick={item.onClick}>
          {item.title}
        </View>;
    });
  }

  render() {

    const { children, info, noMask, zIndex } = this.props;
    const { _visible } = this.state;
    return _visible ? <View className={cls({
      ["co-alert_wrapper"]: true,
      ["co-alert_popup"]: _visible
    })} style={{ zIndex }}>
        <View className={cls({
        ["co-alert_prompt_wrapper"]: true,
        ["co-alert_no_mask"]: noMask
      })}>
          <View className="co-alert_prompt_box">
            <View className="co-alert_prompt_content">
              {info ? info : children}
            </View>
            <View className="co-alert_prompt_controls">
              {this.renderControls()}
            </View>
          </View>
        </View>
      </View> : null;
  }
}

export default CoAlert;