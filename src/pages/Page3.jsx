// import React, { Component } from 'react';
// import { Button, Datepicker } from 'cloud-react';

// class Page3 extends Component {
//   state = {
//     time: new Date()
//   }
//   handleChange = (value) => {
//     this.setState({
//       time: value
//     });
//   };
//   handleClear = () => {
//     this.setState({
//       time: ''
//     })
//   }

//   render() {
//     return (
//       <>
//       <Button onClick={this.handleClear}>清空</Button>
//       <Datepicker
//         showToday={true}
//         value={this.state.time}
//         showTimePicker={true}
//         minDate={new Date('2020/02/10 10:00:00')}
//         onChange={this.onInpChange}
//         placeholder='年月日'
//       />
//     </>
//     )
  
//   }
// }

// export default Page3;

import React, { useState } from 'react';
import { Datepicker } from 'cloud-react';

export default function Page3() {
    
    const onChange = (e) => {
        console.log(e)
    }

    return <Datepicker.TimePicker onChange={onChange} />
}
