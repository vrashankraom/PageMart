import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";


const { user, token } = isAuthenticated();
const AddCategory = () => {
    const [values, setValues] = useState({
      name: "",
      error: "",
      success: false
    });
  
    const { name, error, success } = values;
    const handleChange = name => event => {
      setValues({ ...values, error: false, [name]: event.target.value });
    };
  
    const onSubmit = event => {
      event.preventDefault();
      setValues({ ...values, error: false })
      createCategory(user._id, token,  {name} )
        .then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error, success: false });
          } else {
            setValues({
              ...values,
              name: "",
              error: "",
              success: true
            });
          }
       })
    };
  
  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create category</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          //onChange={handleChange}
          onChange={handleChange("name")}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-info">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
   
      className="container bg-info p-4"
    >
    <div className="mb-1 text-light">
    <center> <h1 >Add Categories here!</h1>
      </center>
      </div>
    <Link to="/admin/dashboard" className="btn btn-md btn-warning mb-3">
        Admin Home
      </Link>
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
