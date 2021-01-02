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

      resetState = () => {
        this.setState({
            categoryData: '',
            category : ''
          });
      }

      render() {
          const {categoryData,category} = this.state
        return (
            <div>
                {this.props.currentUser? (
                    <div className = 'mainDivCurrentUser'>
                        HELLO {this.props.currentUser.displayName} !!
                        <div className = 'categoryDiv'>
                            <div className = 'outerShell'>
                                <div className = 'titleDiv'> 
                                    Category 1
                                </div>
                            <div className = 'categoryButtons'>
                                    <button className = 'eachButton' onClick = {()=>this.fetchRewards(this.props.currentUser.id,'category 1','category1')}>I did it</button>&nbsp;&nbsp;
                                    <button className = 'eachButton'>Add to List of things I want</button>
                                    {category === 'category1'?(<button onClick = {()=>this.resetState()} className = 'closeLink'>close</button>):(<div></div>)}
                                </div>
                            </div>
                        <div id = 'category1'>
                        
                        {category === 'category1'?(categoryData.map((data, index) => (
                            <p key={index}>{index +1} {data.Name} - {data.Price} - {data.Shop} - <a href = {data.Link} >{data.Link}</a></p>
                        ))):(<p></p>)}
                        
                        </div>
                        </div>
                        <div className = 'categoryDiv'>
                        <div className = 'outerShell'>
                                <div className = 'titleDiv'> 
                                    Category 2
                                </div>
                            <div className = 'categoryButtons'>
                                <button className = 'eachButton' onClick = {()=>this.fetchRewards(this.props.currentUser.id,'category 2','category2')}>I did it</button>&nbsp;&nbsp;
                                <button className = 'eachButton'>Add to List of things I want</button>
                                {category === 'category2'?(<button onClick = {()=>this.resetState()} className = 'closeLink'>close</button>):(<div></div>)}
                            </div>
                            </div>
                        <div id = 'category2'>
                        {category === 'category2'?(categoryData.map((data, index) => (
                            <p key={index}>{index +1} {data.Name} - {data.Price} - {data.Shop} - <a href = {data.Link} >{data.Link}</a></p>
                        ))):(<p></p>)}
                        </div>
                        </div>
                        <div className = 'categoryDiv'>
                        <div className = 'outerShell'>
                                <div className = 'titleDiv'> 
                                    Category 3
                                </div>
                            <div className = 'categoryButtons'>
                                <button className = 'eachButton'  onClick = {()=>this.fetchRewards(this.props.currentUser.id,'category 3','category3')}>I did it</button>&nbsp;&nbsp;
                                <button className = 'eachButton'>Add to List of things I want</button>
                                {category === 'category3'?(<button onClick = {()=>this.resetState()} className = 'closeLink'>close</button>):(<div></div>)}
                            </div>
                        </div>
                        <div id = 'category3'>
                        {category === 'category3'?(categoryData.map((data, index) => (
                            <p key={index}>{index +1} {data.Name} - {data.Price} - {data.Shop} - <a href = {data.Link} >{data.Link}</a></p>
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