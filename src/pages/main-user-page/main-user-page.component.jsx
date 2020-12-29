import React from 'react';

import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

import './main-user-page.styles.scss';

class MainUserPage extends React.Component{
    
    constructor(props) {
        super(props);
    
        this.state = ({
            currentUser : null,
            categoryData : [],
            category : ''
        });
        
      }

       fetchRewards = async (currentUserId,category,elementid) => {
        const db = firebase.firestore();

        const citiesRef = db.collection(category);

        citiesRef.where("UserId", "==", currentUserId).onSnapshot(snapshot => {
            if (snapshot.size) {
              let categoryData = [];
              snapshot.forEach(doc =>
                categoryData.push({ ...doc.data(), uid: doc.id })
              );
              this.setState({
                categoryData: categoryData,
                category : elementid
              });
            }
        });
    
        
      };

      render() {
          const {categoryData,category} = this.state
        return (
            <div>
                {this.props.currentUser? (
                    <div className = 'mainDivCurrentUser'>
                        HELLO {this.props.currentUser.displayName} !!
                        <div className = 'categoryDiv'  onClick = {()=>this.fetchRewards(this.props.currentUser.id,'category 1','category1')}>
                            <div className = 'outerShell'>Category1
                                <button className = 'eachButton'>Claim</button>&nbsp;&nbsp;
                                <button className = 'eachButton'>Add to List of things I want</button>
                            </div>
                        <div id = 'category1'>
                        
                        {category === 'category1'?(categoryData.map((data, index) => (
                            <p key={index}>Hello, {data.Name} from {data.Price}!</p>
                        ))):(<p></p>)}
                        
                        </div>
                        </div>
                        <div className = 'categoryDiv' onClick = {()=>this.fetchRewards(this.props.currentUser.id,'category 2','category2')}>
                        <div className = 'outerShell'>Category2
                                <button className = 'eachButton'>Claim</button>&nbsp;&nbsp;
                                <button className = 'eachButton'>Add to List of things I want</button>
                            </div>
                        <div id = 'category2'>
                        {category === 'category2'?(categoryData.map((data, index) => (
                            <p key={index}>Hello, {data.Name} from {data.Price}!</p>
                        ))):(<p></p>)}
                        </div>
                        </div>
                        <div className = 'categoryDiv' onClick = {()=>this.fetchRewards(this.props.currentUser.id,'category 3','category3')}>
                        <div className = 'outerShell'>Category3
                            <button className = 'eachButton'>Claim</button>&nbsp;&nbsp;
                                <button className = 'eachButton'>Add to List of things I want</button></div>

                        <div id = 'category3'>
                        {category === 'category3'?(categoryData.map((data, index) => (
                            <p key={index}>Hello, {data.Name} from {data.Price}!</p>
                        ))):(<p></p>)}
                        </div>
                        </div>
                    </div>
                    ) : (
                    <div>Hello Guest</div>
                )}
             </div>
        );
      }
}

export default MainUserPage;