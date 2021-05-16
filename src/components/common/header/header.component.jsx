import React from 'react';

import './header.styles.scss';

import { Link } from 'react-router-dom';

import  { auth } from '../../../firebase/firebase.utils';

class Header extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.currentUser);
        console.log(this.props.isSignInOpen);
    }
    render(){
        return(
            <div className = 'pageHeader'>
        
        
                <div className = 'signInSignUpLinks'>
                    {this.props.currentUser?(<div>
                        <Link className='link' to= '/homepage' onClick = {()=>auth.signOut()}>
                            SIGN OUT
                        </Link>
                    </div>):(<div className='signInLink'>
                        <button onClick = {() => this.props.signInOpenPopup()}>SIGN IN</button>
                    </div>)}
                    
                </div>
            </div>
        )
    }
}

export default Header;