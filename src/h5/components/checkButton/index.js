import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import PropTypes from 'prop-types';
import { View, Text } from '@tarojs/components';
import cn from 'classnames';
import './index.less';

class CheckButton extends Taro.Component {
  static propTypes = {
    theme: PropTypes.string,
    className: PropTypes.string,
    checked: PropTypes.bool,
    children: PropTypes.node,
    onToggle: PropTypes.func
  };

  onToggle = value => {
    this.props.onToggle(value);
  };

  render() {
    const { theme, checked, children, className } = this.props;
    const classes = cn('check-btn check-btn-link', { 'check-btn-checked': checked }, className);

    return <View className={classes} onClick={this.onToggle ? this.onToggle.bind(this, !checked) : () => {}}>
	      <Text className={`icon iconfont ${checked ? "icon-radio-fill" : "icon-radio"}`} style={{ color: theme, fontSize: '18px' }} />
	      {children}
	    </View>;
  }
}

export default CheckButton;