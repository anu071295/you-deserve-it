import React from 'react';

import './sign-up.styles.scss';

import { auth, createUserProfileDocument } from '../../../firebase/firebase.utils';

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
    <div className='sign-up'>
    <div className='mainHeader'>
        <p className = 'header'>I'm new around here <br/>Sign Up</p>
    </div>
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
    <label className= 'form-input-label'>Display Name</label>
        <input type = 'text' 
            name = 'displayName' 
            onChange={this.handleChange} 
            value = {displayName}
            label='Display Name' 
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
        <div className='group'>
        <label className= 'form-input-label'>Comfirm Password</label>
            <input type = 'password'
            name='confirmPassword'
            onChange={this.handleChange}
            value={confirmPassword}
            label='Confirm Password'
            required className='form-input'/>
        </div>
    <div className='pageAction'>
        <button className = 'pageActionButton' type='submit' onClick = {this.handleSubmit}>Create Account</button>
        
    </div>
  </div>
    );
  }
}

export default SignUp;