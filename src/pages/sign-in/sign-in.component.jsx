import React from 'react';

import './sign-in.styles.scss';

import { Link } from 'react-router-dom';



import { auth, signInWithGoogle } from '../../firebase/firebase.utils';


class SignIn extends React.Component {
  
  constructor(props) {
    super(props);

    console.log('props ');

    this.state = {
      currentUser : this.props.currentUser
    };

  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className='sign-in'>
        <h4 className = 'homepageHeader'>
            YOU DESERVE IT
        </h4>
        <h2 className = 'header'>I already have an account</h2>
        <h2 className = 'sideHeader'>Sign In</h2>
        <div className='group'>
          <input className='form-input' />
          <label className= 'form-input-label'>Email</label>
        </div>
        <div className='group'>
          <input type = 'password' className='form-input'/>
          <label className= 'form-input-label'>Password</label>
        </div>
        <div className='pageAction'>
          <Link className='pageActionLink' to='/'>Cancel</Link>
          {currentUser ? (<button className = 'pageActionButton' onClick={() => auth.signOut()}>SIGN OUT</button>):(
          <button className = 'pageActionButton'>Sign In</button>)} &nbsp;&nbsp;
          <button className = 'pageActionButton' onClick = {signInWithGoogle}>Sign In With Google</button>
        </div>
      </div>
    );
  }
}

export default SignIn;