import React from 'react';

import { Link } from 'react-router-dom';

import './sign-up.styles.scss';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
    
    constructor() {
        super();
        
        this.state = {
          displayName: '',
          email: '',
          password: '',
          confirmPassword: ''
        };
      }
    
      handleSubmit = async event => {
        event.preventDefault();
        console.log('inside the handlesubmit method');
        const { displayName, email, password, confirmPassword } = this.state;
    
        if (password !== confirmPassword) {
          alert("passwords don't match");
          return;
        }
    
        try {
          const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
          );
          console.log('after create user with email and password');
        
          await createUserProfileDocument(user, { displayName });
          console.log('after create user profile document');
    
          this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
        } catch (error) {
          console.error(error);
        }
      };
    
      handleChange = event => {
        const { name, value } = event.target;
    
        this.setState({ [name]: value });
      };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
    <div className='sign-in'>
    <div className='pageHeader'>
        <h4 className = 'homepageHeader'>
            YOU DESERVE IT 
        </h4>
        <h2 className = 'header'>I'm new around here</h2>
        <h2 className = 'sideHeader'>Sign UP</h2>
    </div>
    <div className='rowGroup'>
    <div className='group'>
        <input type='email'
            name='email'
            onChange={this.handleChange}
            value={email}
            label='Email'
            required className='form-input' />
        <label className= 'form-input-label'>Email</label>
    </div>
    <div className='group'>
        <input type = 'text' 
            name = 'displayName' 
            onChange={this.handleChange} 
            value = {displayName}
            label='Display Name' 
            required className='form-input' />
        <label className= 'form-input-label'>Display Name</label>
    </div>
    </div>
    <div className='rowGroup'>
        <div className='group'>
            <input type = 'password'
            name='password'
            onChange={this.handleChange}
            value={password}
            label='Password'
            required className='form-input'/>
            <label className= 'form-input-label'>Password</label>
        </div>
        <div className='group'>
            <input type = 'password'
            name='confirmPassword'
            onChange={this.handleChange}
            value={confirmPassword}
            label='Confirm Password'
            required className='form-input'/>
            <label className= 'form-input-label'>Comfirm Password</label>
        </div>
    </div>
    <div className='pageAction'>
        <Link className='pageActionLink' to='/'>Cancel</Link>
        <button className = 'pageActionButton' type='submit' onClick = {this.handleSubmit}>Create Account</button>
        
    </div>
  </div>
    );
  }
}

export default SignUp;