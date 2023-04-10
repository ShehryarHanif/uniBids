import "./UserProfile.css";

import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from 'moment';
import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard.js"

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { AuthContext } from "../../Context/AuthContext";


// this userProfile page allows to load the specific user as requested by another user

/**
 * Client code for User Profile page
 * @param {*} props 
 * @returns A profile page showing user information and all the item that has been bought and sold by the user
*/

export default function UserProfile(props) {
    // Get information about the user

    const { user } = useContext(AuthContext);

    const params = useParams() // We will need this to route to a specific product page

    // Track the inputs through state management

    const [currentUser, setCurrentUser] = useState(null);
    const [boughtItems, setBoughtItems] = useState([]);
    const [soldItems, setSoldItems] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/action/getUser`, {params: { id:  params.userIdentifier }});

            setCurrentUser(res.data.user);
        };

        fetchUser();
    }, [user]);

    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get(`/action/getItemsByIdentifiers`, {params: { identifiers: currentUser.boughtItems }});

            setBoughtItems(res.data.items);
        };

        fetchItems();
    }, [currentUser]);
    
    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get(`/action/getItemsByIdentifiers`, {params: { identifiers: currentUser.soldItems }});

            setSoldItems(res.data.items);
        };

        fetchItems();
    }, [currentUser]);

    const handleClick = (e, passedValue) => {
        e.preventDefault()

        history.replace(`/user-profile/${passedValue}`);
        
    };

    // Render the profile page with the user information and all the item that has been bought and sold by the user

    if(currentUser !== null && currentUser !== undefined){ // Only render the front-end after getting back-end data
        return (
            <div>
                <div className="profileContainer">
                    <div className="profileSection">

                        <Paper className="profilePaper"
                        sx={{
                            p: 2,
                            margin: 'auto',
                            maxWidth: 900,
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                >
                    <div className="userName">
                    {currentUser.name || "NULL"}
                    </div>

                {/* dispolay user details for the profile */}
                <Grid container spacing={2} className="profileSectionGrid" justifyContent="space-evenly" alignItems="center">
                    <Grid item xs={5}>
                    <Typography className="userUserName" variant="body1">
                            <b>Username: </b> {currentUser.username || "NULL"}
                    </Typography>
                    </Grid>
                    <Grid item xs={5}> 
                    <Typography className="userEmail" variant="body1">
                            <b>Email: </b> {currentUser.email || "NULL"}
                    </Typography>
                    </Grid>

                    <Grid item xs={4}>
                    <Typography className="userRoom" variant="body1">
                            <b>Room Number: </b> {currentUser.room || "NULL"}
                    </Typography>
                    </Grid>

                    <Grid item xs={4}>
                    <Typography className="userBoughtNo" variant="body1">
                            <b>Bought Items: </b> {boughtItems.length || 0}
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Typography className="userSoldNo" variant="body1">
                            <b>Sold Items: </b> {soldItems.length || 0}
                    </Typography>
                    </Grid>

                </Grid>
            </Paper>

            {/* display the products bought by the user */}

            <div className="userBought">
                <div className="profileHeading">
                    Bought Products
                </div>
                <div className="boughtGrid">
                <Grid  container direction="row" justifyContent="space-between" alignItems="center"
                    spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {boughtItems.map((product) =>(
                            <Grid item xs={2} sm={4} md={6} key={product._id}>
                            <button className="cardButton" onClick={(e) => handleClick(e, product._id)}><ProductCard 
                            maxwidth={200}
                            height = {"150"}
                            name = {product.name || "Null"} 
                            bid = {String(product.highestBid) || "AED 00"}
                            timer = {product.timer}

                            time = {moment(product.timer).format('Do MMMM YYYY, h:mm:ss a') || "Null"}
                            sold = {product.sold}
                            src = {product.imageUrl}
                            /></button>
                        
                            </Grid>
                      
                        ))}

                        </Grid>
                </div>
            </div>
            {/* display the products sold by the user */}

            <div className="userBought">
                <div className="profileHeading">
                    Sale Products
                </div>
                <div className="boughtGrid">
                <Grid  container direction="row" justifyContent="space-between" alignItems="center"
                    spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {soldItems.map((product) =>(
                            <Grid item xs={2} sm={4} md={6} key={product._id}>
                            <button className="cardButton" onClick={(e) => handleClick(e, product._id)}><ProductCard 
                            maxwidth={200}
                            height = {"150"}
                            name = {product.name || "Null"} 
                            bid = {String(product.highestBid) || "AED 00"}
                            timer = {product.timer}

                            time = {moment(product.timer).format('Do MMMM YYYY, h:mm:ss a') || "Null"}
                            sold = {product.sold}
                            src = {product.imageUrl}
                            /></button>
                        
                            </Grid>
                      
                        ))}
                </Grid>
                </div>
            </div>
                </div>
                </div>
            </div>
           
        );
    } 
    else {
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
}