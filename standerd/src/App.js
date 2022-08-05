import React, { useState, useEffect } from "react";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import "./App.css";


export default function App() {

const [show, setShow] = useState(false);

const [success, setSuccess] = useState(false);

const [ErrorMessage, setErrorMessage] = useState("");

const [orderID, setOrderID] = useState(false);


 // creates a paypal order

const createOrder = (data, actions) => {

   return actions.order

     .create({

       purchase_units: [

         {

           description: "Sunflower",

           amount: {

             currency_code: "USD",

             value: 1,

           },

         },

       ],

       // not needed if a shipping address is actually needed

       application_context: {

         shipping_preference: "NO_SHIPPING",

       },

     })

     .then((orderID) => {

       setOrderID(orderID);

       return orderID;

     });

};


 // check Approval

const onApprove = (data, actions) => {

   return actions.order.capture().then(function (details) {

     const { payer } = details;

     setSuccess(true);

   });

};

//capture likely error

const onError = (data, actions) => {

   setErrorMessage("An Error occured with your payment ");

};

 

useEffect(() => {

  if (success) {

    alert("Payment successful!!");

  }

},

[success]

);

 

console.log(1, orderID);

console.log(2, success);

console.log(3, ErrorMessage);

 

return (

   <PayPalScriptProvider

     options={{

       "client-id":  `${process.env.REACT_APP_CLI}`,

     }}

   >

     <div className='shopping'>

       <div className="wrapper">

         
        <div className="product-card">
         <div className="product-img">
           <img

             src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"

             alt="nike"

             height="420"

             width="327"

           />

         </div>
        
         <div className="product-info">

           <div className="product-text">

             <h1>Nike White Sniekers</h1>

             <h2>NIKE AIR NEW SNIEKER</h2>

             <p>

               Confortable and fits very well

               <br />

               for casual style, sporty mix.

              {" "}

             </p>

           </div>


           <div className="product-price-btn">

             <p>

               <span>$1</span>

             </p>

             <button type="submit" onClick={() => setShow(true)}>

               Buy now

             </button>

           </div>

         </div>
         </div>
      

 

       {show ? (

         <PayPalButtons

           style={{ layout: "vertical" }}

           createOrder={createOrder}

           onApprove={onApprove}

         />

       ) : null}

       </div>

     </div>

   </PayPalScriptProvider>

);

}