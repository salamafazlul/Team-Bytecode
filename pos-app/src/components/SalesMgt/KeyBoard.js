import React, {Component} from 'react';
import Keyboard from 'react-simple-keyboard';
import './KeyBoard.css';

class KeyBoard extends React.Component {
    onChange = (input) => {
        console.log("Input changed", input);
      }
    
      onKeyPress = (button) => {
        console.log("Button pressed", button);
      }
    
      render(){
        return (
          <Keyboard
            onChange={input =>
              this.onChange(input)}
            onKeyPress={button =>
              this.onKeyPress(button)}
          />
        );
      }
}
export default KeyBoard;