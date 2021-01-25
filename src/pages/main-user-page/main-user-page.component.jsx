import React from 'react';

import 'firebase/firestore';
import 'firebase/auth';

import './main-user-page.styles.scss';

import Category from '../../components/category/category.component';



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
            <div>
                <div className = 'sideMenu'>
                    YOU DERSERVE IT
                </div>
                {this.props.currentUser? (
                    <div className = 'mainDivCurrentUser'>
                        <Category currentUser = {this.props.currentUser}/>
                        </div>
                    ) : (
                    <div>Hello Guest</div>
                )}
             </div>
        );
      }
}

export default MainUserPage;