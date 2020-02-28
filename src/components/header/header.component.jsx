import React from "react";
import{ connect } from 'react-redux';
import "./header.styles.scss"
import {auth} from '../../firebase/firebase.utils';

import {Link} from "react-router-dom";
import {ReactComponent as Logo} from "../../assets/crown.svg";


const Header = ({currentUser})=>(
<div className="header">
<Link className="logo-container" to="/">
<Logo className="logo"/>
</Link>
<div className="options"> 
    <Link className="option" to="/shop">shop</Link>
    <Link className="option" to="/shop">contact</Link>
    {
      currentUser ?

     (<div className='option' onClick = {() => auth.signOut()}>Sign Out</div>) 
      :
     (<Link className='option' to='/signin'>SIGN IN</Link>)
     }
</div>
</div>)

const mapStateToProps = state =>({
 
  currentUser:state.user.currentUser
  
})
export default connect(mapStateToProps) (Header);