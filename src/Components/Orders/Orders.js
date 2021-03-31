import React from 'react';

const Orders = props => {
   const orderProduct = props.orderProduct;
   console.log(orderProduct);
   return (
      <div>
         <h1>This is order page</h1>
         <h1>Name: {orderProduct.name}</h1>
         <button>Order Place</button>
      </div>
   );
};

export default Orders;
