// import the essential modules and components utilized in this component
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import "./ProductCard.css"

// this component produces and displays the cards for display on our main product display dashboards
// this allows us to display some details of our product as the cards

export default function ProductCard(props) {
  return (
    <div>
      {/* we use the material ui card components */}
    <Card sx={{ maxWidth: props.maxwidth }} className="card">
      <CardActionArea>
        <CardMedia className="productImg"
          component="img"
          height={props.height}
          // image={props.src}
          image={props.src}

          alt="Product Image"
        />
        {/* this displays the card details as per the structure */}
        <div className="cardPrice">AED {props.bid}</div>
        <CardContent>
            <div className="cardContent">
                <div className="cardInfo">
                    <div className="cardHeading">
                        <Typography className="cardHeading hover-underline-animation" gutterBottom variant = "h6" component="div">{props.name}</Typography>
                    </div>
                    <div className="cardDetails">
                        <Typography variant="body2" color="text.secondary">Bid ends: {props.time}</Typography>
                        {/* <Typography variant="body2" color="text.secondary">Seller Rating:</Typography> */}
                        {props.sold || ((new Date()).toISOString() > props.timer) ? 
                        <Typography variant="body1" color="red">Unavailable</Typography> : 
                        <Typography variant="body2" color="green">Available</Typography>}

                        {/* {props.sold ? 
                        <Typography variant="body2" color="red">Sold</Typography> : 
                        <Typography variant="body2" color="green">Available</Typography>} */}

                        {/* <Typography variant="body2" color={props.sold == "Sold" ? "red": "green"}>{props.sold}</Typography> */}
                    </div>

                </div>

            </div>
  
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}
