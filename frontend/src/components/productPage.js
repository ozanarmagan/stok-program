import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, Container, Grid, Box,Paper, CircularProgress, Typography, ButtonBase } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Axios from 'axios';
import { API_URL } from '../constants';
import store from '../redux/store';
import SearchBar from './productPageMeterials/searchBar';
import ProductDetailPage from './productPageMeterials/productDetailPage';
function ProductPage(props) {
    
    const [placeHolder, setPlaceHolder] = useState();
    const [product, setProduct] = useState();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;



    return (
        <div >
        <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            minHeight="100px"
        >
            <SearchBar/>
        
        </Box>

        <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            // minHeight="200px"
            // Width="333px"
        >
           <ProductDetailPage/>
        </Box>
        </div>
    )
}

export default ProductPage
