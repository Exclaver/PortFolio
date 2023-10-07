import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import { HashLink } from "react-router-hash-link";
import { BrowserRouter as Router } from "react-router-dom";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="#home"
                className={
                  activeLink === "home" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("home")}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#skills"
                className={
                  activeLink === "skills" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("skills")}
              >
                Skills
              </Nav.Link>
              <Nav.Link
                href="#contact"
                className={
                  activeLink === "Contact"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("Contact")}
              >
                Contact
              </Nav.Link>

              <Nav.Link
                href="#projects"
                className={
                  activeLink === "projects"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("projects")}
              >
                Projects
              </Nav.Link>
            </Nav>
            <span className="navbar-text ms-right">
              <div className="social-icon">
                <a href="#">
                  <img src={navIcon1} alt="" />
                </a>
                <a href="#">
                  <img src={navIcon2} alt="" />
                </a>
                <a href="#">
                  <img src={navIcon3} alt="" />
                </a>
              </div>
              <HashLink to="#connect">
                <button className="vvd">
                  <span>Let’s Connect</span>
                </button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  );
};

// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { useEffect, useState } from "react";
// import logo from "../assets/img/logo.svg";
// import navIcon1 from "../assets/img/nav-icon1.svg";
// import navIcon2 from "../assets/img/nav-icon2.svg";
// import navIcon3 from "../assets/img/nav-icon3.svg";

// function BasicExample() {
//   const [activeLink, setActiveLink] = useState("home");
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => {
//       if (window.scrollY > 50) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };
//     window.addEventListener("scroll", onscroll);

//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const onUpdateActiveLink = (value) => {
//     setActiveLink(value);
//   };
//   return (
//     <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
//       <Container>
//         <Navbar.Brand href="#home">
//           <img src={logo} alt="Logo" />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav">
//           <span className="navbar-toggler-icon"></span>
//         </Navbar.Toggle>
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link
//               href="#home"
//               className={
//                 activeLink === "home" ? "active-navbar-link" : "navbar-link"
//               }
//               onClick={() => onUpdateActiveLink("#home")}
//             >
//               Home
//             </Nav.Link>
//             <Nav.Link
//               href="#skills"
//               className={
//                 activeLink === "skills" ? "active-navbar-link" : "navbar-link"
//               }
//               onClick={() => onUpdateActiveLink("#skills")}
//             >
//               Skills
//             </Nav.Link>
//             <Nav.Link
//               href="#projects"
//               className={
//                 activeLink === "projects" ? "active-navbar-link" : "navbar-link"
//               }
//               onClick={() => onUpdateActiveLink("projects")}
//             >
//               Projects
//             </Nav.Link>
//           </Nav>
//           <span className="navbar-text">
//             <div className="social-icon">
//               <a href="#">
//                 <img src={navIcon1} alt="" />
//               </a>
//               <a href="#">
//                 <img src={navIcon2} alt="" />
//               </a>
//               <a href="#">
//                 <img src={navIcon3} alt="" />
//               </a>
//             </div>
//             <button className="vvd" onClick={() => console.log("connect")}>
//               <span>Let's Connect</span>
//             </button>
//           </span>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default BasicExample;
