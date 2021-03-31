import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const PlaceOrder = () => {
   const [loggedInUser, setLoggedInUser] = useContext(UserContext);

   const [getOrders, setGetOrder] = useState([]);
   console.log(getOrders);

   useEffect(() => {
      fetch('http://localhost:3500/getOrder')
         .then(res => res.json())
         .then(data => setGetOrder(data));
   }, []);

   return (
      <div>
         <h1>This is place order</h1>
      </div>
   );
};

export default PlaceOrder;
