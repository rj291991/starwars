import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      email: '',
      password: '',
      isUsernameDisplay: 'none',
      isPasswordDisplay: 'none',
      errorMsgDisplay: 'none',
      userInfo: []
    };
  }


  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  handleLoginUsernameChange = (e) => {
    if (e.target.name === 'logiUsername' && e.target.value === '') {
      this.setState({ isUsernameDisplay: 'block' })
    } else if (e.target.name === 'logiUsername' && e.target.value.length > 0) {
      this.setState({ isUsernameDisplay: 'none' })
    }
  }

  handleLoginPwdChange = (e) => {
    console.log('handleLoginPwdChange');
    if (e.target.name === 'loginPassword' && e.target.value === '') {
      this.setState({ isPasswordDisplay: 'block' })
    } else if (e.target.name === 'loginPassword' && e.target.value.length > 0) {
      this.setState({ isPasswordDisplay: 'none' })
    }
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.setState({ isUsernameDisplay: 'block', isPasswordDisplay: 'block', errorMsg: 'block' })
    if (this.getLoginUsername.value && !this.getLoginPassword.value) {
      this.setState({ isUsernameDisplay: 'none', isPasswordDisplay: 'block' })
    } else if (!this.getLoginUsername.value && this.getLoginPassword.value) {
      this.setState({ isUsernameDisplay: 'block', isPasswordDisplay: 'none' })
    } else if (this.getLoginUsername.value && this.getLoginPassword.value) {
      this.setState({ isUsernameDisplay: 'none', isPasswordDisplay: 'none' })

      fetch(`http://localhost:3000/login.json`, {
        method: "GET",
      }).then(res => res.json())
        .then(response => {
          console.log('response', response);
          if (this.getLoginUsername.value === response.name && this.getLoginPassword.value === response.birth_year) {
            this.setState({ isLoggedIn: true, userInfo: response });
          } else {
            this.setState({ isLoggedIn: false, userInfo: [] });
          }

        })
    }
  }


  render() {
    const { isLoggedIn, email, password, isUsernameDisplay, isPasswordDisplay, errorMsgDisplay } = this.state;
    return (
      <div>
        {isLoggedIn ? <Redirect to="/listing" /> :
          <div id="page-wrapper" >
            <div className="container-fluid">
              <div className="row bg-title">
                <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                  <h4 className="page-title">Login</h4>
                </div>
              </div>

              <div className="row">
                <div className="col-md-8 col-xs-12">
                  <div className='errorMsg' style={{
                    display: (!isLoggedIn && isLoggedIn !== undefined) ? 'block' : errorMsgDisplay, color: '#ff0000',
                    fontWeight: 'bold'
                  }}> Invalid Credentials</div>
                  <div className='errorMsg' style={{
                    display: (isLoggedIn && isLoggedIn !== undefined) ? 'block' : errorMsgDisplay, color: '#ff0000',
                    fontWeight: 'bold'
                  }}>SuccessFully Loggedin</div>
                  <div className="white-box">
                    <form className="form-horizontal form-material"
                      onSubmit={this.handleLoginSubmit}>
                      <div className={'form-group'}>
                        <label className="col-md-12">Username</label>
                        <div className="col-md-12">
                          <input type="text" name='logiUsername' placeholder="Username"
                            ref={(input) => this.getLoginUsername = input}
                            onChange={this.handleLoginUsernameChange}
                            className="form-control form-control-line"
                            value={this.state.loginEmail}
                          />

                          <div className="help-block" style={{
                            color: (!email ? '#ff0000' : ''), display: isUsernameDisplay, color: '#ff0000',
                            fontWeight: 'bold'
                          }}>Username is required</div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="example-email" className="col-md-12">Password</label>
                        <div className="col-md-12">
                          <input type="password" name='loginPassword' placeholder="Password"
                            className="form-control form-control-line"
                            ref={(input) => this.getLoginPassword = input}
                            onChange={this.handleLoginPwdChange}
                            value={this.state.loginPassword}
                          />
                          <div className="help-block"
                            style={{
                              color: (!password ? '#ff0000' : ''), display: isPasswordDisplay, color: '#ff0000',
                              fontWeight: 'bold'
                            }}>Password is required</div>

                        </div>
                      </div>

                      <div className="form-group">
                        <div className="col-sm-12">
                          <button className="btn btn-success">Login</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div >}
      </div >
    );
  }
}



export default Login;