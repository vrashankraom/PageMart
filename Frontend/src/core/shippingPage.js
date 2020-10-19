import React, { useState  } from "react";
import Base from "./Base";
import "../styles.css";
import { Link,Redirect } from "react-router-dom";
import { addUserdetails} from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper";



const UserShipping = () => {
    const { user, token } = isAuthenticated();
   
    const [values, setValues] = useState({
      _id:user._id,
      name:user.name,
      email:user.email,
      role:user.role,
      address: user.address,
      phone:user.phone,
      error: "",
      success: false
      
    });
    const {_id,name,email,role,address,phone,error, success } = values;

      const handleChange = obj => event => {
        console.log(event.target.value);
        setValues({ ...values, error: false, [obj]: event.target.value });
      };
  
    const onSubmit = event => {
      event.preventDefault();
      setValues({ ...values, error: false })
      addUserdetails(user._id, token,{_id,name,email,role,address,phone})
        .then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error, success: false });
          
          } else {
            console.log(data);
            if (typeof window !== "undefined") {
              localStorage.setItem("jwt", JSON.stringify({ token, user: { _id, name, email, role,address:data.address,phone:data.phone } }));
             
            }
              setValues({
                ...values,
                phone: "",
                address:"",
                error: "",
                success: true,
              });
  

          }
       })
    };
    

  const successMessage = () => {
    if (success) {
      return <Redirect to={`/cart/payment/${user._id}`}/> ;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to add the address</h4>;
    }
  };

  const myShippingForm = () => (
    <form>
      <div className="form-group">
     
        <p className="lead">Enter your Address</p>
        <input
          type="text"
          className="form-control my-3"
          //onChange={handleChange}
          onChange={handleChange("address")}
          value={address}
          
          
          required
          
        />
        <p className="lead">Enter your PhoneNumber</p>
        <input
          type="text"
          className="form-control my-3"
          //onChange={handleChange}
          onChange={handleChange("phone")}
          value={phone}
          
          required
          
        />
        
        <div className="btn-align">
        <button onClick={onSubmit} className="btn  btn-info ">
        
    Proceed to Payment
  
        </button>
        </div>
      </div>
    </form>
  );

  return (
    <Base
    
      className="container bg-info p-4 mt-1"
    >
    <div className="mt-3 text-dark mb-4">
    <center> <h1 >Add your shipping details here!</h1>
      </center>
      </div>
    {user.role===1&&<Link to="/cart" className="btn btn-md btn-warning mb-3">
        Admin Home
      </Link>
    }
  
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myShippingForm()}
          
        </div>
      </div>
    </Base>
  );
};

export default UserShipping;
