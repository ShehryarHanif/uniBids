// import the essential modules and components utilized in this component
import "./ProductStateChanger.css";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

/**
 * 
 * @param {*} props 
 * @returns 
 */

// this comoponent allows to cater for and change product buying and selling status
// once seller confirms the payment, this changes the payment status 

export default function ProductStateChanger(props) {
    const [currentProduct, setCurrentProduct] = useState({
        name: null,
        sellerId: null,
        imageUrl: null,
        highestBid: null,
        initialBid: null,
        timer: null,
        description: null,
        sold: null,
    });;

    const history = useHistory();

    // get the current product from the API using axios routing
    useEffect(async () => {
        await axios.get(`/action/getItem`, {params: { id: props.productId }}).then((response) => {
            setCurrentProduct(response.data.item);
        });
    }, []);

    // update the selling of the product
    const handleClick = (e) => {
        e.preventDefault();

        axios.post(`/action/updateSale`, {
            itemIdentifier: currentProduct._id
        }).then((response) => {
            setCurrentProduct(response.data.item);
        });
        
        alert("Successful Payment Acceptance");

        history.replace("/");
    }

    // a button hyperlink that allows the seller to confirm the user payment
    if(currentProduct !== null && currentProduct !== undefined){
        return (
            <div>
                <a className="stateChanger" onClick={handleClick}>Confirm Payment Receipt</a>
            </div>
        );
    } else {
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
}