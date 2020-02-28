import React from 'react';
import { connect } from 'react-redux';

import './App.css';

import HomePage from "./pages/homepage/Homepage.component";
import {Route ,Switch ,Redirect} from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-sign-up.component";
import Header from "./components/header/header.component";
import { auth , createUserProfileDocument} from "./firebase/firebase.utils";
import {setCurrentUser} from './redux/user/user.action';






class App extends React.Component {

  unsubcribeFromAuth= null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubcribeFromAuth =  auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {

         setCurrentUser({
              id:snapShot.id,
              ...snapShot.data()
            });
        });
      }
      setCurrentUser(userAuth);
      
    });
  }

componentWillUnmount(){
  this.unsubcribeFromAuth();

}
  render(){

    return (
      <div>
        <Header  />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={()=> this.props.currentUser? (<Redirect to='/' /> ) : (<SignInAndSignUp />)} />
          
        </Switch>
       
      </div>
    );
  }
 
}

const mapStateToProps=({user})=>({
  currentUser:user.currentUser
});
const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))

});
export default connect(mapStateToProps,mapDispatchToProps)(App);
