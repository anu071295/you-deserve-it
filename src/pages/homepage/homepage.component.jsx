import React from 'react';

import graphicDesign from './Graphicdesignfrontpage1.PNG';
import './homepage.styles.scss';
import SignUp from '../../components/sign-up/sign-up.component';
import SignIn from '../../components/sign-in/sign-in.component';

class HomePage extends React.Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return(
            <>
                <div className='homepage'>
                    <img className = 'graphicDesign' src={graphicDesign} />
                    <div className='homepageText'>
                        <p>Trying to improve productivity?<br/>
                        Think we can help,<br/>
                        You can also read our blog to learn more avout the app.<br/>
                        Try Signing Up</p>
                        <div className='pageAction'>
                            <button className = 'pageActionButton'>What? I don't get it</button>
                        </div>
                    </div>
                    <div className = 'signUp'>
                            <SignUp/>
                    </div>
                </div>
                
                {this.props.isSignInOpen?(<div className = 'signIn'>
                    <SignIn isSignInOpen = {this.props.isSignInOpen} signInClosePopup = {this.props.signInClosePopup}/>
                </div>):(
                    <></>
                )}
            </>
        )
    }
}

export default HomePage;