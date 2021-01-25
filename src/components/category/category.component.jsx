import React from 'react';

import './category.styles.scss';

import firebase from 'firebase/app';
import RewardsTable from '../rewards-table/rewards-table.component.jsx';
import 'firebase/firestore';
import 'firebase/auth';

import { FiPlusCircle } from "react-icons/fi";

class Category extends React.Component{
    constructor(props){
        super(props);
        this.state = ({
            currentUser : null,
            categoryData : [],
            filteredCategoryData : [],
            categoryName : [],
            isOpen : false
        });
        this.fetchData = this.fetchData.bind(this); 
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentUser.id !== prevProps.currentUser.id) {
          this.fetchData();
        }
    }

    colsePopUp = () => {
        this.setState({isOpen : false});
    }

    fetchData = () => {
        console.log('Current User in fetchData' + this.props.currentUser.id);
        const db = firebase.firestore();

        const citiesRef = db.collection('Rewards');

        citiesRef.where("UserId", "==", this.props.currentUser.id).onSnapshot(snapshot => {
            if (snapshot.size) {
              let categoryData = [];
              let categoryName = [];
              snapshot.forEach(doc =>
                categoryData.push({ ...doc.data(), uid: doc.id })
              );
              for(const [index, value] of categoryData.entries()){
                if(false){
                    console.log(index);
                }
                if(!categoryName.includes(value.Category)){
                    categoryName.push(value.Category);
                }
              }
              this.setState({
                currentUser : this.props.currentUser,
                categoryData: categoryData,
                categoryName: categoryName
              });
            }
        });
    }

    fetchRewards = (categoryName,categoryData) =>{
        let filteredCategoryData = [];
        for(const [index, value] of categoryData.entries()){
            if(value.Category === categoryName){
                filteredCategoryData.push(value);
                this.setState({
                    isOpen:true
                })
            }
            if(false){
                console.log(index);
            }
        }
        this.setState({filteredCategoryData : filteredCategoryData});
    };


    render(){
        const {categoryName,categoryData} = this.state;
        return(
            <div>
                
                {categoryName.map((data,index) => (
                <div key = {index} className='mainDivCurrentUser'>
                    <div className = 'categoryDiv'>
                        <div className = 'outerShell'>
                            <div className = 'titleDiv'> 
                                {data} 
                                <button className = 'eachButton' onClick = {()=>this.fetchRewards(data,categoryData)}>I did it</button>&nbsp;&nbsp;
                            </div>
                        </div>
                    </div>
                </div>
                
            ))}
            <RewardsTable isOpen = {this.state.isOpen} filteredCategoryData = {this.state.filteredCategoryData} colsePopUp = {this.colsePopUp}/>
            </div>
        )
    }
}

export default Category;