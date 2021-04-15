import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View } from "@tarojs/components";
import cn from "classnames";
import "./index.less";

class CoButton extends Taro.Component {
  render() {
    const {
      children: children
    } = this.props;
    const {
      className,
      disabled,
      link,
      small,
      onClick,
      style = {}
    } = this.props;

    const classes = cn('co-btn', { 'co-btnLink': link, 'co-btnSmall': small }, className);
    const onClickDelegation = e => {
      console.log(onClick);
      !disabled && typeof onClick === "function" && onClick(e);
    };
    return <View className={classes} disabled={!!disabled} onClick={onClickDelegation} style={style}>
      {children}
    </View>;
  }

}

export default Taro.memo(CoButton);

CoButton.defaultProps = {
  onClick: () => {}
};