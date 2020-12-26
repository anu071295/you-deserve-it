import React from 'react';

import './sign-in.styles.scss';

import { Link } from 'react-router-dom';



import { auth, signInWithGoogle } from '../../firebase/firebase.utils';


class SignIn extends React.Component {
  
  constructor() {
    super();



    this.state = ({
      email : '',
      password : ''
    });

  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log('inside the handlesubmit method');
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
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
    const {email, password} = this.state;
    return (
      <div className='sign-in'>
        <h2 className = 'header'>I already have an account</h2>
        <h2 className = 'sideHeader'>Sign In</h2>
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
        <input type = 'password'
            name='password'
            onChange={this.handleChange}
            value={password}
            label='Password'
            required className='form-input'/>
          <label className= 'form-input-label'>Password</label>
        </div>
        <div className='pageAction'>
          <Link className='pageActionLink' to='/'>Cancel</Link>
          <button className = 'pageActionButton' type = 'submit' onClick = {this.handleSubmit}>Sign In</button> &nbsp;&nbsp;
          <button className = 'pageActionButton' onClick = {signInWithGoogle}>Sign In With Google</button>
        </div>
      </div>
    );
  }
}

export default SignIn;