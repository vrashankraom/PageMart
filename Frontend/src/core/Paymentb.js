import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link, Redirect,useHistory} from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentbhelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import "../styles.css";
import DropIn from "braintree-web-drop-in-react";

const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
 
  let history = useHistory();
  const {user} =isAuthenticated();
  const [info, setInfo] = useState({
    loading: true,
    success: false,
    clientToken: null,
    error: "",
    redirect: false,
    instance: {}
  });
 const{error,loading,success} = info;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h3>Loading...</h3>
        </div>
      )
    );
  };
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-center">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            <h3>Payment Successfull! </h3>
            <h4>Items will be delivered soon :)</h4>
          </div>
        </div>
      </div>
    );
  };
  const getToken = (userId, token) => {
    getmeToken(userId, token).then(info => {
     console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
        return <Redirect to="#"/>
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };
  useEffect(() => {
    getToken(userId, token);
  }, []);
  
  const showbtdropIn = () => {
    return (
      <div>
      
        {info.clientToken !== null && products.length > 0 ? (
          <div>
          <Link className="btn btn-lg btn-success ml-1" to={`/cart/shipping/${user._id}`}>
              Go Back 
            </Link>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance => (info.instance = instance)}
            />
            <button className="btn btn-lg btn-warning ml-1" onClick={onPurchase}>
              Confirm and Pay
            </button>
          
          </div>
        ) : (
        <h3></h3>
        )}
      </div>
    );
  };
  
    
  
 

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    if(info.instance!==undefined){
    let getNonce = info.instance.requestPaymentMethod().then(data => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };
      processPayment(userId, token, paymentData)
        .then(response => {
          setInfo({ ...info, success: response.success,redirect:true, loading: false });
          console.log("PAYMENT SUCCESS");
         
          
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount
          };
          createOrder(userId, token, orderData);
          cartEmpty(() => {
            console.log("Did we got a crash?");
          });
          
          setReload(reload);
        })
        .catch(error => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    }).catch(error => {
      setInfo({ loading: false, success: false });
      console.log("PAYMENT FAILED");
      
    });
  }else{
    history.push(`/cart/shipping/${user._id}`);
  }
}

  const getAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    
    return amount;
  };

  return (
    <div>
    
      { getAmount() > 0 ?(
        <div className="mt-4 text-dark">
    <center> <h1 >Payment Page</h1>
      <h3>Add your card details here!</h3></center>
      <h3 className="text-dark">Your bill is {getAmount()} $</h3>
      </div>
       
      ):(
        <h3></h3>
      )}
      
      {showbtdropIn()} 
      {loadingMessage()}
      {successMessage()}
   
   
     </div>
  );
};

export default Paymentb;
