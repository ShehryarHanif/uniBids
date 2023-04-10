import axios from "axios";

import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { render } from "react-dom";
import { useForm } from "react-cool-form";

import "./AddItem.css";

import { AuthContext } from "../../Context/AuthContext";


/**
 * Client code for Add Item page with logic function to request to add Item to database
 * @returns an Add New Item page where user can put in image and description
 */ 

export default function AddItem() {
  const { user } = useContext(AuthContext);

  const name = useRef();
  const sellerId = user._id;
  const imageUrl = useRef();
  const initialBid = useRef();
  const timer = useRef();
  const description = useRef();

  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();

    console.log(timer.current.value);
    // validate if the dates are correct and update item attributes accordingly
    if((new Date()).toISOString() < (new Date(timer.current.value)).toISOString()) {
        const item = {
          name: name.current.value,
          sellerId: sellerId,
          imageUrl: imageUrl.current.value,
          initialBid: initialBid.current.value,
          timer: timer.current.value,
          description: description.current.value
      };

      try {
          await axios.post("/action/postItem", item);

          history.replace('/');
      } catch (err) {
          console.log(err);
      }
    } else {
      alert("Try again with a later time.");
    }
  };

  
    // create the section and the form to create a new product
    // this allows user to add a new product to sell with the corressponding details of it
  return (
    <div className="createProduct">
      <div className="createProductWrapper">
        <div className="createProductTop"> 
          <h3 className="createProductLogo">Sell Product</h3>
          <span className="createProductDesc">Add the details of the product to sell</span>
        </div>

        <div className="createProductBottom">
          <form className="createBox" onSubmit={handleClick}>
             <input
              placeholder="Name"
              required
              ref={name}
              className="productInput"
            /><br />
            
            <input
              placeholder="Image URL"
              required
              ref={imageUrl}
              className="productInput"
            /><br />

            <input
              placeholder="Initial Bid"
              required
              ref={initialBid}
              type="number"
              className="productInput"
              min="0"
            /><br />
        
            <input
              placeholder="Deadline"
              required
              ref={timer}
              type="datetime-local"
              className="productInput"
            /><br />
            
            <textarea
              placeholder="Description"
              required
              ref={description}
              className="textareaCreate"
            /><br />

            <button className="createButton" type="submit">
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}





  

  


