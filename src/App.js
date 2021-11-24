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
import Login from './components/Login/Login';
import CourseDetails from './components/CourseDetails/CourseDetails'
import ContextProvider from './context/ContextProvider';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import PrivateBuyCourse from './components/PrivateRoute/PrivateBuyCourse';
import PrivateForm from './components/PrivateRoute/PrivateForm';
import OrderReview from './components/OrderReview/OrderReview';
import Payment from './components/Payment/Payment';
import OrderConfirmed from './components/OrderConfirmed/OrderConfirmed';
import AddReview from './components/AddReview/AddReview';



function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Router>
          <ScrollToTop>
            <Header></Header>
            <Switch>
              <Route exact path="/home">
                <Home></Home>
              </Route>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route exact path="/courses">
                <Courses></Courses>
              </Route>
              <Route exact path="/course/:id">
                <CourseDetails></CourseDetails>
              </Route>
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
              <Route path="/review">
                <OrderReview ></OrderReview>
              </Route>
              <PrivateBuyCourse path="/payment">
                <Payment ></Payment>
              </PrivateBuyCourse>
              <PrivateBuyCourse path="/order-confirmed">
                <OrderConfirmed></OrderConfirmed>
              </PrivateBuyCourse>
              <Route exact path="/add-review">
                <AddReview></AddReview>
              </Route>
              <Route path="*">
                <NotFound></NotFound>
              </Route>
            </Switch>
            <Footer></Footer>
          </ScrollToTop>
        </Router>
      </ContextProvider>
    </div>

  );
}

export default App;
