import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import Paymentb from "./Paymentb";


const Payment = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);
  
    useEffect(() => {
      setProducts(loadCart());
    }, [reload]);
  
    const loadCheckout = () => {
      return (
        <div>
          <h2>This section for checkout</h2>
        </div>
      );
    };
    
  

  return (
    <Base > 
    <div>
    
   
         <div >
          <Paymentb products={products} setReload={setReload} />
        </div>
     
        </div>
    </Base>
  );
};

export default Payment;
