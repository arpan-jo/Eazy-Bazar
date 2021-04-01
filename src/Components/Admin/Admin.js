import axios from 'axios';
import './Admin.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import swal from 'sweetalert';

const Admin = () => {
   const { register, handleSubmit } = useForm();
   const [image, setImage] = useState(null);
   const history = useHistory();

   const [products, setPorducts] = useState([]);
   useEffect(() => {
      fetch('https://fast-badlands-83194.herokuapp.com/products')
         .then(res => res.json())
         .then(data => {
            setPorducts(data);
         });
   }, []);

   const onSubmit = data => {
      const productData = {
         name: data.name,
         price: data.price,
         weight: data.weight,
         quantity: data.quantity,
         imageURL: image,
      };
      console.log(productData);
      fetch('https://fast-badlands-83194.herokuapp.com/addProducts', {
         // mode: 'no-cors',
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(productData),
      });
   };

   const imageUpload = e => {
      const formData = new FormData();
      formData.set('key', 'a37345ce1ec160a9a010d0756d0223a4');
      formData.append('image', e.target.files[0]);
      axios
         .post('https://api.imgbb.com/1/upload', formData)
         .then(res => {
            console.log(res.data.data.display_url);
            setImage(res.data.data.display_url);
         })
         .catch(error => {
            console.log(error);
         });
   };

   const deleteItem = id => {
      console.log(id);
      fetch('https://fast-badlands-83194.herokuapp.com/delete', {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(id),
      });
      swal('Alert!', 'You deleted the product!', 'warning');
      history.push('/admin');
   };

   const handleDelete = e => {
      console.log('clicked');
   };

   return (
      <div className="admin">
         <div>
            <h1>Manage Product</h1>

            <button onClick={handleDelete}>Delete</button>
            <br />
            <button>Add Product</button>
         </div>

         <div>
            {
               <form onSubmit={handleSubmit(onSubmit)}>
                  <input type="text" name="name" ref={register} />
                  <br />
                  <input type="text" name="price" ref={register} />
                  <br />
                  <input type="text" name="weigth" ref={register} />
                  <br />
                  <input type="text" name="quantity" ref={register} />
                  <br />
                  <input
                     type="file"
                     name="quantity"
                     onChange={imageUpload}
                     placeholder=""
                  />
                  <br />
                  <button className="btn btn-success" type="submit">
                     {' '}
                     Add product
                  </button>
               </form>
            }
         </div>

         <div>
            {products.length > 0 ? (
               <div className="d-flex justify-content-center">
                  <div className="spinner-border d-none" role="status"></div>
               </div>
            ) : (
               <div className="d-flex justify-content-center">
                  <div className="spinner-border " role="status"></div>
               </div>
            )}
            <Table bordered>
               <thead>
                  <tr>
                     <th>Products</th>
                     <th>Quantity</th>
                     <th>Price</th>
                     <th>Action</th>
                  </tr>
               </thead>
               {products.map(product => (
                  <tbody>
                     <tr>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>$ {product.price}.00</td>
                        <td>
                           <button className="btn bg-warning">
                              <FontAwesomeIcon icon={faEdit} />
                           </button>
                           {'  '}
                           <button
                              onClick={() => deleteItem(product)}
                              className="btn bg-danger"
                           >
                              <FontAwesomeIcon icon={faShoppingCart} />
                           </button>
                        </td>
                     </tr>
                  </tbody>
               ))}
            </Table>
         </div>
      </div>
   );
};

export default Admin;
