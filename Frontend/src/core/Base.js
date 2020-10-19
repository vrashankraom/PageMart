import React from "react";
import Menu from "./Menu";
import "../styles.css";
import { Link } from "react-router-dom";
const Base = ({
  className = "background text-white p-4",
  children
}) => (
  <div>
    <Menu />
    <div className="container">
     
      <div className={className} >{children}</div>
    </div>
    <footer className="footer mt-auto py-3">
      <div className="container bg-success text-white text-center ">
        <h5>If you got any questions, feel free to reach out!</h5>
        <a href="http://sahyadri.acm.org/assets/contactus.html"className="btn btn-warning btn-lg">Contact Us</a>
      </div>
      <div className="container">
        <span className="text-dark">
          Projects in association with <span className="text-primary"><a href="http://sahyadri.acm.org"><b>ACM-Sahyadri</b></a></span> 
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
