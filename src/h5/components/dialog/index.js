import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import PropTypes from "prop-types";
import { View } from "@tarojs/components";
import CoMask from "../mask/index";
import "./index.less";

class CoDialog extends Taro.Component {
  static propTypes = {
    renderHeader: PropTypes.node,
    renderFooter: PropTypes.node,
    maskClosable: PropTypes.bool,
    onVisibleChange: PropTypes.func,
    noHeader: PropTypes.bool,
    noFooter: PropTypes.bool,
    noMask: PropTypes.bool,
    style: PropTypes.object
  };

  static defaultProps = {
    renderHeader: null,
    renderFooter: null,
    maskClosable: false,
    noHeader: false,
    noFooter: false,
    noMask: false,
    onVisibleChange: () => {},
    style: {
      main: {},
      header: {},
      footer: {},
      content: {},
      mask: {}
    }
  };

  onMaskTouchMove = evt => {
    evt.stopPropagation();
  };

  render() {
    const {
      renderHeader,
      children,
      renderFooter,
      maskClosable,
      onVisibleChange,
      visible,
      noHeader,
      noFooter,
      style,
      noMask
    } = this.props;
    const onMaskTap = maskClosable ? () => onVisibleChange(false) : () => {};
    return visible ? <View>
        <View className="co-dialog" style={style.main}>
          {!noHeader && <View className="co-dialog__header" style={style.header} onTouchMove={this.onMaskTouchMove}>
              {renderHeader}
            </View>}
          <View className="co-dialog__content" style={style.content}>
            {children}
          </View>
          {!noFooter && <View className="co-dialog__footer" style={style.footer} onTouchMove={this.onMaskTouchMove}>
              {renderFooter}
            </View>}
        </View>
        {!noMask && <CoMask style={style.mask} visible={visible} onClick={onMaskTap} />}
      </View> : null;
  }
}

export default CoDialog;