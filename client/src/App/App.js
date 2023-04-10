import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import AddItem from "./Pages/AddItem/AddItem";
import Profile from "./Pages/Profile/Profile";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import UserProfile from "./Pages/UserProfile/UserProfile";

import NavigationBar from "./Components/NavigationBar/NavigationBar";

import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import { useContext, useState } from "react";

import { AuthContext } from "./Context/AuthContext";

/**
 * Integrated hub to reroute user to appropriate page
 * @returns 
*/

const App = () => {
  // Track whether a user is logged in

  const { user } = useContext(AuthContext);
  
  // Pass around the search queries information across components

  const [searchQuery, setSearchQuery] = useState("");
  const [productId, setProductId] = useState(null);

  return (
    <Router>   
      {/* Have a navigation bar at the top of the page */}

      <NavigationBar />

      {/* Depending on the page, render a different component */}

      <Switch>
        <Route exact path="/">
          {user ? <ProductsPage searchQuery={searchQuery} setProductId={setProductId} setSearchQuery={setSearchQuery} /> : <Register />}
        </Route> */
       
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>

        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>

        <Route path="/add-product">
          {!user ? <Redirect to="/" /> : <AddItem />}
        </Route>

        <Route path="/profile">
          {!user ? <Redirect to="/" /> : <Profile setProductId={setProductId} />}
        </Route>

        <Route path="/products-page">
          {!user ? <Redirect to="/" /> : <ProductsPage searchQuery={searchQuery} setProductId={setProductId} setSearchQuery={setSearchQuery} />}
          </Route>
        
        <Route path="/product-page/:productIdentifier">
          {!user ? <Redirect to="/" /> : <ProductPage productId={productId} />}
        </Route>

        <Route path="/user-profile/:userIdentifier">
          {!user ? <Redirect to="/" /> : <UserProfile />}
        </Route>

        <Route path="/*" render={() => user ? <ProductsPage searchQuery={searchQuery} setProductId={setProductId} setSearchQuery={setSearchQuery} /> : <Register />}/>
      </Switch>
    </Router>
  );
};

export default App;