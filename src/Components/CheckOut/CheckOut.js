import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Orders from '../Orders/Orders';

const CheckOut = () => {
   const [orderProduct, setOrderProduct] = useState({});

   const { id } = useParams();
   useEffect(() => {
      fetch(`https://fast-badlands-83194.herokuapp.com/product/${id}`)
         .then(res => res.json())
         .then(data => {
            setOrderProduct(data[0]);
         });
   }, []);

   console.log(orderProduct);

   return <div>{<Orders orderProduct={orderProduct}></Orders>}</div>;
};

export default CheckOut;
