import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Admin.css';

const Admin = () => {
   const { register, handleSubmit } = useForm();
   const [image, setImage] = useState(null);

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

   return (
      <div className="products">
         <div>
            <p>Manage Product</p>

            <input type="checkbox" />
            <button>Delete</button>
            <br />
            <button>Update</button>
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
                  <input type="submit" />
               </form>
            }
         </div>
      </div>
   );
};

export default Admin;
