import React, { Component, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button, NavDropdown } from "react-bootstrap";

import routes from "routes.js";
import SuperAdminContext from "context/admin/adminContext";
import { useHistory } from "react-router-dom";

function Header() {
  const context = useContext(SuperAdminContext)
  const { getUser, loggedInUser } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser();
    }
  }, [])
  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const history = useHistory()
  const handleLogOut = () => {
    localStorage.clear()
    history.push('/login')
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>


        </div>
      </Container>
      <NavDropdown title={loggedInUser?.name} className="ml-auto">
        <NavDropdown.Item>My Account </NavDropdown.Item>
        <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
      </NavDropdown>
    </Navbar>
  );
}

export default Header;
