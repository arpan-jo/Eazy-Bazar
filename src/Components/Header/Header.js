import React, { useContext } from 'react';
import './Header.css';
import { Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopify } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
   const [loggedInUser, setLoggedInUser] = useContext(UserContext);
   return (
      <>
         <Navbar
            className="px-3 rounded"
            sticky="top"
            collapseOnSelect
            expand="lg"
            bg="secondary"
            variant="dark"
         >
            <Navbar.Brand as={Link} to="/home">
               <h3 className="logo">
                  Eazy-Bazar <FontAwesomeIcon icon={faShopify} />
               </h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
               <Nav className="mr-auto"></Nav>
               <Form inline>
                  <FormControl
                     type="text"
                     placeholder="Search items (e.g. egg, milk)"
                     className="mr-sm-2"
                  />
               </Form>
               <Nav>
                  <Nav.Link as={Link} to="/">
                     Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/order">
                     Order
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admin">
                     Admin
                  </Nav.Link>
                  {loggedInUser ? (
                     <Nav.Link as={Link} to="/login">
                        {loggedInUser.displayName}
                     </Nav.Link>
                  ) : (
                     <Nav.Link as={Link} to="/login">
                        Login
                     </Nav.Link>
                  )}
               </Nav>
            </Navbar.Collapse>
         </Navbar>
      </>
   );
};

export default Header;
