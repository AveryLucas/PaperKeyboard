import React from 'react';
import Tone from 'tone'
import keyProfiles from '../config/keyprofiles.json';

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.timelines = [];
    this.audioPlayers = {}
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
        // Check that audio profile exist
        let hasAudioProfile = keyProfiles.find(profile => profile.key == event.code);
        if (hasAudioProfile == undefined) return 0;
        if (hasAudioProfile.instrument == undefined) return 0;
        
        // Instrument Logic
        switch (hasAudioProfile.instrument.type) {
          case 'PLAYER':
            this.playerInstrumentLogic(hasAudioProfile.key, hasAudioProfile.instrument.options);
            break;
        }
      }
    });
    document.addEventListener("keyup", (event) => {
      // Remove key from keys down list
      this.setState({ keys_down: [...this.state.keys_down.filter(key => key !== event.code)], last_down: event.code });
    });
  }

  // TONEJS Player Instrument
  playerInstrumentLogic = (key, options) => {
    if (this.audioPlayers[key]) {
      this.audioPlayers[key].restart();
    } else {
      this.audioPlayers[key] = new Tone.Player({ url: options.audio, autostart: true }).toMaster();
      this.audioPlayers[key].volume.value = options.volume;
    }
  }

  render() {
    return (
      <div />
    );
  }
}

export default Keyboard;
