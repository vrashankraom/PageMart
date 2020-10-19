import React, { useState, useEffect } from "react";
import "../styles.css"

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct} from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  let count=0;
  products.map((product)=>{
    if(product !== "undefined"){
        count=count+1;
    }
  });
  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts().then(data => {

      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    
    });
  };

  useEffect(() => {
    preload();
  }, []);
  

  const deleteThisProduct = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
        count=count-1;
      }
    });
  };

  return (
    <Base  className="container bg-info p-4">
    
      <Link className="btn btn-warning" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="text-center text-white my-3">Total {count} products</h2>
      <div className="container p-4 box2">
        <div className="col-12">

          {products.map((product, index) => {
            return (
              
              <div key={index} className="row text-center mb-2 ">
              
                <div className="col-sm-4">
                
                  <h3 className="text-white text-left">{product.name}</h3>
                 
                  </div>
                  
                <div className="col-sm-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                    
                  </Link>
                 
                </div>
                <div className="col-sm-4">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
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

export default ManageProducts;
