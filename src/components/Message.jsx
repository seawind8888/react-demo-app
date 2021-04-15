import React from 'react';
import ReactDOM from 'react-dom'



const Message = ({visible, message}) =>  (<div>{visible && message}</div>)

Message.show = (message = '') => {
  const div = document.createElement('div').add;
  document.body.appendChild(div);
  ReactDOM.render(<Message visible={true} message={message}/>, div)
}

Message.close = () => {
    ReactDOM.render(<Message visible={false}/>, document.getElementById('root'))
}
export default Message