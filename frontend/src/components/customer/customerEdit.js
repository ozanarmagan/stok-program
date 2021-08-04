import React, { useEffect, useState} from 'react'
import { TextField, makeStyles, Container, Grid} from '@material-ui/core';
import { FormControl,Button} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { FaSave } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';




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
    const classes = useStyles();

    const handleChange = (event) => {
        props.setValue(event.target.value);
      };



      useEffect(() => {
          console.log(props.value)
      },[props.value])





    const nameChange = (event, newValue) => {
        props.setCustomer({...props.customer,name:event.target.value});
    }


    const telChange = (event, newValue) => {
        props.setCustomer({...props.customer,phone:event.target.value});
    }
    const tcChange = (event, newValue) => {
        props.setCustomer({...props.customer,identity_number:event.target.value});
    }
    const addressChange = (event, newValue) => {
        props.setCustomer({...props.customer,address:event.target.value});
    }

    const cityChange = (event, newValue) => {
        props.setCustomer({...props.customer,town:event.target.value});
    }

    const taxNoChange = (event, newValue) => {
        props.setCustomer({...props.customer,tax_no:event.target.value});
    }

    const gsmChange = (event, newValue) => {
        props.setCustomer({...props.customer,gsm:event.target.value});
    }

    const taxPlaceChange = (event, newValue) => {
        props.setCustomer({...props.customer,tax_place:event.target.value});
    }
    
    const debtChange = (event, newValue) => {
        props.setCustomer({...props.customer,debtlimit:event.target.value});
    }
    const faxChange = (event, newValue) => {
        props.setCustomer({...props.customer,fax:event.target.value});
    }

    const ownerChange = (event, newValue) => {
        props.setCustomer({...props.customer,owner:event.target.value});
    }

    const stateChange = (event, newValue) => {
        props.setCustomer({...props.customer,state:event.target.value});
    }
    const countryChange = (event, newValue) => {
        props.setCustomer({...props.customer,country:event.target.value});
    }
    const noteChange = (event, newValue) => {
        props.setCustomer({...props.customer,note:event.target.value});
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
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Müşteri Tipi</FormLabel>
                            <RadioGroup row aria-label="type" onChange={handleChange} value={props.value}>
                                <FormControlLabel value="person" control={<Radio />} label="Şahıs" />
                                <FormControlLabel value="company" control={<Radio />} label="Şirket" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="customername"
                            name="customername"
                            label="Müşteri adı"
                            defaultValue=" "
                            onChange={nameChange}
                            value={props.customer ? props.customer.name : ""}
                            InputProps={{
                                readOnly: false,
                            }}
                            fullWidth

                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField

                            onChange={telChange}
                            id="home_number"
                            // onChange={sellPriceChange}
                            name="home_number"
                            defaultValue="0"
                            type="number"
                            label="Telefon numarası"
                            // InputProps={{ 
                            //     step: "0.1",
                            //     startAdornment: <InputAdornment position="start">₺</InputAdornment>, }}
                            value={props.customer ? props.customer.phone : ""}
                            fullWidth
                        //   autoComplete="shipping address-line1"
                        />



                    </Grid>
                    { props.value === "person" ?
                    <Grid item xs={12} sm={6}>
                            <TextField


                            required
                            onChange={gsmChange}
                            id="gsm"
                            // onChange={sellPriceChange}
                            name="gsm"
                            defaultValue="0"
                            type="number"
                            label="Cep Telefonu"
                            
                            // InputProps={{ 
                            //     step: "0.1",
                            //     startAdornment: <InputAdornment position="start">₺</InputAdornment>, }}
                            fullWidth

                            value={props.customer ? props.customer.gsm : ""}
                        //   autoComplete="shipping address-line1"
                        />
                    </Grid>
                    :
                    <Grid item xs={12} sm={6}>
                        <TextField


                            required
                            onChange={ownerChange}
                            id="owner"
                            // onChange={sellPriceChange}
                            name="owner"
                            label="Sahibi"
                            defaultValue=" "
                            // InputProps={{ 
                            //     step: "0.1",
                            //     startAdornment: <InputAdornment position="start">₺</InputAdornment>, }}
                            fullWidth
                            value={props.customer ? props.customer.owner : ""}
                        //   autoComplete="shipping address-line1"
                        />

                </Grid> }

                { props.value === "person" ? 
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            onChange={tcChange}
                            id="tc_no"
                            name="tc_no"
                            label="TC numarası"
                            defaultValue="0"
                            type="number"
                            fullWidth
                            value={props.customer ? props.customer.identity_number : ""}
                        />
                    </Grid>
                     : 
                     <Grid item xs={12} sm={6}>
                     <TextField
                         required
                         onChange={faxChange}
                         id="fax"
                         name="fax"
                         label="Fax"
                         defaultValue="0"
                         type="number"
                         fullWidth
                         value={props.customer? props.customer.fax : null}
                     />
                 </Grid>}
                 <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={debtChange}
                            id="debt"
                            name="debt"
                            label="Borç Limiti"
                            defaultValue="0"
                            type="number"
                            fullWidth
                            value={props.customer ? props.customer.debtlimit : ""}
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
                            defaultValue=" "
                            label="Adres"
                            fullWidth
                            multiline
                            rows={2}
                            value={props.customer ? props.customer.address : ""}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            onChange={cityChange}
                            id="town"
                            name="town"
                            label="İlçe"
                            defaultValue=" "
                            fullWidth

                        />

                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField 
                            onChange={stateChange}
                            id="state" 
                            name="state" 
                            defaultValue=" "
                            label="İl" 
                            fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            onChange={countryChange}
                            id="country"
                            name="country"
                            defaultValue=" "
                            label="Ülke"
                            fullWidth
                            autoComplete="country-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField

                            onChange={taxNoChange}
                            id="tax_no"
                            // onChange={sellPriceChange}
                            name="tax_no"
                            defaultValue="0"
                            type="number"
                            label="Vergi No"
                            // InputProps={{ 
                            //     step: "0.1",
                            //     startAdornment: <InputAdornment position="start">₺</InputAdornment>, }}
                            fullWidth
                        //   autoComplete="shipping address-line1"
                            value={props.customer ? props.customer.tax_no : ""}
                        />



                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={taxPlaceChange}
                            id="tax_place"
                            // onChange={sellPriceChange}
                            name="tax_place"
                            label="Vergi Dairesi"
                            // InputProps={{ 
                            //     step: "0.1",
                            //     startAdornment: <InputAdornment position="start">₺</InputAdornment>, }}
                            fullWidth
                        //   autoComplete="shipping address-line1"
                            value={props.customer ? props.customer.tax_place : ""}
                        />

                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            onChange={noteChange}
                            id="note"
                            name="note"
                            defaultValue=" "
                            label="Not"
                            fullWidth
                            multiline
                            rows={2}
                            value={props.customer ? props.customer.owner : ""}

                        />
                    </Grid>

                    
                    <Grid item xs={12} sm={6} >

                    </Grid>

                    <Grid item xs={12} sm={6}></Grid>
                    <Grid item xs={12} sm={4}></Grid>
                    <Grid item xs>
                        <Button variant="contained" color="primary" onClick={props.save} startIcon={!props.newCustomer ? <FaSave></FaSave> : <GrAdd></GrAdd>}>{!props.newCustomer ? "Müşteriyi Kaydet" : "Müşteriyi Ekle"}</Button>
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

