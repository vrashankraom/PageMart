import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import "../styles.css"
const UserDashBoard = () => {
  const {
    user: { name, email,phone,address, role ,_id}
  } = isAuthenticated();
 const {user} = isAuthenticated();
  const userTop = () =>{
    return(
      <div>
      
    <ul className="nav  bg-light  text-dark">
    <li className="nav-item">
      <Link to={`/user/${user._id}`} className="nav-link text"><button
        className="btn btn-sm btn-success  text"
      > 
        Update my details
        </button></Link>
      </li>
      <li className="nav-item">
      
      <Link to={`/user/order/my/${user._id}`} className="nav-link text"> <button
        className="btn btn-sm btn-success text"
      >
         My Orders
         </button></Link>
      </li>
      </ul>
      
      </div>
    );
  };
  const userLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
        <li className="list-group-item">
            <Link to={`/user/add/${user._id}`} className="nav-link text-success">
              Update my details
            </Link>
          </li>
         
          <li className="list-group-item">
            <Link to={`/user/order/my/${user._id}`} className="nav-link text-success">
              My Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userRightSide = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Address:</span> {address}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Phone:</span> {phone}
          </li>

          <li className="list-group-item">
            <span className="badge badge-danger">User Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
    
      className="container bg-success p-4 mt-1 box"
    >
    <div className="mb-3 text-light">
    <center> <h1 >Welcome to User area!</h1>
      </center>
      </div>
      <div className="row box">
        <div className="col-12 TopNav">{userTop()}</div>
        <div className="col-3 SideNav">{userLeftSide()}</div>
        <div className="col-9 MainNav">{userRightSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
