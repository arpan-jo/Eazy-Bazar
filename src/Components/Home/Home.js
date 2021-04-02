import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopify } from '@fortawesome/free-brands-svg-icons';
import Products from '../Products/Products';
import './Home.css';

const Home = () => {
   const [products, setPorducts] = useState([]);

   useEffect(() => {
      fetch('https://fast-badlands-83194.herokuapp.com/products')
         .then(res => res.json())
         .then(data => {
            setPorducts(data);
         });
   }, []);

   return (
      <div>
         <div className="bg-warning px-5 py-3 m-5 rounded carousel">
            <h1 className="text-center">
               Eazy-Bazar <FontAwesomeIcon icon={faShopify} />
            </h1>
            <Carousel>
               {products.map(product => (
                  <Carousel.Item>
                     <div className="d-sm-flex justify-content-evenly align-items-center carousel-items">
                        <div>
                           <img
                              className="carousel-image"
                              src={product.imageURL}
                              alt="Second slide"
                           />
                        </div>
                        <div>
                           <h5>{product.name}</h5>
                           <h3>20% Discount</h3>
                        </div>
                     </div>
                  </Carousel.Item>
               ))}{' '}
               {products.length > 0 ? (
                  <div className="d-flex justify-content-center">
                     <div className="spinner-border d-none" role="status"></div>
                  </div>
               ) : (
                  <div className="d-flex justify-content-center">
                     <div className="spinner-border " role="status"></div>
                  </div>
               )}
            </Carousel>
         </div>
         <div className="container mb-5 mt-2">
            <h3 className="text-center">Our products</h3>

            <div className="row">
               {products.map(product => (
                  <Products key={product._id} product={product}></Products>
               ))}
            </div>
            <p className="text-center fw-bolder mt-5 mb-5">
               ©2025. Eazy-Bazar. All rights reserved. Dhaka, Bangladesh.
            </p>
         </div>
      </div>
   );
};

export default Home;
