import React from "react";
import toaster from 'toasted-notes';
import cookie from 'react-cookies'

class Nav extends React.Component {
  render_root_page() {
    location.href = '/'
  }

  redirect_to_sign_in() {
    location.href = '/login'
  }

  async logoutRequest() {
    const response = await fetch('/logout_api', {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer' // no-referrer, *client
    });
    let notify_message;
    if(response.status != 204) {
      console.log(response)
      notify_message = "Ошибка!";
    } else {
      this.redirect_to_sign_in();
      notify_message = "Вы успешно вышли!";
    }
    toaster.notify(notify_message, { duration: 2000, position: 'top-right' });
  }

  log_out() {
    if(confirm('Are you sure?')){
      this.logoutRequest().catch(error => console.log(error));
    }
  }

  render () {
    let sign_out_btn = '';
    const auth_header = cookie.load('Authorization');
    if(auth_header && auth_header.length > 0) {
      sign_out_btn =
        <button onClick={() => this.log_out()}>
          <i className="fa fa-sign-out"></i>
          log out
        </button>
    }
    return (
      <header>
        <div id="logo"
             data-link="./index.html"
             onClick={() => this.render_root_page()}>
          <strong>Notes</strong>
        </div>
        <nav>
          { this.props.children }
          { sign_out_btn }
        </nav>
      </header>
    );
  }
}

export default Nav;
