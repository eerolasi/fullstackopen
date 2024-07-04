import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'

const Menu = ({ user, logout }) => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <Navbar bg="light" expand="lg">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/" exact>
          blogs
        </Nav.Link>
        <Nav.Link as={Link} to="/users" exact>
          users
        </Nav.Link>
      </Nav>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>{user} logged in</Navbar.Text>
        <Button variant="light" onClick={logout}>
          logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
