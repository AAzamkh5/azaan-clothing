import React from 'react';
import HomePage from "./pages/homepage/Homepage.component";
import {Route ,Switch} from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-sign-up.component";
import Header from "./components/header/header.component";
import { auth } from "./firebase/firebase.utils";
import './App.css';





class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser:null
    }
  }
  unsubcribeFromAuth= null;

  componentDidMount(){
    this.unsubcribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser:user})
      console.log(user);
    })
  }

componentWillUnmount(){
  this.unsubcribeFromAuth();

}
  render(){

    return (
      <div>
        <Header currentUser = {this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUp} />
          
        </Switch>
       
      </div>
    );
  }
 
}

export default App;
