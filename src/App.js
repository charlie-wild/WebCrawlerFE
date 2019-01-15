import React, { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';

class App extends Component {
  render() {
    return (
      <div>
        <Search />
        <Results />
      </div>
    );
  }
}

export default App;