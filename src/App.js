import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import MyClasses from './components/MyClasses/MyClasses';
import NotFound from './components/NotFound/NotFound';
import Developer from './components/Developer/Developer';
import SignUp from './components/SignUp/SignUp';
import { useState } from 'react';
import ConfirmSignUp from './components/ConfirmSignUp/ConfirmSignUp';
import Login from './components/Login/Login';

//Exporting UserDetailsContext
export const UserDetailsContext = createContext()

function App() {
  //Setting state for user here so that it can be used in Hone Component as well as Sign Up Component
  const [user, setUser] = useState({});
  return (
    <UserDetailsContext.Provider value={[user, setUser]}>
      <div className="App">
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/home">
              <Home></Home>
            </Route>
            <Route exact path="/services">
              <Services></Services>
            </Route>
            <Route exact path="/my-classes">
              <MyClasses></MyClasses>
            </Route>
            <Route exact path="/about">
              <About></About>
            </Route>
            <Route exact path="/developer">
              <Developer></Developer>
            </Route>
            <Route exact path="/sign-up">
              <SignUp></SignUp>
            </Route>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/confirm-sign-up">
              <ConfirmSignUp></ConfirmSignUp>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
          <Footer></Footer>
        </Router>
      </div>
    </UserDetailsContext.Provider>

  );
}

export default App;
