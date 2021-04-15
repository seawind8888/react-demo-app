import React, { Component, useContext } from 'react'
// import { inject, ViewModel, Store } from 'mmlpx';
import FunCom from '../components/FunCom'
import { Button } from 'antd';

// @Store
// class UserStore {}

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};
const ThemeContext = React.createContext(themes.light);


function Page51() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }} onClick={() => {theme = '#000000'}}>
      I am styled by theme context!
    </button>
  );
}




// @ViewModel
// class Page51 extends Component {
//   // @inject(UserStore) userStore;

//   handleChange = () => {
//     this.$refs['func'].change()
//   }
//   render() {
//     return (
//       <div>
//         page5-1
//         <FunCom ref="func" />
//         <Button onClick={this.handleChange}>点击</Button>
//       </div>
//     )
//   }
// }

export default Page51