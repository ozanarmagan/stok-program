import React, { useState, useEffect, useMemo } from 'react'
import { TextField, makeStyles, Container, Grid, Box, Paper, CircularProgress, Typography, ButtonBase, InputAdornment } from '@material-ui/core';
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
import {FaSave} from 'react-icons/fa';
import {GrAdd} from 'react-icons/gr';
import {AiFillDelete} from 'react-icons/ai';

import {BiBarcodeReader} from 'react-icons/bi';

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
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        alignItems:"center" ,
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
    const [defaultVal,setDefault] = useState(null);
    const [options, setOptions] = useState([]);
    const [isEditing,setEdit] = useState(false);
    const [profit,setProfit] = useState(0);
    const [profitController, setProfitController] = useState(false)
    const loading = open && options.length === 0;
    const barcodeInputRef = React.createRef();

    const [imglink,setImg] = useState(null);
    const [imgUp,setUp] = useState(false);
    useMemo(() => {
        const getProducts = async () => {
            axios.get(API_URL + "products", { params: { token: token } }).then((result) => {
                setProducts(result.data.data);
                // console.log(result.data.data);
            })
        }
        getProducts();
    }, [])
    useMemo(() => {
        const getCategories = async () => {
            axios.get(API_URL + "categories", { params: { token: token } }).then((result) => {
                // console.log("memo", result);
                setCategories(result.data.data);
            })
        }

        getCategories();
    }, [])


    useEffect(() => {
        if(props.match.params.product_id)
            axios.get(API_URL + "products/" + props.match.params.product_id + "?token=" + token)
                .then(
                    res => {
                        if(res.data.status === 200)
                        {
                            setProduct(res.data.data);
                            setEdit(true)
                            setImg(res.data.data.image)
                        }
                    }
                )
    },[]);

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
        // if (!profit) return;
        if (product.price_to_buy){
            var price_to_sell =( parseFloat(product.price_to_buy) / 100 * profit) + parseFloat(product.price_to_buy) ;
            // console.log("seel",price_to_sell);
            setProduct({...product,price_to_sell:price_to_sell?price_to_sell.toFixed(2):0.0,profit_rate:profit});

        }
        // else if (product.price_to_sell) {
        //     var price_to_buy = Math.abs((parseFloat(product.price_to_sell) / 100 * profit) - parseFloat(product.price_to_sell));
        //     console.log("buy",price_to_buy);
        //     setProduct({...product,price_to_buy:price_to_buy?price_to_buy.toFixed(2):0.0,profit_rate:profit});
        // }
        else if (!product.price_to_buy && profit){
            NotificationManager.error("Alış fiyatı giriniz.","Hata");
        }
        
    }, [profit])

    useEffect(() => {
        var p_sell = product.price_to_sell ? product.price_to_sell : 0;
        var p_buy = product.price_to_buy ? product.price_to_buy : 0;

        var p_rate = p_buy === 0 ? (p_sell === 0 ?  0 : 100) : (p_sell - p_buy) / p_buy * 100;

        // console.log(p_buy,p_sell);

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

    const categoryChange = (event,newValue) => {
        console.log("new Cat",newValue);
        setProduct({ ...product, category: newValue });
    };

    const nameChange = (event, newValue) => {
        setProduct({ ...product, name: event.target.value });
    }
    const barcodeChange = (event, newValue) => {
        setProduct({ ...product, barcode: event.target.value });
    }
    const sellPriceChange = (event, newValue) => {
        setProduct({ ...product, price_to_sell: event.target.value === "" ? 0.0 : parseFloat(event.target.value) });
        setF(fcount + 1);
    }
    const buyPriceChange = (event, newValue) => {
        setProduct({ ...product, price_to_buy: event.target.value === "" ? 0.0 : parseFloat(event.target.value) });
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
        
        setProduct({ ...product, unit: newValue });
    }
    const countryChange = (event, newValue) => {
        setProduct({ ...product, countryChange: newValue});
    }
    const profitChange = (event, newValue) => {
        var profit = event.target.value?parseFloat(event.target.value):0.0;
        setProfit(profit);
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
        if(!product.category)
            NotificationManager.error("Lütfen Ürün Kategorisini Girin","Hata");


        let form = new FormData();
        form.append("name",product.name);
        form.append("category_id",product.category._id);
        form.append("price_to_buy",product.price_to_buy)
        form.append("price_to_sell",product.price_to_sell)
        form.append("profit_rate",product.profit_rate);
        form.append("barcode",product.barcode);
        form.append("unit",product.unit);
        form.append("origin",product.origin?product.origin:"Diğer");
        form.append("stock",product.stock);
        form.append("critical_stock",product.critical_stock);
        if(product.image && imgUp) {
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

    const createNewBarcode = (event) => {
        // console.log(event);

        setProducts([...products,{barcode:barcode,name:"No",category:"No"}]);
        // console.log(products);
    }

    const imageUpload = (event) => {
        if(event.target.files)
        {
            setProduct({...product,image:event.target.files[0]});
            setImg(URL.createObjectURL(event.target.files[0]));
            setUp(true);
        }
        else
            setUp(false);
    }

    const findFreeBarcode =  () => {
        var array = [];

        products.map((product) => {
            array.push(parseInt(product.barcode))
        })
        
        var e;
        do
        {
            e = Math.random() * 999999999999; // n + 1
        } while (array.includes(e));
        e = parseInt(e);
        console.log(`/products/${e}`);
        // const getProduct = async () => {
        axios.get(`${API_URL}products/${e}`, { params: { token: token } }).then((result) => {
            console.log("ress",result);
           
        })
        
         NotificationManager.info(`${e} nolu barkod sistemde bulunamadı`);
            
        // }

        // await getProduct();

        
        // return e;
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
                    <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch" >
                        <Grid item xs={12} sm={9}>
                            
                            
                            <Autocomplete
                                id="grouped-demo"
                                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                groupBy={(option) => option.firstLetter}
                                getOptionLabel={(option) => option?option.barcode.toString():"0"}
                                getOptionSelected={(option, value) => option.barcode === value.barcode}
                                
                                
                                onChange={async (e, newValue) => { 
                                    setBarcode(e.target.value); 
                                    newValue === null ? setEdit(false) : setEdit(true); 
                                    setProduct(newValue); 
                                    newValue !== null ?  setImg(newValue.image) : setImg(null) 
                                    // console.log(newValue);
                                }}
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
                                ref={barcodeInputRef}
                                
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Button variant="contained" color="default" startIcon={<BiBarcodeReader></BiBarcodeReader>} onClick= {findFreeBarcode}>
                                Boş Barkod Üret
                            </Button>
                        </Grid>
                    </Grid>
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
                                type="number"
                                required
                                id="price_to_sell"
                                onChange={sellPriceChange}
                                name="price_to_sell"
                                defaultValue="0"
                                label="Satış fiyatı"
                                InputProps={{ 
                                    step: "0.1",
                                    startAdornment: <InputAdornment position="start">₺</InputAdornment>, }}
                                value={product ? product.price_to_sell : 0}
                                fullWidth
                            //   autoComplete="shipping address-line1"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                type="number"
                                required
                                id="price_to_buy"
                                name="price_to_buy"
                                label="Alış fiyatı"
                                defaultValue="0"
                                onChange={buyPriceChange}
                                InputProps={{ 
                                    step: "0.1",
                                    startAdornment: <InputAdornment position="start">₺</InputAdornment>, }}
                                value={product ? product.price_to_buy : 0}
                                fullWidth
                            //   autoComplete="shipping address-line2"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                type="number"
                                id="profit_rate"
                                name="profit_rate"
                                label="Kar Oranı "
                                onChange={profitChange}
                                defaultValue={0}
                                fullWidth
                                InputProps={{ 
                                    // readOnly:product?false:true,
                                    step: "0.1",
                                    startAdornment: <InputAdornment position="start">%</InputAdornment>, }}
                                value={product ? product.profit_rate : 0}
                            //   autoComplete="shipping address-level2"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="stock"
                                name="stock"
                                type="number"
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
                                type="number"
                                name="critical_stock"
                                label="Kritik stok"
                                defaultValue="0"
                                onChange={criticalStockChange}
                                value={product ? product.critical_stock : 0}
                                fullWidth
                            
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            

                            <Autocomplete
                                id="combo-box-demo"
                                options={categories}
                                onChange={categoryChange}
                                value={{name:product ? product.category?product.category.name:null : null}}
                                defaultValue={"Lütfen Kategori Seçiniz"}
                                getOptionLabel={(option) => {
                                    // console.log(option);
                                    return option.name ?  option.name  :"";
                                }}
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
                                defaultValue={{name:"Türkiye",code:"TR"}.name}
                                getOptionLabel={(option) => option.name ?  option.name  :""}
                                getOptionSelected={(option, value) => option.name === value.name}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Menşei" variant="outlined" />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                    id="combo-box-demo"
                                    options={units}
                                    onChange={unitChange}
                                    defaultValue={"Adet"}
                                    value={product ? product.unit  : "Adet"}
                                    getOptionLabel={(option) => option?option:""}
                                    getOptionSelected={(option, value) => option === value}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Birim" variant="outlined" />}
                                />
                        </Grid>
                        <Grid item xs={12} sm={6} >


                            <TextField
                                id="created-datetime-local"
                                fullWidth
                                label="Oluşturulma tarihi"
                                value={product ? (new Date(product.created_date)).toLocaleDateString('tr-TR',date_optinus): ""}
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
                                id="last-datetime-local"
                                fullWidth
                                label="Son değiştirilme tarihi"
                                // type="datetime-local"
                                className={classes.textField}
                                value={product ? (new Date(product.last_change_date)).toLocaleDateString('tr-TR',date_optinus) : ""}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{ readOnly: true }}
                                disabled={true}
                            />


                        </Grid>
                        <Grid item xs={12}  sm={4}></Grid>
                        <Grid item xs={12}  sm={2}>
                            <Button variant="contained" color="primary" onClick={save} startIcon={isEditing ? <FaSave></FaSave>:<GrAdd></GrAdd> }>{isEditing ? "Ürünü Kaydet" : "Ürünü Ekle"}</Button>
                            </Grid>
                        <Grid item xs={12}  sm={2}>
                            
                            <Button variant="contained" color="secondary" startIcon={<AiFillDelete></AiFillDelete>} >Ürünü Sil</Button>

                        </Grid>
                        <Grid item xs={12}  sm={4}></Grid>        
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