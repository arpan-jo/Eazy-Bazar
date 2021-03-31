import React from 'react';

const Orders = props => {
   const orderProduct = props.orderProduct;

   const handleOrder = data => {
      console.log(data);
      fetch('https://fast-badlands-83194.herokuapp.com/orderAdd', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      });
   };

   return (
      <div>
         <h1>This is order page</h1>
         <h1>Name: {orderProduct.name}</h1>
         <button onClick={() => handleOrder(orderProduct)}>Order Place</button>
      </div>
   );
};

export default Orders;
