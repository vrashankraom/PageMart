import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "lightblue" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="navbar  bg-dark navbar-dark">
    <div className="ml-3"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSZwCJ4LEzsx2TFUjrU_PlJaqeF0z1nQg2KLw&usqp=CAU" alt="logo" style={{width:"50px"}}/></div>
    <span className="text-white mr-auto ml-2 mt-2 logo"><h4>PageMart</h4></span>
   
      <li className="nav-item  mr-2">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
          Home
        </Link>
      </li>
      {(isAuthenticated()===false || isAuthenticated().user.role === 0)  && (
      <li className="nav-item  mr-2">
        <Link
          style={currentTab(history, "/cart")}
          className="nav-link"
          to="/cart"
        >
          Cart
        </Link>
      </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item  mr-2">
          <Link
            style={currentTab(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            U. Dashboard
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item  mr-2">
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            A. Dashboard
          </Link>
        </li>
      )}
      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item  mr-2">
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link"
              to="/signup"
            >
              Signup
            </Link>
          </li>
          <li className="nav-item  mr-2">
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link"
              to="/signin"
            >
              Sign In
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <li className="nav-item  mr-2">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
      

    </ul>
  </div>
);

export default withRouter(Menu);
