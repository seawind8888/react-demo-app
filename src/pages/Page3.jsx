import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  Select,
  Toggle,
  Field,
  InputNumber,
  Datepicker
} from 'cloud-react';

class Page3 extends Component {
  field = new Field(this);

  onValidate() {
    this.field.validate((errs, values) => {
      console.log(errs, values);
    });
  }

  onReset() {
    this.field.reset();
  }

  render() {
    const { init } = this.field;

    return (
      <Form layout='horizontal' labelCol={{ span: 6 }} field={this.field}>
        <Form.Item label='用户名'>
          <Input
            placeholder='请输入用户名'
            {...init('userName', {
              rules: [
                { required: true, message: '用户名不能为空' },
                { len: 10 }
              ]
            })}
          />
        </Form.Item>

        <Form.Item label='邮箱'>
          <Input
            placeholder='请输入验证邮箱'
            {...init('email', {
              rules: [
                { required: true, message: '验证邮箱不能为空' },
                {
                  pattern: /^w+@[a-z]{2,10}.[a-z]{2,8}$/,
                  message: '邮箱格式不正确'
                }
              ]
            })}
          />
        </Form.Item>

        <Form.Item label='中奖次数'>
          <InputNumber
            placeholder='请输入中奖次数'
            {...init('number', {
              rules: [
                { required: true, message: '中奖次数不能为空' },
                { min: 5 },
                { max: 10 }
              ]
            })}
          />
        </Form.Item>

        <Form.Item label='所在国家' required>
          <Select
            {...init('address', {
              rules: [{ required: true, message: '所属地区不能为空' }]
            })}
          >
            <Select.Option value={1}>中国大陆</Select.Option>
            <Select.Option value={2}>美国</Select.Option>
            <Select.Option value={3}>日本</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label='是否开启' required>
          <Toggle
            checkedText='这里是开'
            unCheckedText='这里是关'
            {...init('toggle', {
              valueName: 'checked',
              rules: [{ required: true, message: '值不能为空' }]
            })}
          />
        </Form.Item>

        <Form.Item label='性别' required>
          <Radio.Group
            {...init('gender', {
              rules: [{ required: true, message: '性别不能为空' }]
            })}
          >
            <Radio value={1}>保密</Radio>
            <Radio value={2}>先生</Radio>
            <Radio value={3}>女士</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='所属平台' required>
          <Checkbox.Group
            {...init('platform', {
              rules: [
                { required: true, message: '所属平台必须选择一项' },
                {
                  validator: (name, value, callback) => {
                    setTimeout(() => {
                      callback(
                        value.length < 2 ? '所属平台必须选择两个以上' : ''
                      );
                    }, 300);
                  }
                }
              ]
            })}
          >
            <Checkbox value={1}>淘宝</Checkbox>
            <Checkbox value={2}>京东</Checkbox>
            <Checkbox value={3}>苏宁</Checkbox>
            <Checkbox value={4}>蘑菇街</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label='备注'>
          <Input.Textarea
            autoSize
            minRows={2}
            placeholder='备注信息...'
            {...init('remarks')}
          />
        </Form.Item>
        <Form.Item label='时间' required>
          <Datepicker.RangePicker
          {...init('time', {
            valueName: 'time',
            rules: [{ required: true, message: '时间不能为空' }]
          })}
            minDate={new Date('2018/07/03')}
            maxDate={new Date('2019/10/23')}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button
            type='primary'
            style={{ marginRight: 10 }}
            onClick={this.onValidate.bind(this)}
          >
            提交
          </Button>
          <Button onClick={this.onReset.bind(this)}>重置</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Page3;
