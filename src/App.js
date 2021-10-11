import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Courses from './components/Courses/Courses';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import MyClasses from './components/MyClasses/MyClasses';
import NotFound from './components/NotFound/NotFound';
import Developer from './components/Developer/Developer';
import SignUp from './components/SignUp/SignUp';
import ConfirmSignUp from './components/ConfirmSignUp/ConfirmSignUp';
import Login from './components/Login/Login';
import CourseDetails from './components/CourseDetails/CourseDetails'
import AuthProvider from './context/AuthProvider';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import BuyCourse from './components/BuyCourse/BuyCourse';
import PrivateBuyCourse from './components/PrivateRoute/PrivateBuyCourse';
import PrivateForm from './components/PrivateRoute/PrivateForm';



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <ScrollToTop>
            <Header></Header>
            <Switch>
              <Route exact path="/home">
                <Home></Home>
              </Route>
              <Route exact path="/courses">
                <Courses></Courses>
              </Route>
              <Route exact path="/course/:courseID">
                <CourseDetails></CourseDetails>
              </Route>
              <PrivateBuyCourse exact path="/course/:courseID/buy-course">
                <BuyCourse></BuyCourse>
              </PrivateBuyCourse>
              <PrivateBuyCourse exact path="/my-classes">
                <MyClasses></MyClasses>
              </PrivateBuyCourse>
              <Route exact path="/about">
                <About></About>
              </Route>
              <Route exact path="/developer">
                <Developer></Developer>
              </Route>
              <PrivateForm exact path="/sign-up">
                <SignUp></SignUp>
              </PrivateForm>
              <PrivateForm exact path="/login">
                <Login></Login>
              </PrivateForm>
              <Route exact path="/confirm-sign-up">
                <ConfirmSignUp></ConfirmSignUp>
              </Route>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route path="*">
                <NotFound></NotFound>
              </Route>
            </Switch>
            <Footer></Footer>
          </ScrollToTop>
        </Router>
      </AuthProvider>
    </div>

  );
}

export default App;
