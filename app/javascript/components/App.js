import React from 'react'

import Nav from './components/Nav';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showNote: false
    };
  }

  toggleNote = () => {
    this.setState({
      showNote: !this.state.showNote,
      note: {}
    })
  }

  render() {
    return (
      <React.Fragment>
        <Nav toggleNote={this.toggleNote} showNote={showNote} />
      </React.Fragment>
    )
  }
}

export default App
