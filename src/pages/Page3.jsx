import React from "react";

import { Rnd } from "react-rnd";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};
class Page3 extends React.Component {
  state = {
    x: 0,
    y: 0,
    z: 0
  }
  onDragStop = (e, d) => {
    let x = d.x
    let y = d.y
    console.log(x, y)
    if(x > 112) { 
      x = 112
    }
   
    this.setState({ x, y })
  }
  render() {
    return (
      <div style={{ width: "240px", height: "426px", backgroundColor: "red" }}>
        <Rnd
          style={style}
          position={{ x: this.state.x, y: this.state.y }}
          onDragStop={this.onDragStop}
          default={{
            x: 0,
            y: 0,
            width: 128,
            height: 128,
          }}
        >
          Rnd
        </Rnd>
      </div>
    );
  }
}

export default Page3;
