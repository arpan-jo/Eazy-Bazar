import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';

const Products = ({ product }) => {
   const history = useHistory();
   const handleProduct = id => {
      history.push(`/product/${id}`);
   };

   return (
      <div className="card col-sm-4 mt-3 bg-light">
         <div className="card-body text-center mx-2">
            <img
               className="product-image"
               src={product.imageURL}
               alt="product images"
            />
            <p>{product.name}</p>
            <div className="d-flex justify-content-around align-items-center">
               <h4>${product.price}</h4>
               <button
                  className="btn btn-success"
                  onClick={() => handleProduct(product._id)}
                  type="button"
               >
                  <FontAwesomeIcon icon={faShoppingCart} /> Buy now
               </button>
            </div>
         </div>
      </div>
   );
};

export default Products;
