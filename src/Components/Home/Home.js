import React, { useEffect, useState } from 'react';
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
      <div className="container">
         <div className="row">
            {products.map(product => (
               <Products key={product._id} product={product}></Products>
            ))}
         </div>
      </div>
   );
};

export default Home;
