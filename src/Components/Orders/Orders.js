import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Orders = props => {
   const [startDate, setStartDate] = useState(new Date());
   const [loggedInUser, setLoggedInUser] = useContext(UserContext);
   const orderProduct = props.orderProduct;
   const history = useHistory();
   const handleOrder = data => {
      const checkOutData = {
         ...data,
         email: loggedInUser.email,
         customer: loggedInUser.displayName,
         date: startDate,
      };
      fetch('https://fast-badlands-83194.herokuapp.com/orderAdd', {
         // mode: 'no-cors',
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(checkOutData),
      });
      history.push('/placeOrder');
   };

   return (
      <div className="p-5">
         <h1 className="mt-4 fw-bold">Checkout:</h1>
         <Table striped bordered hover responsive>
            <thead>
               <tr>
                  <th>No:</th>
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Price</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>1</td>
                  <td>{orderProduct.name}</td>
                  <td>{orderProduct.quantity}</td>
                  <td>$ {orderProduct.price}.00</td>
               </tr>
               <tr>
                  <td></td>
                  <td></td>
                  <td>Total</td>
                  <td>$ {orderProduct.price}.00</td>
               </tr>
            </tbody>
         </Table>
         <FontAwesomeIcon icon={faCalendarPlus} />
         {'  '}
         <DatePicker
            className="mt-2 border border-4"
            selected={startDate}
            onChange={date => setStartDate(date)}
         />{' '}
         <br />
         <button
            className="mt-3 btn btn-success"
            onClick={() => handleOrder(orderProduct)}
         >
            Checkout <FontAwesomeIcon icon={faCheckCircle} />
         </button>
      </div>
   );
};

export default Orders;
