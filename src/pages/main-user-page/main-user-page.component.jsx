import React from 'react';

import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

import './main-user-page.styles.scss';

class MainUserPage extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = ({
            currentUser : null
        });
        
        console.log(this.props.currentUser);
        console.log('What is going on??');
        
      }

      fetchRewards = (currentUserId) => {
        const db = firebase.firestore();
        const category1 = db.collection("cad").doc('3sm2FEkAwNCqknkWSCAa');
        db.collection("cad").doc("3sm2FEkAwNCqknkWSCAa").onSnapshot(function(doc) {
        console.log("Current data: ", doc.data());
        });

        // Create a reference to the cities collection
        var citiesRef = db.collection("category 1");

        // Create a query against the collection.
        var query = citiesRef.where("UserId", "==", currentUserId);
        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
        console.log('query ' + query.get().then);
        const currentUserJSId = currentUserId;
        console.log('currentUserJSId ' + currentUserJSId);
        console.log('category1 ' + category1.Name);
      };

      render() {
        return (
            <div>
                {this.props.currentUser? (
                    <div className = 'mainDivCurrentUser'>
                        HELLO {this.props.currentUser.displayName} !!
                        
                        <div className = 'categoryDiv'>Category1</div>
                    </div>
                    ) : (
                    <div>Hello Guest</div>
                )}
             </div>
        );
      }
}

export default MainUserPage;