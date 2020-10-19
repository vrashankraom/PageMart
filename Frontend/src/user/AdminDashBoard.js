import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import "../styles.css"
const AdminDashBoard = () => {
  const {
    user: { name, email,phone,address, role ,_id}
  } = isAuthenticated();
 const {user} = isAuthenticated();
 console.log(user)
  const adminTop = () =>{
    return(
      <div>
      
    <ul className="nav  bg-light  text-dark">
    <li className="nav-item">
      <Link to={`/user/add/${user._id}`} className="nav-link text"><button
        className="btn btn-sm btn-success  text"
      > 
        Update my details
        </button></Link>
      </li>
      <li className="nav-item">
      <Link to="/admin/create/category" className="nav-link text"><button
        className="btn btn-sm btn-success  text"
      > 
        Create Categories
        </button></Link>
      </li>
      <li className="nav-item">
      <Link to="/admin/categories" className="nav-link text"><button
        className="btn btn-sm btn-success  text"
      > 
        Manage Categories
        </button></Link>
      </li>
      <li className="nav-item">
      <Link to="/admin/create/product" className="nav-link text"><button
        className="btn btn-sm btn-success  text"
      > 
        Create Product
        </button></Link>
      </li>
      <li className="nav-item">
      <Link to="/admin/products" className="nav-link text"> <button
        className="btn btn-sm btn-success  text"
      >
        Manage Product
        </button></Link>
      </li>
      <li className="nav-item">
      <Link to={`/admin/order/all/${user._id}`} className="nav-link text"> <button
        className="btn btn-sm btn-success text"
      >
         Check All Orders
         </button></Link>
      </li>
      </ul>
      
      </div>
    );
  };
  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
        <li className="list-group-item">
            <Link to={`/user/add/${user._id}`} className="nav-link text-success">
              Update my details
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to={`/admin/order/all/${user._id}`} className="nav-link text-success">
              Check All Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Information</h4>
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
            <span className="badge badge-danger">Admin Area</span>
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
    <center> <h1 >Welcome to admin area!</h1>
      </center>
      </div>
      <div className="row box">
        <div className="col-12 TopNav">{adminTop()}</div>
        <div className="col-3 SideNav">{adminLeftSide()}</div>
        <div className="col-9 MainNav">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
