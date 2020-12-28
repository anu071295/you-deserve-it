import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import './App.scss';
import HomePage from './pages/homepage/homepage.component';
import SignIn from './pages/sign-in/sign-in.component';
import SignUp from './pages/sign-up/sign-up.component';
import Footer from './components/footer/footer.component';
import Header from './components/header/header.component';
import MainUserPage from './pages/main-user-page/main-user-page.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
      NameofPerson: 'Anu'
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
          console.log('after fetch user');
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const {currentUser} = this.state;
    return (
      <div className = 'app'>
        <Header currentUser = {this.state.currentUser}/>
          <Switch>
            <Route exact path= '/'>
              {currentUser?<Redirect to="/mainuserPage" /> :  <HomePage/>}
            </Route>
            <Route exact path= '/signin'>
              {currentUser?<Redirect to="/mainuserPage" /> :  <SignIn/>}
            </Route>
            <Route exact path= '/signup'>
              {currentUser?<Redirect to="/mainuserPage" /> :  <SignUp/>}
            </Route>
            <Route exact path='/mainuserPage'  render={() => (<MainUserPage  currentUser = {this.state.currentUser} NameofPerson = {this.state.NameofPerson}/>)}/>
          </Switch>
        <Footer/>
    </div>
    );
  }
}

export default App;
