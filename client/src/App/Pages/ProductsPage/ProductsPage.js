import "./ProductsPage.css";
import ProductCard from "../../Components/ProductCard/ProductCard.js"
import { Grid } from '@mui/material';
import { Dropdown} from "react-bootstrap";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SortIcon from '@mui/icons-material/Sort';
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Search } from "@material-ui/icons";
import moment from "moment";

import axios from "axios";

/**
 * Client code for Products page
 * @param {*} props 
 * @returns a products page that lists all the current products ordered and their status
*/

export default function ProductsPage(props) {
    // Use state management for search query

    const [products, setProducts] = useState([]);
    const [shownProducts, setShownProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);

    const [searchStuff, setSearchStuff] = useState("");

    const history = useHistory();

    // Handle the search functionality

    const handleChange = (e) => {
        setSearchStuff(e.target.value);
    };

    const handleClickSearch = (e) => {
        e.preventDefault();

        filterProductsByQuery(searchStuff)
    };

    // Handle the filtering functionality

    const viewAllClick = (e) => {
        e.preventDefault();

        const filteredProducts = [...shownProducts].filter(product => {
            return product.name.toLowerCase().includes(props.searchQuery.toLowerCase());
        });

        setCurrentProducts(filteredProducts);
    };

    const viewSoldClick = (e) => {
        e.preventDefault();

        const filteredProducts = [...shownProducts].filter(product => {
            return product.name.toLowerCase().includes(props.searchQuery.toLowerCase());
        }).filter(product => {
            return product.sold === true;
        });

        setCurrentProducts(filteredProducts);
    };
        
    const viewUnsoldClick = (e) => {
        e.preventDefault();

        const filteredProducts = [...shownProducts].filter(product => {
            return product.name.toLowerCase().includes(props.searchQuery.toLowerCase());
        }).filter(product => {
            return product.sold === false;
        });

        setCurrentProducts(filteredProducts);
    };

    // Handle the sorting functionality

    const sortAscending = (e) => {
        e.preventDefault();

        const sortedProducts = [...currentProducts].sort((a, b) => (a.highestBid - b.highestBid));

        setCurrentProducts(sortedProducts);
    };

    const sortDescending = (e) => {
        e.preventDefault();

        const sortedProducts = [...currentProducts].sort((a, b) => (b.highestBid - a.highestBid));

        setCurrentProducts(sortedProducts);
    };

    // Filter the products by query

    const filterProductsByQuery = (filterQuery) => {
        const filteredProducts = [...products].filter(product => {
            return product.name.toLowerCase().includes(filterQuery.toLowerCase());
        });

        setCurrentProducts(filteredProducts);
        setShownProducts(filteredProducts);
    };

    // Get data initially

    useEffect(async () => {
            await axios.get(`/action/getItems`).then((response) => {
                setProducts(response.data.items);
            });
    }, []);

    useEffect(()=>{
        filterProductsByQuery(props.searchQuery);
    },  [products]);
 
    // Have a link to a page for a particular product

    const handleClick = async (e, passedValue) => {
        e.preventDefault()

        history.replace(`/product-page/${passedValue}`);
    };

    // Render the products page if data has been found

    if(shownProducts !== null && shownProducts !== undefined && shownProducts.length !== 0){
        return (
            <div className="platformContianer">
                <div className="centerContainer">
                
                <div className="searchSection">
                    <div className="searchContainer">
                    <form onSubmit={handleClickSearch}>

                    <Search className="searchIcon" />
                    <input
                    placeholder="Search products"
                    className="searchInput"
                    onChange={handleChange}
                    />
                    <button type="submit" className="searchButton"><Search className="searchIcon" /></button>
                    </form></div>
                </div>

                {/* dropdown filters */}

                <div className="fiters">
                <Dropdown className="dropdown">
                    <Dropdown.Toggle className="dropdown" id="dropdown-button-dark-example1" variant="secondary">
                    View Products <DashboardIcon/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                    <Dropdown.Item onClick={viewAllClick} active>View All </Dropdown.Item>
                    <Dropdown.Item onClick={viewUnsoldClick}>View Unsold Products</Dropdown.Item>
                    <Dropdown.Item onClick={viewSoldClick}>View Sold Products</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown className="dropdown">
                    <Dropdown.Toggle className="dropdown" id="dropdown-button-dark-example1" variant="secondary">
                    Sort by <SortIcon/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                    <Dropdown.Item onClick={sortAscending} active>Bid: Low to High </Dropdown.Item>
                    <Dropdown.Item onClick={sortDescending}>Bid: High to Low </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>

                {/* grid of all products */}
                <div className="productsGrid">
                    <Grid container direction="row" justifyContent="space-evenly" alignItems="center"
                    spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {currentProducts.map((product) =>(
                            <Grid item xs={2} sm={4} md={4} key={product._id}>
                            <button className="cardButton" onClick={(e) => handleClick(e, product._id)}><ProductCard 
                            maxwidth={250}
                            height = {"220"}
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
        );
    } else {
        return(
            <div className="platformContianer">
            <div className="centerContainer">
            
            <div className="searchSection">
                <div className="searchContainer">
                <form onSubmit={handleClickSearch}>

                <Search className="searchIcon" />
                <input
                placeholder="Search products"
                className="searchInput"
                onChange={handleChange}
                />
                <button type="submit" className="searchButton"><Search className="searchIcon" /></button>
                </form></div>
            </div>

            {/* dropdown filters */}

            <div className="fiters">
            <Dropdown className="dropdown">
                <Dropdown.Toggle className="dropdown" id="dropdown-button-dark-example1" variant="secondary">
                View Products <DashboardIcon/>
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={viewAllClick} active>View All </Dropdown.Item>
                <Dropdown.Item onClick={viewUnsoldClick}>View Available Products</Dropdown.Item>
                <Dropdown.Item onClick={viewSoldClick}>View Sold Products</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="dropdown">
                <Dropdown.Toggle className="dropdown" id="dropdown-button-dark-example1" variant="secondary">
                Sort by <SortIcon/>
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={sortAscending} active>Bid: Low to High </Dropdown.Item>
                <Dropdown.Item onClick={sortDescending}>Bid: High to Low </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>



            </div>
        </div>
        )
     }
}