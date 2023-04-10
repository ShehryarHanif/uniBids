// import the essential modules and components utilized in this component

import "./ProductPage.css";

import ProductBiddingForm from "../../Components/ProductBiddingForm/ProductBiddingForm";
import ProductPlaceholderMessage from "../../Components/ProductPlaceholderMessage/ProductPlaceholderMessage";
import ProductBiddingPayment from "../../Components/ProductBiddingPayment/ProductBiddingPayment";
import ProductStateChanger from "../../Components/ProductStateChanger/ProductStateChanger";

import { useEffect, useState, useContext } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import moment from "moment"
/**
 * Client code for Product page
 * @returns A product page that lists the information of the chosen product
*/

export default function ProductPage() {
    const { user } = useContext(AuthContext);

    const params = useParams() // We will need this to route to a specific product page

    const [sellerUser, setSellerUser] = useState(null);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(async () => {
        await axios.get(`/action/getItem`, {params: { id: params.productIdentifier }}).then((response) => {
            setCurrentProduct(response.data.item);
        });
    }, []);

    useEffect(async () => {
        await axios.get(`/action/getUser`, {params: { id: currentProduct.sellerId }}).then((response) => {
            console.log("This happened");
            setSellerUser(response.data.user);
        });
    },  [currentProduct]);

    // For better readability, have an image component

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      });

      // display the page for the product
    if(currentProduct !== null && currentProduct !== undefined && sellerUser !== null && sellerUser !== undefined){
        return (
            <div className="productContainer">
                <div className="productSection">

                <Paper
                sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 900,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
                >
                    {/* make the material ui grid for better respnsive structuring */}
                <Grid container spacing={2} className="productSectionGrid">
                    <Grid item>
                    <ButtonBase sx={{ width: 450, height: 450 }}>
                        <Img alt="complex" src={currentProduct.imageUrl} />
                    </ButtonBase>
                    </Grid>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item>
                        <Typography className="productName" gutterBottom variant="h3" component="div">
                        {currentProduct.name}
                        </Typography>
                        <Typography className="productSeller" variant="subtitle1">
                            <b>Seller: </b> <a className="sellerLink" href={"/user-profile/" + sellerUser._id}>{sellerUser.name}</a>
                        </Typography>
                    </Grid>
                   <br/><br/>
                    <Grid item container direction="row" spacing={{xs:2, sm:2, md:7}}>
                        <Grid item>
                            <Typography className="productHighest" variant="subtitle1" component="div">
                            Current Bid: AED {currentProduct.highestBid}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className="productInitial" variant="subtitle1" >
                                Initial Bid: AED {currentProduct.initialBid}
                            </Typography>
                        </Grid>
                     </Grid>

                     <Grid item>
                        <Typography className="productDate" variant="body1">
                            Bidding Until: {moment(currentProduct.timer).format('Do MMMM YYYY, h:mm:ss a')}
                        </Typography>
                        {currentProduct.sold || ((new Date()).toISOString() > currentProduct.timer) ? 
                        <Typography variant="body1" color="red">Unavailable</Typography> : 
                        <Typography variant="body2" color="green">Available</Typography>}
                    </Grid>
                    <Grid item>
                        <Typography className="productDescription" variant="body1">
                        {currentProduct.description}
                        </Typography>
                    </Grid>

                    {/* These handle the payment status and payment forms.
                    depending on user buy and selling interactions, if the bid is done, itb displays to the highest bidder
                    the option to make payment for their bid.
                    it displays the 2 payment options and card payemnt form
                     for the selller it gives the option to accept the bid.
                      */}
                    {user._id === currentProduct.sellerId && currentProduct.sold === false && (new Date()).toISOString() <= currentProduct.timer ? <Grid item><ProductPlaceholderMessage message={"Wait for bidders!"}/> </Grid> : null}

                    {user._id === currentProduct.sellerId && currentProduct.sold === false && currentProduct.highestBidder === null && (new Date()).toISOString() > currentProduct.timer ? <Grid item><ProductPlaceholderMessage message={"No one bought the product!"}/> </Grid> : null}

                    {user._id === currentProduct.sellerId && currentProduct.sold === false && currentProduct.highestBidder !== null && currentProduct.pendingPayment === true && (new Date()).toISOString() > currentProduct.timer ? <Grid item><ProductPlaceholderMessage message={"No one has completed the payment!"}/> </Grid> : null}

                    {user._id === currentProduct.sellerId && currentProduct.sold === false && currentProduct.highestBidder !== null && currentProduct.pendingPayment === false && (new Date()).toISOString() > currentProduct.timer ? <Grid item><ProductStateChanger productId={currentProduct._id}/> </Grid> : null}

                    {user._id === currentProduct.sellerId && currentProduct.sold === true && (new Date()).toISOString() > currentProduct.timer ? <Grid item><ProductPlaceholderMessage message={"Congrats on selling the product!"}/> </Grid>: null}

                    {user._id !== currentProduct.sellerId && currentProduct.sold === false && (new Date()).toISOString() <= currentProduct.timer ? <Grid item><ProductBiddingForm productId={currentProduct._id} /> </Grid>: null}

                    {user._id !== currentProduct.sellerId  && user._id !== currentProduct.highestBidder && currentProduct.sold === false && (new Date()).toISOString() > currentProduct.timer ? <Grid item><ProductPlaceholderMessage message={"The bidding time has passed!"}/> </Grid>: null}

                    {user._id !== currentProduct.sellerId && user._id !== currentProduct.highestBidder  && currentProduct.sold === true && (new Date()).toISOString() > currentProduct.timer ? <Grid item><ProductPlaceholderMessage message={"The product has been sold to someone else!"}/> </Grid>: null}

                    {user._id !== currentProduct.sellerId && user._id === currentProduct.highestBidder && currentProduct.sold === false && currentProduct.pendingPayment === true && (new Date()).toISOString() > currentProduct.timer ? <Grid item><ProductBiddingPayment productDetails={currentProduct} userDetails={sellerUser}/> </Grid>: null}

                    {user._id !== currentProduct.sellerId && user._id === currentProduct.highestBidder && currentProduct.sold=== false && currentProduct.pendingPayment === false  && (new Date()).toISOString() > currentProduct.timer ? <Grid item><ProductPlaceholderMessage message={"Your payment is being processed!"}/> </Grid>: null}

                    {user._id !== currentProduct.sellerId && user._id === currentProduct.highestBidder  && currentProduct.sold === true && (new Date()).toISOString() > currentProduct.timer ? <Grid item><ProductPlaceholderMessage message={"Congrats on buying the product!"}/> </Grid>: null}       
                </Grid>
            </Grid>
            </Paper>
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