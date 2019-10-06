import React from "react";
import images from './images';

const Footer = () => (
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

export default Footer;
