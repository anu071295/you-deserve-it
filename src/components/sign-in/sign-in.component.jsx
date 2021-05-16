import React from 'react';

import './sign-in.styles.scss';

import { Link } from 'react-router-dom';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import { FcGoogle } from "react-icons/fc";
import { RiCloseCircleFill } from 'react-icons/ri';


class SignIn extends React.Component {
  
  constructor(props) {
    super(props);


    
    this.state = ({
      email : '',
      password : '',
      errorMessage : '',
      errorLink : ''
    });

  }

  handleSubmit = () => {
    console.log('inside the handlesubmit method');
    const { email, password } = this.state;
    
    
    try {
      auth.signInWithEmailAndPassword(email, password).catch(error =>{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          this.setState({errorMessage : 'You need the right password dumb ass'});
        } else if(errorCode === 'auth/user-not-found'){
          this.setState({errorMessage : 'User does not exist. Please check email or create a new account' , errorLink : 'Sign Up'});
        }else{
          alert(errorMessage);
        }
        console.log(error);
      });
      this.setState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = async event => {
    const {value , name } = event.target;

    this.setState ({ [name]: value });
  };

  render() {
    const { email, password, errorMessage, errorLink } = this.state;
    return (
      <div className='sign-in'>
        <div className = 'signInContent'>
        
          <div className = 'mainHeader'>
          <div  className = 'closeIconDiv'><RiCloseCircleFill className = 'CloseIcon' size = {32} onClick = {() => this.props.signInClosePopup()}/></div>
            <p className = 'header'>I already have an account<br/>Sign In</p>
          </div>
        <div className = 'pageErrorMessage'>{errorMessage} <br/> <Link className = 'signUpinError' to = '/signup'>{errorLink}</Link></div>
        <div className='group'>
          <label className= 'form-input-label'>Email</label>
          <input type='email'
              name='email'
              onChange={this.handleChange}
              value={email}
              label='Email'
              required className='form-input' />
        </div>
        <div className='group'>
          <label className= 'form-input-label'>Password</label>
          <input type = 'password'
              name='password'
              onChange={this.handleChange}
              value={password}
              label='Password'
              required className='form-input'/>
        </div>
        <div className='pageAction'>
          <button className = 'pageActionButton' onClick = {()=>this.handleSubmit()}>Sign In</button>
           &nbsp;&nbsp;
          <button className = 'pageActionButton' onClick = {()=>signInWithGoogle()}>
            <div className = 'googleSignInbutton'>
              <div><FcGoogle size={32}/></div>
              <div className = 'googleSignInText'>Sign In With Google</div>
            </div>
          </button>
        </div>
        </div>
      </div>
    );
  }
}

export default SignIn;