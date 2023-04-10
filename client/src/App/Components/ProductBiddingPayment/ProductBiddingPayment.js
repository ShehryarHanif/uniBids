// import the essential modules and components utilized in this component
import "./ProductBiddingPayment.css";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

// this component displays the actions for payment for the user that has made the highest bid for the product.
// after their successful payment, this component proivdes the buyer user with the following:
// seller email, room number, and payment options by card or cash. It also gives the form for card payments.

export default function ProductBiddingPayment(props) {
    // initialize variables
    const [currentProduct, setCurrentProduct] = useState(props.productDetails);
    const [sellerUser, setSellerUser] = useState(props.userDetails);
    
    const [cardNumber, setCardNumber] = useState(null);
    const [cardMonth, setCardMonth] = useState(null);
    const [cardYear, setCardYear] = useState(null);
    const [cardName, setCardName] = useState(null);
    const [specialNumber, setSpecialNumber] = useState(null);

    const history = useHistory();

    // handle changes in input forms

    const handleNumberChange = (event) => {
        setCardNumber(event.target.value);
    }

    const handleMonthChange = (event) => {
        setCardMonth(event.target.value);
    }

    const handleYearChange = (event) => {
        setCardYear(event.target.value);
    }

    const handleNameChange = (event) => {
        setCardName(event.target.value);
    }

    const handleSpecialNumberChange = (event) => {
        setSpecialNumber(event.target.value);
    }

    // logic for cash payment success
    const handleClickOne = (e) => {
        e.preventDefault();

        axios.post(`/action/updatePayment`, {
            itemIdentifier: currentProduct._id,
        }).then(() => {
                axios.post("/action/makeCashPayment", {
                    paymentAmount: currentProduct.highestBid,
                    buyerIdentifier: currentProduct.highestBidder,
                    sellerIdentifier: currentProduct.sellerId,
                    productIdentifier: currentProduct._id
                });
        });
        
        alert("Successful Purchase");

        history.replace("/");
    }

    // logic for card payment success
    const handleClickTwo = (e) => {
        e.preventDefault();

        if((new Date()).toISOString() < (new Date(cardYear, cardMonth - 1)).toISOString()){
            axios.post(`/action/updatePayment`, {
                itemIdentifier: currentProduct._id,
            }).then(() => {
                axios.post("/action/makeCardPayment", {
                    paymentAmount: currentProduct.highestBid,
                    buyerIdentifier: currentProduct.highestBidder,
                    sellerIdentifier: currentProduct.sellerId,
                    productIdentifier: currentProduct._id,
                    cardNumber: cardNumber,
                    cardMonth: cardMonth,
                    cardYear: cardYear,
                    cardName: cardName,
                    specialNumber: specialNumber
                });
            });
            
            alert("Successful Purchase");
    
            history.replace("/");
        } else {
            alert("Please enter a valid combination of the month and year (a later one).");
        }
    }

    // display the content and styling for this component
    if(currentProduct !== null && currentProduct !== undefined && sellerUser !== null && sellerUser !== undefined){
        return (
            <div>
                {/* instructions to make payment in person */}
                <div>
                    <div className="paymentMessage">Pay {currentProduct.highestBid} AED to the seller at Room "{sellerUser.room}". Their email is "{sellerUser.email}"</div>
                    <button className="paymentButton" onClick={handleClickOne}>Pay By Cash</button>
                </div>

                {/* instructions to make card payment */}
                <div>
                <div className="paymentMessage">Pay {currentProduct.highestBid} AED by card.</div>
                {/* form for card details */}
                    <form className="paymentForm" onSubmit={handleClickTwo}>
                        <label>
                            Card Number:
                            <input className="paymentInput" type="number" pattern="\d*" minlength="12" min="0" maxlength="12" placeholder={"Twelve-Digit Number"} value={cardNumber} onChange={handleNumberChange} required/>
                        </label>
                        <label>
                            Valid Until:
                            <input  className="paymentInput" type="number" minlength="3" maxlength="4" min={"1"} max={"12"} placeholder={"Month"} value={cardMonth} onChange={handleMonthChange} required/>
                            <input  className="paymentInput monthInp" minlength="4" maxlength="6" type="number" min={"2022"}  placeholder={"Year"} value={cardYear} onChange={handleYearChange} required/>
                        </label>
                        <label>
                            Card Name:
                            <input  className="paymentInput" type="text" value={cardName} onChange={handleNameChange} required/>
                        </label>
                        <label>
                            Card CVV:
                            <input  className="paymentInput" type="text" pattern="\d*" minlength="3" maxlength="3" placeholder={"Three-Digit Number"} value={specialNumber} onChange={handleSpecialNumberChange} required />
                        </label><br/>
                        <input className="paymentButton" type="submit" value="Pay By Card"/>
                    </form>
                </div>
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