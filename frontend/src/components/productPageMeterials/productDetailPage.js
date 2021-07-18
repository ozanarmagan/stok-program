
import React, { useState , useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Container, InputLabel, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(1600 + theme.spacing(2) * 2)]: {
            width: 1600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }
}));


function ProductDetailPage(props) {

    const [product, setProduct] = useState({})

    useEffect(()=>{
        setProduct({ ...product,profit_rate:(product.price_to_sell/product.price_to_buy)*100})
    },[product.price_to_sell,product.price_to_buy])
    
    const categoryChange = (event) => {
        setProduct({ ...product, category: event.target.value });
    };

    
    const classes = useStyles();
    return (
        <Container className={classes.layout}>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <hr></hr>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="productname"
                        name="productname"
                        label="Ürün adı"
                        value={product.name?product.name:""}
                        fullWidth
                    //   autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="barcode"
                        name="barcode"
                        label="Ürün barkodu"
                        value={product.barcode?product.barcode:0}
                        fullWidth
                    //   autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        id="price_to_sell"
                        name="price_to_sell"
                        label="Satış fiyatı"
                        value={product.price_to_sell?product.price_to_sell:0}
                        fullWidth
                    //   autoComplete="shipping address-line1"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        id="price_to_buy"
                        name="price_to_buy"
                        label="Alış fiyatı"
                        defaultValue="0"
                        value={product.price_to_buy?product.price_to_buy:0}
                        fullWidth
                    //   autoComplete="shipping address-line2"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="profit_rate"
                        name="profit_rate"
                        label="Kar"
                        defaultValue={0}
                        fullWidth
                        InputProps={{ readOnly: true, }}
                        value={product.profit_rate?product.profit_rate:0}
                    //   autoComplete="shipping address-level2"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="stock"
                        name="stock"
                        label="Stok"
                        value={product.profit_rate?product.profit_rate:0}
                        fullWidth />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        id="critical_stock"
                        name="critical_stock"
                        label="Kritik stok"
                        fullWidth
                    //   autoComplete="shipping postal-code"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={product.category}
                        onChange={categoryChange}
                        fullWidth
                    >

                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel id="demo-simple-select-label">Menşei</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={product.category}
                        onChange={categoryChange}
                        fullWidth
                    >

                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="critical_stock"
                        name="critical_stock"
                        label="Birimi"
                        fullWidth
                    //   autoComplete="shipping postal-code"
                    />
                </Grid>
                <Grid item xs={12} sm={6} >


                    <TextField
                        id="datetime-local"
                        fullWidth
                        label="Oluşturulma tarihi"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{ readOnly: true }}
                    />


                </Grid>
                <Grid item xs={12} sm={6} >


                    <TextField
                        id="datetime-local"
                        fullWidth
                        label="Son değiştirilme tarihi"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{ readOnly: true }}
                    />


                </Grid>

                <Grid item xs={12}>
                    

                </Grid>
            </Grid>
        </Container>
    )
}

export default ProductDetailPage
