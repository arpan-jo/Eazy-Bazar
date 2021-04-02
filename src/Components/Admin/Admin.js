import axios from 'axios';
import './Admin.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faTrash,
   faPlus,
   faEdit,
   faTasks,
} from '@fortawesome/free-solid-svg-icons';
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
   }, [products]);

   const onSubmit = data => {
      const productData = {
         name: data.name,
         price: data.price,
         weight: data.weight,
         quantity: data.quantity,
         imageURL: image,
      };
      fetch('https://fast-badlands-83194.herokuapp.com/addProducts', {
         // mode: 'no-cors',
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(productData),
      });
      history.push('/admin');
   };

   const imageUpload = e => {
      const formData = new FormData();
      formData.set('key', 'a37345ce1ec160a9a010d0756d0223a4');
      formData.append('image', e.target.files[0]);
      axios
         .post('https://api.imgbb.com/1/upload', formData)
         .then(res => {
            setImage(res.data.data.display_url);
         })
         .catch(error => {
            console.log(error);
         });
   };

   const deleteItem = id => {
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

   const handleAdd = () => {
      document.getElementById('deleteTable').style.display = 'none';
      document.getElementById('addForm').style.display = 'block';
   };

   const handleDelete = () => {
      document.getElementById('addForm').style.display = 'none';
      document.getElementById('deleteTable').style.display = 'block';
   };

   return (
      <div className="admin-body">
         <div className="admin">
            <div className="sidebar">
               <h3 className="text-center mt-5 mb-3 text-bold text-white">
                  <FontAwesomeIcon icon={faTasks} /> Manage Product
               </h3>
               <button onClick={handleDelete} className="btn btn-warning mx-5 ">
                  <FontAwesomeIcon icon={faTrash} /> Delete Product
               </button>
               <br />
               <br />
               <button
                  onClick={handleAdd}
                  className="manage btn btn-warning mx-5"
               >
                  <FontAwesomeIcon icon={faPlus} /> Add Product
               </button>
            </div>
            <div className="content">
               {products.length > 0 ? (
                  <div className="d-flex justify-content-center">
                     <div className="spinner-border d-none" role="status"></div>
                  </div>
               ) : (
                  <div className="d-flex justify-content-center">
                     <div className="spinner-border " role="status"></div>
                  </div>
               )}
               <div id="deleteTable">
                  <h3 className="mt-3 fw-bold">Manage Product</h3>
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
                                    <FontAwesomeIcon icon={faTrash} />
                                 </button>
                              </td>
                           </tr>
                        </tbody>
                     ))}
                  </Table>
               </div>
               <div id="addForm">
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <table>
                        <h3 className="mt-3 fw-bold">Manage Product</h3>
                        <tr>
                           <td>
                              <label htmlFor="name">Name:</label>
                           </td>
                           <td>
                              <input type="text" name="name" ref={register} />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <label htmlFor="price">Price:</label>
                           </td>
                           <td>
                              <input type="text" name="price" ref={register} />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <label htmlFor="weigth">Weigth:</label>
                           </td>
                           <td>
                              <input type="text" name="weigth" ref={register} />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <label htmlFor="name">Quantity:</label>
                           </td>
                           <td>
                              <input
                                 type="text"
                                 name="quantity"
                                 ref={register}
                              />
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <label htmlFor="Image">Image:</label>
                           </td>
                           <td>
                              <input
                                 type="file"
                                 name="image"
                                 onChange={imageUpload}
                                 placeholder=""
                              />
                           </td>
                        </tr>{' '}
                        <tr>
                           <td></td>
                           <td>
                              {image && (
                                 <button
                                    className="btn btn-success mt-2"
                                    type="submit"
                                 >
                                    Save to Database
                                 </button>
                              )}
                           </td>
                        </tr>
                     </table>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Admin;
