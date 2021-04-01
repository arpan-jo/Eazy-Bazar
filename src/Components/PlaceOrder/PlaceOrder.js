import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

import { UserContext } from '../../App';

const PlaceOrder = () => {
   const [loggedInUser, setLoggedInUser] = useContext(UserContext);

   const [getOrders, setGetOrder] = useState([]);
   const getOrder = getOrders.length < 0 || getOrders;
   const user = loggedInUser.email;
   useEffect(() => {
      fetch(`https://fast-badlands-83194.herokuapp.com/getOrder/${user}`)
         .then(res => res.json())
         .then(data => setGetOrder(data));
   }, []);

   const { customer, email, date } = getOrder.length > 0 && getOrder[0];
   console.log(getOrder);
   return (
      <div className="p-4">
         <h3>Your Order list:</h3>
         <hr />
         {getOrder ? (
            <div className="d-flex justify-content-center">
               <div className="spinner-border d-none" role="status"></div>
            </div>
         ) : (
            <div className="d-flex justify-content-center">
               <div className="spinner-border " role="status"></div>
            </div>
         )}
         <div className="text-center">
            <h5>Customer Details</h5>
            <p>Name: {customer}</p>
            <p>Email: {email}</p>
            <p>Order Date: {date}</p>
         </div>
         <div>
            <h5>Order Details:</h5>
            <Table responsive>
               <thead>
                  <tr>
                     <th>No</th>
                     <th>Products</th>
                     <th>Quantity</th>
                     <th>Price</th>
                  </tr>
               </thead>
               {getOrder.map(product => (
                  <tbody>
                     <tr>
                        <td></td>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>$ {product.price}.00</td>
                     </tr>
                  </tbody>
               ))}
            </Table>
         </div>
         <button className="btn btn-success">Confirm Order</button>
      </div>
   );
};

export default PlaceOrder;
