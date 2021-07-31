import React, { useState, useEffect, useMemo } from 'react'
import { TextField, makeStyles, Container, Grid, Box, Paper, CircularProgress, Typography, ButtonBase } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { API_URL } from '../../constants';
import { FormControl, InputLabel, Input, ButtonGroup, Button, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { useSelector } from "react-redux";
import Select from '@material-ui/core/Select';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import { NotificationManager } from 'react-notifications';
import { v4 as uuidv4 } from 'uuid';
import { FaSave } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';

import { BiBarcodeReader } from 'react-icons/bi';



const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        
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


function CustomerEdit(props) {
    const token = useSelector(state => state.userReducer.user.access_token);
    const [customer, setCustomer] = useState({})
    const [options, setOptions] = useState([]);
    const [imglink, setImg] = useState(null);
    const [imgUp, setUp] = useState(false);
    const [isEditing, setEdit] = useState(false);
    const [id, setId] = useState(0);
    const classes = useStyles();

    // useEffect(() => {

    //     const getCustomers = async () => {
    //         axios.get(API_URL + "customer", { params: { token: token } }).then((result) => {
    //             if(!result.data.data) return;
                
    //             setCustomer(result.data.data);


    //             setOptions(result.data.data.map((option) => {
    //                 const firstLetter = option.name;
    //                 return {
    //                     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    //                     ...option,
    //                 }
    //             }))


    //         })
    //     }

    //     getCustomers();

    // }, [])

    const readId = (event) => {
        setId(event.target.value)
    };

    const save = () => {

    }

    const imageUpload = (event) => {
        if (event.target.files) {
            setCustomer({ image: event.target.files[0] });
            setImg(URL.createObjectURL(event.target.files[0]));
            setUp(true);
        }
        else
            setUp(false);
    }

    const nameChange = (event, newValue) => {
        props.setCustomer({name:event.target.value});
    }

    const gsmChange = (event, newValue) => {
        props.setCustomer({gsm:event.target.value});
    }
    const telChange = (event, newValue) => {
        props.setCustomer({phone:event.target.value});
    }
    const tcChange = (event, newValue) => {
        props.setCustomer({identity_number:event.target.value});
    }
    const addressChange = (event, newValue) => {
        props.setCustomer({address:event.target.value});
    }

    const cityChange = (event, newValue) => {
        props.setCustomer({city:event.target.value});
    }
    
    const stateChange = (event, newValue) => {
        props.setCustomer({state:event.target.value});
    }
    const countryChange = (event, newValue) => {
        props.setCustomer({country:event.target.value});
    }
    const noteChange = (event, newValue) => {
        props.setCustomer({note:event.target.value});
    }
   
    return (
        <div >

            <Container className={classes.layout}>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                    {props.newCustomer?<div class="alert alert-info" role="alert">
                        Yeni müşteri oluşturmak için formu doldurunuz...
                    </div>:<React.Fragment/>}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        {imglink ?
                            <div>Müşteri Görseli
                                <img src={imglink} style={{ width: "100px", height: "100px", marginLeft: "50px" }} alt="Müşteri Görseli" />
                                <Button color="primary" variant="contained" style={{ marginLeft: "20px" }} onClick={() => { setCustomer({image: null }); setImg(null); }}>Görseli Sil</Button>
                                <br />Görseli Değiştir</div> : <div>Görsel Ekle</div>}
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={imageUpload} />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="customername"
                            name="customername"
                            label="Müşteri adı"
                            defaultValue=""
                            onChange={nameChange}
                            value={customer ? customer.name : ""}
                            InputProps={{
                                readOnly: false,
                            }}
                            fullWidth

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField


                            required
                            onChange={gsmChange}
                            id="phone_number"
                            // onChange={sellPriceChange}
                            name="phone_number"
                            defaultValue="0"
                            label="GSM No"
                            // InputProps={{ 
                            //     step: "0.1",
                            //     startAdornment: <InputAdornment position="start">₺</InputAdornment>, }}
                            value={0}
                            fullWidth
                        //   autoComplete="shipping address-line1"
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField

                            onChange={telChange}
                            required
                            id="home_number"
                            // onChange={sellPriceChange}
                            name="home_number"
                            defaultValue="0"
                            label="Telefon numarası"
                            // InputProps={{ 
                            //     step: "0.1",
                            //     startAdornment: <InputAdornment position="start">₺</InputAdornment>, }}
                            value={0}
                            fullWidth
                        //   autoComplete="shipping address-line1"
                        />



                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            onChange={tcChange}
                            id="tc_no"
                            name="tc_no"
                            label="TC numarası"
                            fullWidth

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {/* <TextField
                            required
                            id="city"
                            name="city"
                            label="İlçe"
                            fullWidth

                        /> */}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            onChange={addressChange}
                            id="address1"
                            name="address1"
                            label="Adres"
                            fullWidth
                            multiline
                            rows={2}


                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            onChange={cityChange}
                            id="city"
                            name="city"
                            label="İlçe"
                            fullWidth

                        />

                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField 
                            onChange={stateChange}
                            id="state" 
                            name="state" 
                            label="İl" 
                            fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            onChange={countryChange}
                            id="country"
                            name="country"
                            label="Ülke"
                            fullWidth
                            autoComplete="country-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            onChange={noteChange}
                            id="note"
                            name="note"
                            label="Not"
                            fullWidth
                            multiline
                            rows={2}


                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >


                        <TextField
                            id="datetime-local"
                            fullWidth
                            label="Oluşturulma tarihi"

                            defaultValue="g.a.y s.d"
                            value={customer ? (new Date(customer.created_date)).toLocaleDateString('tr-TR', date_optinus) : "None"}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{ readOnly: true }}
                            disabled={true}
                        />


                    </Grid>

                    <Grid item xs={12} sm={6}></Grid>
                    <Grid item xs={12} sm={4}></Grid>
                    <Grid item xs>
                        <Button variant="contained" color="primary" onClick={props.save} startIcon={!props.newCustomer ? <FaSave></FaSave> : <GrAdd></GrAdd>}>{isEditing ? "Müşteriyi Kaydet" : "Müşteriyi Ekle"}</Button>
                    </Grid>
                    <Grid item xs>

                        <Button variant="contained" color="secondary" startIcon={<AiFillDelete></AiFillDelete>} >Müşteriyi Sil</Button>

                    </Grid>
                    <Grid item xs={12} sm={4}></Grid>
                </Grid>
            </Container>

        </div>
    )
}

export default CustomerEdit


const countries = [
    { code: 'TR', name: 'Türkiye' },
    { code: 'NAN', name: 'Diğer' }
]


const date_optinus = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric" }