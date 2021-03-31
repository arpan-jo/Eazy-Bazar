import React from 'react';
import { useHistory } from 'react-router';

const Products = ({ product }) => {
   const history = useHistory();
   const handleProduct = id => {
      history.push(`/product/${id}`);
   };

   return (
      <div className="card col-4 mx-2 mt-3 bg-light ">
         <div className="card-body text-center">
            <img
               className="product-image"
               src={product.imageURL}
               alt="product images"
            />
            <div className="d-flex justify-content-around align-items-center">
               <h4>${product.price}</h4>
               <button onClick={() => handleProduct(product._id)} type="button">
                  Buy now
               </button>
            </div>
         </div>
      </div>
   );
};

export default Products;
