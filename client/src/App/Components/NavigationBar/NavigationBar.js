// import the essential modules and components utilized in this component
import "./NavigationBar.css";

import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useContext, Fragment } from "react";
import { Search } from "@material-ui/icons";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { AuthContext } from "../../Context/AuthContext";
import { useState } from "react"
import { useHistory } from "react-router-dom";

// the navbar component which displays the navbar on every page of our web app

const NavigationBar = (props) => {
  const { user } = useContext(AuthContext);

  return (
    // react-bootstrap component utilized

    <Navbar collapseOnSelect bg="dark" expand="lg" className="header gradient-custom">
      <Container>
        <Navbar.Brand className="logo" href={"/"}><h1>uniBids</h1></Navbar.Brand>
        {user ?
          <Fragment>
          
            {/* <div className="topbarCenter">
              <div className="searchbar">
  
            {/* <Search className="searchIcon" />
                <input
                  placeholder="Search products"
                  className="searchInput"
                  onChange={handleChange}
                />
                            <button onClick={handleClickSearch}><Search className="searchIcon" /></button> */}

              {/* </div> */}
            {/* </div>  */}
            
            <div>
            
            {/* the links available on the navbar */}
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link key={0} href={"/profile"}>
                  <div className="navProfile"><AccountBoxIcon className="profileImg"/><br />Profile</div>
                  </Nav.Link>
                  
                <Nav.Link key={1} href={"/add-product"}>
              
                <div className="sellItemBtn" ><StorefrontIcon/> Sell Item</div>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            </div>
            </Fragment>
            :
          null
        } 
      </Container>
    </Navbar>
  );
}

export default NavigationBar;