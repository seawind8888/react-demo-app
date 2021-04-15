import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View, Image } from "@tarojs/components";
import PropTypes from 'prop-types';
import cls from "classnames";

import "./index.less";

export default class AwardRecord extends Taro.Component {

  constructor(props) {
    super(props);
    this.state = {
      animShow: false,
      show: props.visible
    };
  }

  componentDidMount() {
    const { show } = this.state;
    if (show) this.animShow();
  }

  onHide = () => {
    this.setState({ show: false }, () => {
      this.props.onClose && this.props.onClose();
    });
  };

  animHide = () => {
    this.setState({
      animShow: false
    });
    setTimeout(() => {
      this.onHide();
    }, 300);
  };

  animShow = () => {
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({
        animShow: true
      });
    }, 200);
  };

  onMaskClick = () => {
    this.animHide();
  };

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    if (visible !== this.state.show) {
      visible ? this.animShow() : this.animHide();
    }
  }

  render() {
    const { show, animShow } = this.state;
    const { theme } = this.props;
    const maskStyle = {
      display: show ? "block" : "none",
      opacity: animShow ? 1 : 0
    };
    const listStyle = {
      transition: animShow ? "all 225ms cubic-bezier(0, 0, 0.2, 1)" : "all 195ms cubic-bezier(0.4, 0, 0.6, 1)",
      backgroundColor: theme
    };

    const classObject = {
      "co-awardRecord--show": animShow
    };

    return show ? <View className={cls("co-awardRecord", classObject)}>
        <View className="co-awardRecord__mask" style={maskStyle} onClick={this.onMaskClick}></View>
        <View className="co-awardRecord__content" style={listStyle}>
          <View className="co-header">
            {this.props.renderHeader}
            <View className="co-header__close" onClick={this.onMaskClick}>
              <Image src="https://brand-guide.shuyun.com/IAM/4e4632dcb6f6.png" className="co_close_img" />
            </View>
          </View>
          <View className="co-body">
            {this.props.children}
          </View>
          <View className="co-footer">仅可查看30天奖励记录</View>
        </View>
      </View> : null;
  }
}

AwardRecord.defaultProps = {
  visible: false,
  renderHeader: null,
  onClose: () => {},
  theme: '#fe5000'
};

AwardRecord.propTypes = {
  visible: PropTypes.bool,
  renderHeader: PropTypes.node,
  onClose: PropTypes.func,
  theme: PropTypes.string
};