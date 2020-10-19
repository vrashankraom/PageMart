
import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect,Link } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";

const Card = ({ product, addtoCart = true, removeFromCart = false,reload =undefined,setReload=f=>f }) => {
  const [redirect, setRedirect] = useState(false);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescription = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";
  const cartCategory = product ? product.category.name : "Reading Book";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = addtoCart => {
    return (
      (isAuthenticated()===false || isAuthenticated().user.role === 0) && addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-md btn-info mb-3"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <button onClick={() => {removeItemFromCart(product._id);
          setReload(!reload);}} className="btn btn-sm btn-info mb-3">Remove from Cart</button>
       
      )
    );
  };
  console.log(cartCategory);
  return (
<div className=" product-card text-white">
	
		<div className="product-tumb">
    <ImageHelper product={product} />
		</div>
		<div className="product-details">
    {getARedirect(redirect)}
    <span className="product-category">{cartCategory}</span>
			<b><h3 className="text-dark">{cartTitle}</h3></b>
			<p className="text-dark">{cartDescription}</p>
			<div className="product-bottom-details">
				<div className="product-price mt-2"><small>${cartPrice+5}</small>${cartPrice}</div>
        
          <div>{showAddToCart(addtoCart)}</div>
          <div>{showRemoveFromCart(removeFromCart)}</div>
        
			</div>
		</div>
	</div>



  );
};

export default Card;
