import React from "react";

class Nav extends React.Component {
  render_root_page() {
    location.href = '/'
  }

  render () {
    return (
      <header>
        <div id="logo"
             data-link="./index.html"
             onClick={() => this.render_root_page()}>
          <strong>Notes</strong>
        </div>
        <nav>
          { this.props.children }
        </nav>
      </header>
    );
  }
}

export default Nav;
