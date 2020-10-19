import React, { useState  } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { addUserdetails} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";



const UpdateUser = () => {
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
              localStorage.setItem("jwt", JSON.stringify({ token, user: { _id, name:data.name, email:data.email, role,address:data.address,phone:data.phone } }));
             
            }
              setValues({
                ...values,
                name:"",
                email:"",
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
      return <h4 className="text-success">User updated successfully!</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to update the User</h4>;
    }
  };

  const myUserForm = () => (
    <form>
      <div className="form-group">
      <p className="lead">Enter your Name</p>
        <input
          type="text"
          className="form-control my-3"
          //onChange={handleChange}
          onChange={handleChange("name")}
          value={name}
          
          
          required
          
        />
        <p className="lead">Enter your Email</p>
        <input
          type="text"
          className="form-control my-3"
          //onChange={handleChange}
          onChange={handleChange("email")}
          value={email}
          
          
          required
          
        />
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
        
        
        <button onClick={onSubmit} className="btn btn-info ">
          Update User
        </button>
      </div>
    </form>
  );

  return (
    <Base
      className="container bg-info p-4"
    >
    <div>
    <div className="mb-2 text-light">
    <center> <h1 >Update your details here!</h1>
      </center>
      </div>
    {user.role===1&&<Link to="/admin/dashboard" className="btn btn-md btn-warning mb-3">
        Admin Home
      </Link>
    }
    {user.role===0&&<Link to="/user/dashboard" className="btn btn-md btn-warning mb-3">
        User Home
      </Link>
    }
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myUserForm()}
          
        </div>
      </div>
      </div>
    </Base>
  );
};

export default UpdateUser;
