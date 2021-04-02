import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

const PlaceOrder = () => {
   const [loggedInUser, setLoggedInUser] = useContext(UserContext);
   const history = useHistory();
   const [getOrders, setGetOrder] = useState([]);
   const getOrder = getOrders.length < 0 || getOrders;

   const user = loggedInUser && loggedInUser.email;
   useEffect(() => {
      fetch(`https://fast-badlands-83194.herokuapp.com/getOrder/${user}`)
         .then(res => res.json())
         .then(data => setGetOrder(data));
   }, []);

   const { customer, email, date } = getOrder.length > 0 && getOrder[0];
   const confirmOrder = () => {
      swal('Good Job', 'You bought the products!', 'success');
      history.push('/home');
   };

   return (
      <div className="p-5">
         <h3 className="fw-bolder">Orders Summary</h3>
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
         <div>
            <h5 className="fw-bolder">Customer Details:-</h5>
            <p>Name: {customer}</p>
            <p>Email: {email}</p>
            <p>Order Date: {date}</p>
         </div>
         <div>
            <h5 className="fw-bolder">Order Details:-</h5>
            <Table responsive>
               <thead>
                  <tr>
                     <th>No</th>
                     <th>Products</th>
                     <th>Quantity</th>
                     <th>Price</th>
                  </tr>
               </thead>
               {getOrders.map(product => (
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
         <button onClick={confirmOrder} className="btn btn-success">
            Confirm Order <FontAwesomeIcon icon={faSmile} />
         </button>
      </div>
   );
};

export default PlaceOrder;
