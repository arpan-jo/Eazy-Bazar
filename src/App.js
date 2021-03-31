import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import NoFound from './Components/NoFound/NoFound';
import Admin from './Components/Admin/Admin';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';
import CheckOut from './Components/CheckOut/CheckOut';

export const UserContext = createContext();

function App() {
   const [loggedInUser, setLoggedInUser] = useState();
   return (
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
         <Router>
            <Header />
            <Switch>
               <Route exact path="/">
                  <Home />
               </Route>
               <Route path="/home">
                  <Home />
               </Route>
               <PrivateRoute path="/admin">
                  <Admin />
               </PrivateRoute>
               <Route path="/login">
                  <Login />
               </Route>
               <PrivateRoute path="/product/:id">
                  <CheckOut />
               </PrivateRoute>
               <Route path="*">
                  <NoFound />
               </Route>
            </Switch>
         </Router>
      </UserContext.Provider>
   );
}

export default App;
