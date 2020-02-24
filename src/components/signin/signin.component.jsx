import React from "react";
import CustomButton from "../custom-button/custom-button.component"
import FormInput from "../form-input/form-input.component";
import {signInWithGoogle} from "../../firebase/firebase.utils"
import "./signin.styles.scss";

class SignIn extends React.Component{
    constructor(props){
        super(props)

        this.state={
            email:"",
            password:""
        }
    }
 handleSubmit = event => {
     event.preventDefault();

     this.setState({email: "" , password: ""});
 };
 handleChange = event => {
     const{name,value}=event.target;

     this.setState({[name]:value});

 };
    render(){
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign In with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput handleChange={this.handleChange} 
                           name="email" 
                           type="email" 
                           label="email"
                           value={this.state.email} 
                           required />
                    
                    <FormInput handleChange={this.handleChange} 
                           name="password" 
                           type="password" 
                           label="password"
                           value={this.state.password} 
                           required />
                    
                    <div className='buttons'>
                    <CustomButton type="submit"> sign in </CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn > sign in with google</CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }
}
export default SignIn;