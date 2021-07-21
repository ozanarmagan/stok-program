import React, { useState, useEffect, useMemo } from 'react'
import { TextField, makeStyles, Container, Grid, Box, Paper, CircularProgress, Typography, ButtonBase } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { API_URL } from '../constants';
import { FormControl, InputLabel, Input, ButtonGroup, Button, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { useSelector } from "react-redux";
import Select from '@material-ui/core/Select';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import {NotificationManager} from 'react-notifications';
import { v4 as uuidv4 } from 'uuid';
//


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
    },
    layoutSearch: {
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


function ProductPage(props) {
    const token = useSelector(state => state.userReducer.user.access_token);
    const [barcode, setBarcode] = useState(0);
    const classes = useStyles();
    const [placeHolder, setPlaceHolder] = useState();
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [fcount,setF] = useState(0);
    const [options, setOptions] = useState([]);
    const [isEditing,setEdit] = useState(false);
    const loading = open && options.length === 0;
    const [imglink,setImg] = useState(null);
    useMemo(() => {
        const getProducts = async () => {
            axios.get(API_URL + "products", { params: { token: token } }).then((result) => {
                setProducts(result.data.data);
            })
        }
        getProducts();
    }, [])
    useMemo(() => {
        const getCategories = async () => {
            axios.get(API_URL + "categories", { params: { token: token } }).then((result) => {
                console.log("memo", result);
                setCategories(result.data.data);
            })
        }

        getCategories();
    }, [])
    useEffect(() => {

        const getProducts = async () => {
            axios.get(API_URL + "products", { params: { token: token } }).then((result) => {
                setProducts(result.data.data);


                setOptions(result.data.data.map((option) => {
                    const firstLetter = option.category.name;
                    return {
                        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                        ...option,
                    }
                }))


            })
        }

        getProducts();

    }, [])

    useEffect(() => {
        if (barcode === "") { setProduct({}); setImg(null);}

    }, [barcode])


    useEffect(() => {
        var p_sell = product.price_to_sell ? product.price_to_sell : 0;
        var p_buy = product.price_to_buy ? product.price_to_buy : 0;

        var p_rate = p_buy === 0 ? (p_sell === 0 ?  0 : 100) : (p_sell - p_buy) / p_buy * 100;

        console.log(p_buy,p_sell);

        setProduct({...product,profit_rate:p_rate.toFixed(2)});
    },[fcount]);

    useEffect(() => {

        const getCategories = async () => {
            axios.get(API_URL + "categories", { params: { token: token } }).then((result) => {
                setCategories(result.data.data);
            })
        }

        getCategories();
    }, [])

    const readBarcode = (event) => {
        setBarcode(event.target.value)
    };

    const categoryChange = (event) => {
        setProduct({ ...product, category: event.target.value });
    };

    const nameChange = (event, newValue) => {
        setProduct({ ...product, name: event.target.value });
    }
    const barcodeChange = (event, newValue) => {
        setProduct({ ...product, barcode: event.target.value });
    }
    const sellPriceChange = (event, newValue) => {
        setProduct({ ...product, price_to_sell: event.target.value === "" ? 0 : parseInt(event.target.value) });
        setF(fcount + 1);
    }
    const buyPriceChange = (event, newValue) => {
        setProduct({ ...product, price_to_buy: event.target.value === "" ? 0 : parseInt(event.target.value) });
        setF(fcount + 1);
    }
    const stockChange = (event, newValue) => {
        setProduct({ ...product, stock: event.target.value });
    }
    const criticalStockChange = (event, newValue) => {
        setProduct({ ...product, critical_stock: event.target.value });
    }
    const originChange = (event, newValue) => {
        setProduct({ ...product, origin: event.target.value });
    }
    const unitChange = (event, newValue) => {
        setProduct({ ...product, unit: event.target.value });
    }
    const countryChange = (event, newValue) => {
        setProduct({ ...product, countryChange: event.target.value });
    }

    const save = async (event, newValue) => {
        if(!product.barcode)
            NotificationManager.error("Lütfen Ürün Barkodunu Girin","Hata");
        if(!product.name)
            NotificationManager.error("Lütfen Ürün Adını Girin","Hata");
        if(!product.price_to_sell)
            NotificationManager.error("Lütfen Ürün Satış Fiyatını Girin","Hata");
        if(!product.price_to_buy)
            NotificationManager.error("Lütfen Ürün Alış Fiyatını Girin","Hata");
        if(!product.stock)
            NotificationManager.error("Lütfen Ürün Stoğunu Girin","Hata");
        if(!product.critical_stock)
            NotificationManager.error("Lütfen Ürün Kritik Stoğunu Girin","Hata");
        if(!product.catgegory)
            NotificationManager.error("Lütfen Ürün Kategorisini Girin","Hata");


        let form = new FormData();
        form.append("name",product.name);
        if(!isEditing)
            form.append("category_id",categories[product.category]._id);
        else
            form.append("category_id",product.category._id);
        form.append("price_to_buy",product.price_to_buy)
        form.append("price_to_sell",product.price_to_sell)
        form.append("profit_rate",product.profit_rate);
        form.append("barcode",product.barcode);
        form.append("unit",product.unit)
        if(product.origin)
            form.append("origin",product.origin.name)
        form.append("stock",product.stock);
        form.append("critical_stock",product.critical_stock);
        if(product.image) {
            var imgname = uuidv4() + "." +  product.image.name.split('.').pop();;
            form.append("file",product.image,imgname);
        }
        form.append("token",token);
        if(!isEditing)
            var res = await axios.post(API_URL + "products",form,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
        else
            res = await axios.put(API_URL + "products/" + product._id,form,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

        if(res.data.status === 200)
            NotificationManager.success("Ürün Başarıyla Oluşturuldu","Başarılı");
        else
            NotificationManager.error("Bir hata oluştu","Hata");
    }

    const imageUpload = (event) => {
        setProduct({...product,image:event.target.files[0]});
        setImg(URL.createObjectURL(event.target.files[0]));
    }

    return (
        <div >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                marginTop="15px"
            >
                <Container className={classes.layoutSearch}>
                    {/* <FormControl >
                <InputLabel htmlFor="product_barcode_label">Barkod</InputLabel>
                <Input id="product_barcode" aria-describedby="product_barcode" />
            </FormControl> */}
                    <Autocomplete
                        id="grouped-demo"
                        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                        groupBy={(option) => option.firstLetter}
                        getOptionLabel={(option) => option.barcode.toString()}
                        getOptionSelected={(option, value) => option.barcode === value.barcode}
                        onChange={async (e, newValue) => { setBarcode(e.target.value); newValue === null ? setEdit(false) : setEdit(true); setProduct(newValue); newValue !== null ?  setImg(newValue.image) : setImg(null) }}
                        renderOption={(option) => (
                            <React.Fragment>
                                <span style={{ padding: "1px" }}>{option ? option.barcode : 0}-</span>
                                {option.name}
                            </React.Fragment>
                        )}
                        renderInput={
                            (params) => 
                            <TextField
                             {...params} 
                             label="Ürün Barkodu" 
                             variant="outlined" 
                             onChange={readBarcode}
                             />}
                    />
                </Container>

            </Box>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
            // minHeight="200px"
            // Width="333px"
            >
                <Container className={classes.layout}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <hr></hr>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {imglink ? <div>Ürünün Görseli <img src={imglink} style={{width:"100px",height:"100px",marginLeft:"50px"}} alt="Ürün Görseli"/><Button color="primary" variant="contained" style={{marginLeft:"20px"}} onClick={() => {setProduct({...product,image:null});setImg(null);}}>Görseli Sil</Button> <br/>Görseli Değiştir</div>  : <div>Görsel Ekle</div> }
                            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={imageUpload}/>
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
                                defaultValue="Ürün adı"
                                onChange={nameChange}
                                value={product ? product.name : ""}
                                InputProps={{
                                    readOnly: false,
                                }}
                                fullWidth
                            //   autoComplete="given-name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="barcode"
                                name="barcode"
                                onChange={barcodeChange}
                                label="Ürün barkodu"
                                defaultValue="0"
                                value={product ? product.barcode : 0}
                                fullWidth
                            //   autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="price_to_sell"
                                onChange={sellPriceChange}
                                name="price_to_sell"
                                defaultValue="0"
                                label="Satış fiyatı"
                                value={product ? product.price_to_sell : 0}
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
                                onChange={buyPriceChange}
                                value={product ? product.price_to_buy : 0}
                                fullWidth
                            //   autoComplete="shipping address-line2"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="profit_rate"
                                name="profit_rate"
                                label="Kar Oranı (%)"
                                defaultValue={0}
                                fullWidth
                                InputProps={{ readOnly: true, }}
                                value={product ? product.profit_rate : 0}
                            //   autoComplete="shipping address-level2"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="stock"
                                name="stock"
                                label="Stok"
                                defaultValue="0"
                                onChange={stockChange}
                                value={product ? product.stock : 0}
                                fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="critical_stock"
                                name="critical_stock"
                                label="Kritik stok"
                                defaultValue="0"
                                onChange={criticalStockChange}
                                value={product ? product.critical_stock : 0}
                                fullWidth
                            //   autoComplete="shipping postal-code"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            {/* <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={product ? product.category : "None"}
                                defaultValue = ""
                                onChange={categoryChange}
                                fullWidth
                            >
                                {categories? categories.map((category,index) => {
                                    <MenuItem value={index *10}>{category.name}</MenuItem>
                                }):<MenuItem value={10}>Loading</MenuItem>}


                            </Select> */}

                            <Autocomplete
                                id="combo-box-demo"
                                options={categories}
                                onChange={categoryChange}
                                value={product ? product.category : null}
                                defaultValue={{name:"Lütfen Kategori Seçiniz",value:null}}
                                getOptionLabel={(option) => option.name}
                                getOptionSelected={(option, value) => option.name === value.name}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Kategori" variant="outlined" />}
                            />


                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <Autocomplete
                                id="combo-box-demo"
                                options={countries}
                                onChange={countryChange}
                                value={product ? product.origin : 0}
                                defaultValue={{name:"Türkiye",code:"TR"}}
                                getOptionLabel={(option) => option.name}
                                getOptionSelected={(option, value) => option.name === value.name}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Kategori" variant="outlined" />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <Autocomplete
                                id="combo-box-demo"
                                options={units}
                                onChange={unitChange}
                                defaultValue={"Adet"}
                                getOptionLabel={(option) => option}
                                getOptionSelected={(option, value) => option === value}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Birim" variant="outlined" />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >


                            <TextField
                                id="datetime-local"
                                fullWidth
                                label="Oluşturulma tarihi"
                                
                                defaultValue="g.a.y s.d"
                                value={product ? (new Date(product.created_date)).toLocaleDateString('tr-TR',date_optinus): "None"}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{ readOnly: true }}
                                disabled={true}
                            />


                        </Grid>
                        <Grid item xs={12} sm={6} >


                            <TextField
                                id="datetime-local"
                                fullWidth
                                label="Son değiştirilme tarihi"
                                // type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                className={classes.textField}
                                value={product ? (new Date(product.last_change_date)).toLocaleDateString('tr-TR',date_optinus) : "None"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{ readOnly: true }}
                                disabled={true}
                            />


                        </Grid>
                        <Grid item xs={4}  sm={5}/>
                        <Grid item xs={4}  sm={3}>
                                <Button variant="contained" color="primary" style={{padding:"10px", margin:"10px" }} onClick={save}>{isEditing ? "Ürünü Düzenle" : "Ürünü Ekle"}</Button>
                                <Button variant="contained" color="secondary" style={{padding:"10px" , marign:"10px"}}>Ürünü Sil</Button>

                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}

export default ProductPage


const countries = [
    { code: 'TR', name: 'Türkiye' },
    {  code: 'NAN', name:'Diğer'}
]

const units = [
    "Adet","Gram","Kilogram","12'li","16'li","20'li","24'lü","Litre","Metre","Metrekare","Paket"
]

const date_optinus = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' ,hour:"numeric",minute:"numeric"}