import React, { useState, useEffect } from "react";
import "../styles.css"

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getCategories,deleteCategory} from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  let count=0;
  categories.map((category)=>{
    if(category !== "undefined"){
        count=count+1;
    }
  });
  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    
    });
  };

  useEffect(() => {
    preload();
  }, []);
  

  const deleteThisProduct = categoryId => {
    deleteCategory(categoryId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
        count=count-1;
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage products here" className="container bg-info p-4">
      
      <Link className="btn btn-warning" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="text-center text-white my-3">Total {count} Categories</h2>
      <div className="container p-4 box2">
        <div className="col-12">

          {categories.map((category, index) => {
            return (
              
              <div key={index} className="row text-center mb-2 ">
              
                <div className="col-sm-4">
                
                  <h3 className="text-white text-left">{category.name}</h3>
                 
                  </div>
                  
                <div className="col-sm-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                    
                  </Link>
                 
                </div>
                <div className="col-sm-4">
                  <button
                    onClick={() => {
                      deleteThisProduct(category._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  
                </div>
              
               
              </div>
            );
            
          })}
          
        </div>
        
      </div>
      
    </Base>
    
  );
};

export default ManageCategories;
