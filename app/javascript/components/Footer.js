import React from "react";
import images from './images';

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

class Footer extends React.Component {
  render () {
    if (this.props.mode == 'index' || this.props.mode == 'delete') {
      return (
        <footer>
          <div id="change-block-btn">
            <div id="change-block-btn-wrapper">
              <img id="change-blocks-bg" src={images.change_blocks_btn}/>
              <img id="three-blocks-btn" src={images.three_on_tree_btn}/>
              <img id="four-blocks-btn" src={images.four_on_four_btn}/>
            </div>
          </div>
        </footer>
      )
    } else {
      return (
        <footer>
        </footer>
      )
    }
  }
}

const structuredSelector = createStructuredSelector({
  mode: state => state.mode
});

export default connect(structuredSelector)(Footer);
