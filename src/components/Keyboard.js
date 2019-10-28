import React from 'react';
import '../css/Keyboard.css';
import keyboardProfile from '../config/keyboard.json';
import keyProfiles from '../config/keyprofiles.json';

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys_down: [],
      last_down: ''
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      // Check if key isnt being held down, then add to keys down list.
      // Update last key down variable to be used for visual keyboard effects.
      if (this.state.keys_down.indexOf(event.code) == -1) {
        this.setState({ keys_down: [...this.state.keys_down, event.code], last_down: event.code });
      }
    });
    document.addEventListener("keyup", (event) => {
      // Remove key from keys down list
      this.setState({ keys_down: [...this.state.keys_down.filter(key => key !== event.code)], last_down: event.code });
    });
  }

  renderRowOfKeys = (row) => {
    return (
      row.map(key => {
        let isDown = this.state.keys_down.indexOf(key.key) !== -1;
        let hasAudioProfile = keyProfiles.find(profile => profile.key == key.key) !== undefined;
        let classname = `key ${hasAudioProfile ? isDown ? 'key_down' : this.state.last_down == key.key ? 'key_last_down' : '' : 'disabled'}`
        return (
          <div className={classname} style={{
            flex: key.size,
            height: 50,
            borderRadius: 0
          }}>
            <span>{key.text}</span>
          </div>
        );
      })
    )
  }

  render() {
    return (
      <div className="keyboard">
        {keyboardProfile.rows.map(row => {
          return <div className="keyboard_row">{this.renderRowOfKeys(row)}</div>
        })}
      </div>
    );
  }
}

export default Keyboard;
