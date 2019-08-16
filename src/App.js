import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import ManagePosts from './components/ManagePosts';
import Header from './components/Header'
import Home from './components/Home'
import WaitingVerification from './components/WaitingVerification'
import Verified from './components/Verified'
import Register from './components/Register'
import Login from './components/Login'
import { keepLogin } from './action'

class App extends Component {
  componentDidMount() {
    var username =  localStorage.getItem('username')
    if(username) {
      this.props.keepLogin(username)
    }
  }
  render(){
    return(
      <div>
        <Header navBrand={'Instagrin'} />
        <div>
          <Route exact path ="/" component={Home} />
          <Route  path ="/managepost" component={ManagePosts} />
          <Route  path ="/register" component={Register} />
          <Route  path ="/waitingverification" component={WaitingVerification} />
          <Route  path ="/verified" component={Verified} />
          <Route  path ="/login" component={Login} />
          

        </div>

      </div>
    )
  }
}


export default connect(null,{keepLogin})(App)