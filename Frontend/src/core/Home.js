import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { Link } from "react-router-dom";
import { getProducts } from "./helper/coreapicalls";
import { isAuthenticated } from "../auth/helper/index";
const{user}=isAuthenticated();
console.log(user);
export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    
    <Base>
    <center>
  <div id="demo" className="carousel slide" data-ride="carousel">
  <ul className="carousel-indicators">
    <li data-target="#demo" data-slide-to="0" className="active"></li>
    <li data-target="#demo" data-slide-to="1"></li>
    <li data-target="#demo" data-slide-to="2"></li>
  </ul>

  <div className="carousel-inner">
  
    <div className="carousel-item active">
      <img src="https://api.time.com/wp-content/uploads/2019/11/top-10-nonfiction-2019.jpg?quality=85&w=1200&h=628&crop=1" alt="New York" width="1100" height="500"/>
      <div className="carousel-caption alignment">
        <h3>Books</h3>
        <p>"Books are a uniquely portable magic.”</p>
      </div>   
    </div>
    <div className="carousel-item ">
      <img src="https://images.unsplash.com/photo-1447968954315-3f0c44f7313c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" alt="Chicago" width="1100" height="500"/>
      <div className="carousel-caption ">
        <h3>Books</h3>
        <p>“A room without books is like a body without a soul.”</p>
      </div>   
    </div>
    <div className="carousel-item ">
      <img src="https://www.careeranna.com/articles/wp-content/uploads/2019/06/Books-to-prepare-for-TISSNET-2020.jpg" alt="Los Angeles" width="1100" height="500"/>
      <div className="carousel-caption text-dark alignment">
        <h3>Books</h3>
        <p>“Outside of a dog, a book is a man's best friend".</p>
      </div>   
    </div>
    
    
  </div>
  <a className="carousel-control-prev" href="#demo" data-slide="prev">
    <span className="carousel-control-prev-icon"></span>
  </a>
  <a className="carousel-control-next" href="#demo" data-slide="next">
    <span className="carousel-control-next-icon"></span>
  </a>
</div>
</center>
      <div className="row text-center  cardbox">
        <h3 className="text-dark mt-5"><strong>All of the Books</strong></h3>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="mb-4 col-xs-5 col-sm-6 col-md-4">
              <Card product={product} />
              
              </div>
            );
          })}
        </div>
      </div>
     
     

    </Base>
    
  );
}
