import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import Paymentb from "./Paymentb";
import { isAuthenticated } from "../auth/helper/";



const Cart = () => {

 const {user} = isAuthenticated();
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);
  
    useEffect(() => {
      setProducts(loadCart());
    }, [reload]);
  
    
    const loadAllProducts = products => {
      return (
        
        <div className="  text-dark  cardbox">
       
         <div className="mt-3 text-dark  mb-4">
    <center> <h1 >Products in your cart!</h1>
      </center>
      <Link to="/" className="btn btn-info ">Home</Link>
      </div>
          <div className="row text-center">
          {products.map((product, index) => (
            <div className="mb-4 col-xs-6 col-sm-6 col-md-4">
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
            </div>
          ))}
        </div>
        </div>
      );
    };
  

  return (
    <Base> 
    <div>
    
    {products.length > 0 ? (
      
            loadAllProducts(products)
            
          ) : (
            <div><center><h1 className="text-dark">No products in cart :(</h1></center> 
            <center><Link to="/" className="btn btn-info ">Home</Link>
</center></div>
    
          )
    }
   
      {products.length > 0 &&user!==undefined ? (
      
        <center>

<Link to={`/cart/shipping/${user._id}`} className="btn btn-lg btn-warning mb-3">
    Proceed to add an address
  </Link></center>
      
    ) : (
      <div></div>
    )
}
{user!==undefined ||products.length === 0? (
      
  <div></div>
    
  ) : (
    <center>

<Link to={`/signup`} className="btn btn-lg btn-warning mb-3">
  Create a new account?
</Link></center>
  )
}
   
     
        </div>
    </Base>
  );
};

export default Cart;
