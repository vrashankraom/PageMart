import React, { useState,useEffect  } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { updateCategory,getCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";



const UpdateCategory = ({ match }) => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
      name: "",
      error: "",
      success: false
      
    });
    const { name, error, success } = values;

    const preload = categoryId => {
        getCategory(categoryId).then(data => {
          console.log(data);
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              name: data.name
            });
          }
        });
      };
  
      useEffect(() => {
        preload(match.params.categoryId);
      }, []);

      const handleChange = name => event => {
        //console.log(event.target.value);
        setValues({ ...values, error: false, [name]: event.target.value });
      };
  
    const onSubmit = event => {
      event.preventDefault();
      setValues({ ...values, error: false })
      updateCategory(match.params.categoryId, user._id, token,{name})
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
          
          required
          
        />
        <button onClick={onSubmit} className="btn btn-info">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      className="container bg-info p-4"
    >
    <div className="mb-1 text-light">
    <center> <h1 >Update the Categories here!</h1>
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
      <Link to="/admin/categories" className="btn btn-md btn-warning mt-3">
        Back to categories
      </Link>
    </Base>
  );
};

export default UpdateCategory;
