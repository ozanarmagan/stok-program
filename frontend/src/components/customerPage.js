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
import { NotificationManager } from 'react-notifications';
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

    return (
        <div >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                marginTop="15px"
            >
                <Container className={classes.layoutSearch}>

                    <Autocomplete
                        id="grouped-demo"
                        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                        groupBy={(option) => option.firstLetter}
                        getOptionLabel={(option) => option ? option.barcode.toString() : "0"}
                        getOptionSelected={(option, value) => option.barcode === value.barcode}
                        // onChange={async (e, newValue) => { setBarcode(e.target.value); setProduct(newValue) }}
                        noOptionsText={
                            <Button onMouseDown={createNewBarcode}>
                                Ürün Bulununamadı Yeni Oluşturmak İçin Tıklayınız!!!
                            </Button>}
                        onChange={async (e, newValue) => { setBarcode(e.target.value); newValue === null ? setEdit(false) : setEdit(true); setProduct(newValue); newValue !== null ? setImg(newValue.image) : setImg(null) }}
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
                </Container>

            </Box>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
            
            >
                <Container className={classes.layout}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <hr></hr>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {imglink ? <div>Müşteri Görseli <img src={imglink} style={{ width: "100px", height: "100px", marginLeft: "50px" }} alt="Müşteri Görseli" /><Button color="primary" variant="contained" style={{ marginLeft: "20px" }} onClick={() => { setProduct({ ...product, image: null }); setImg(null); }}>Görseli Sil</Button> <br />Görseli Değiştir</div> : <div>Görsel Ekle</div>}
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
                                id="productname"
                                name="productname"
                                label="Müşteri adı"
                                defaultValue="Müşteri adı"
                                onChange={nameChange}
                                value={product ? product.name : ""}
                                InputProps={{
                                    readOnly: false,
                                }}
                                fullWidth
                            //   autoComplete="given-name"
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

                            <Autocomplete
                                id="combo-box-demo"
                                options={categories}
                                onChange={categoryChange}
                                value={product ? product.category : null}
                                defaultValue={{ name: "Lütfen Kategori Seçiniz", value: null }}
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
                                defaultValue={{ name: "Türkiye", code: "TR" }}
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
                                value={product ? (new Date(product.created_date)).toLocaleDateString('tr-TR', date_optinus) : "None"}
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
                                value={product ? (new Date(product.last_change_date)).toLocaleDateString('tr-TR', date_optinus) : "None"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{ readOnly: true }}
                                disabled={true}
                            />


                        </Grid>
                        <Grid item xs={4} sm={5} />
                        <Grid item xs={4} sm={3}>
                            <Button variant="contained" color="primary" style={{ padding: "10px", margin: "10px" }} onClick={save}>{isEditing ? "Ürünü Düzenle" : "Ürünü Ekle"}</Button>
                            <Button variant="contained" color="secondary" style={{ padding: "10px", marign: "10px" }}>Ürünü Sil</Button>

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
    { code: 'NAN', name: 'Diğer' }
]


const date_optinus = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric" }