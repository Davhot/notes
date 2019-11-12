import React from "react";
import images from './images';

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

class Footer extends React.Component {
  render () {
    return (
      <footer>
      </footer>
    )
  }
}

const structuredSelector = createStructuredSelector({
  mode: state => state.mode
});

export default connect(structuredSelector)(Footer);
