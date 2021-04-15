import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import './index.less';

class Select extends Taro.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dataSource: PropTypes.array,
    onChange: PropTypes.func,
    className: PropTypes.string
  };

  static defaultProps = {
    value: '',
    dataSource: [],
    onChange: () => {}
  };

  onChange = e => {
    const { dataSource, onChange } = this.props;
    const value = e.target.value;
    onChange(value);
  };

  render() {
    const { value, dataSource, className, style } = this.props;
    const { onChange } = this;
    return <View className="selectWrapper">
				{<select defaultValue={value} onChange={onChange} style={style} className="co-select">
						{!value ? <option value="" /> : null}
						{dataSource.map((v, index) => <option key={index} value={v.value}>{v.label}</option>)}
					</select>}
			</View>;
  }
}

export default Select;