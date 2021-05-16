import React from 'react';

import 'firebase/firestore';
import 'firebase/auth';

import './main-user-page.styles.scss';




class MainUserPage extends React.Component{
    
    constructor(props) {
        super(props);
        
        this.state = ({
            currentUser : this.props.currentUser,
            categoryData : [],
            category : 'category1'
        });
      }

      
      resetState = () => {
        this.setState({
            categoryData: '',
            category : ''
          });
      }

      render() {
        return (
            <>
                <div className = 'pageHeaderText'>
                    <div className = 'mainTextOnMainPage'>
                        <p><b>
                            Welocome to Bliss-Bubble<br/>
                            {this.props.currentUser.displayName}
                        </b></p>
                    </div>
                    <div className = 'subTextOnMainPage'>
                        <p>You are amazing</p>
                    </div>
                </div>  
                
             </>
        );
      }
}

export default MainUserPage;