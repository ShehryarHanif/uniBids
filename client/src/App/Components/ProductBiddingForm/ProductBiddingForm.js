// import the essential modules and components utilized in this component
import "./ProductBiddingForm.css";

import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import axios from "axios";

import { AuthContext } from "../../Context/AuthContext";

// the code for the display and functionality for the bidding feature on the product.
// in this component, the logic validates the input bids, checks if it is valid (as in grerater than current highest bid)
// and then updates the bid.
// it also displays the bid feature

export default function ProductBiddingForm(props) {

    // initalize the variables
    const { user } = useContext(AuthContext);

    const [newBid, setNewBid] = useState(null);

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

    // fetch item from api
    useEffect(async () => {
        await axios.get(`/action/getItem`, {params: { id: props.productId }}).then((response) => {
            setCurrentProduct(response.data.item);
        });
    }, []);

    useEffect(async () => {
        setNewBid(Math.max(currentProduct.initialBid, currentProduct.highestBid) + 1);
    }, [currentProduct]);

    const handleChange = (e) => {
        setNewBid(e.target.value);
    } 

    const handleClick = (e) => {
        e.preventDefault();
        // if the bid is vaid, post and update the new bid
        if (newBid > currentProduct.highestBid) {
            axios.post(`/action/updateBid`, {
                itemIdentifier: currentProduct._id,
                bid: newBid,
                userIdentifier: user._id,
            }).then((response) => {
                setCurrentProduct(response.data.item);
            });
            
            alert("Successful Bid");

            history.replace("/");
        }

    }

    if(currentProduct !== null && currentProduct !== undefined && newBid !== null && newBid !== undefined){
        return (
            // diplay the input area for bid and the button to place it
            
            <div>
                <input className="bidInput" type="Number" value={newBid} min={String(newBid)} placeholder={String(newBid)} onChange={handleChange}/>
                <a className="bidButton" onClick={handleClick}>Bid <PriceCheckIcon/></a>

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