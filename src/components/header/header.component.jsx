import React from 'react';

import './header.styles.scss';

import { Link } from 'react-router-dom';

import  { auth } from '../../firebase/firebase.utils';

const Header = ({currentUser}) =>(
    <div className = 'pageHeader'>
        
        
        <div className = 'signInSignUpLinks'>
            {currentUser?(<div>
                <Link className='link' to= '/' onClick = {()=>auth.signOut()}>
                    SIGN OUT
                </Link>
            </div>):(<div>
                <Link className='link' to='/signin'>
                    SIGN IN
                </Link>
                <Link className='link' to='/signup'>
                    SIGN UP
                </Link>
            </div>)}
            
        </div>
    </div>
);

export default Header;