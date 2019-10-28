import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Keyboard from './components/Keyboard';
import AudioPlayer from './components/AudioPlayer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AudioPlayer />
          <Keyboard />
        </div>
      </Provider>
    );
  }
}

export default App;
