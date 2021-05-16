import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import './App.scss';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/common/header/header.component';
import Footer from './components/common/footer/footer.component';
import MainUserPage from './pages/main-user-page/main-user-page.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isSignInOpen : false
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
          console.log('after fetch user ' + snapShot.id);
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  signInClosePopup = () => {
    this.setState({isSignInOpen : false});
  }

  signInOpenPopup = () => {
    this.setState({isSignInOpen : true});
  }

  render() {
    const {currentUser} = this.state;
    return (
      <div className = 'app'>
        <Header currentUser = {this.state.currentUser} isSignInOpen = {this.state.isSignInOpen} signInOpenPopup = {this.signInOpenPopup}/>
          <Switch>
            <Route exact path= '/'>
              {currentUser?<Redirect to="/mainuserPage" /> : <Redirect to="/homepage" />}
            </Route>
          </Switch>
          <Switch>
            <Route exact path= '/homepage'>
              {currentUser?<Redirect to="/mainuserPage" /> : <Redirect to="/homepage" />}
            </Route>
          </Switch>
          <Switch>
            <Route exact path= '/mainuserPage'>
              {currentUser?<Redirect to="/mainuserPage" /> : <Redirect to="/homepage" />}
            </Route>
          </Switch>
          <Switch>
            <Route exact path='/mainuserPage'  render={() => (<MainUserPage  currentUser = {this.state.currentUser} />)}/>
            <Route exact path='/homepage'  render={() => (<HomePage isSignInOpen = {this.state.isSignInOpen} signInClosePopup = {this.signInClosePopup}/>)}/>
          </Switch>
          <br/><br/>
          <Footer/>
    </div>
    );
  }
}

export default App;
