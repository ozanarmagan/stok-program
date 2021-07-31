import React, { useState, useEffect, useMemo } from 'react'
import { TextField, makeStyles, Container, Grid, Box, Paper, CircularProgress, Typography, ButtonBase } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { API_URL } from '../constants';
import { FormControl, InputLabel, Input, ButtonGroup, Button, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { useSelector } from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import PropTypes from 'prop-types';
import CustomerEdit from './customer/customerEdit';
import { FaUserEdit, FaShoppingCart, FaFileInvoiceDollar } from 'react-icons/fa';
import { AiFillShopping } from 'react-icons/ai';
import { RiBillFill, RiFileUserFill, RiMoneyDollarCircleFill, RiSettings3Fill } from 'react-icons/ri';
import { FiDollarSign } from "react-icons/fi";
// import {  IoAddCircleSharp} from "react-icons/io";
import { IoAddCircleSharp } from 'react-icons/io5';
import CustomerInformation from './customer/customerInformation';
import CustomerSettings from './customer/customerSettings';
import CustomerSales from './customer/customerSales';
import CustomerInvoice from './customer/customerInvoice';
import CustomerOrders from './customer/customerOrders';
import CustomerBill from './customer/customerBill';
import CustomerDebt from './customer/customerDebt';
import CustomerPay from './customer/customerPay';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { NotificationManager } from 'react-notifications';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        marginTop: "10px",
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    paperModal: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
}));


function TransitionsModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
        console.log(props.customer);
      if(props.customer.lenght){
        setOpen(true);}
      else{
          props.setNewCustomer(true);
          props.setValue(8);
      }  
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button
            variant="contained" 
            color={'primary'}
            onClick={handleOpen}
        >Yeni Oluştur</Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paperModal}>
              <h2 id="transition-modal-title">Müşteri Seçili</h2>
              <p id="transition-modal-description">Bir müşteriyi düzenlediğinizi fark ettik. Değişikliklerinizin kaybolmaması için müşteriyi kaydetmeyi unutmayınız</p>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }



function CustomerPage(props) {



    const token = useSelector(state => state.userReducer.user.access_token);
    const [customer, setCustomer] = useState({})
    const [options, setOptions] = useState([]);
    const [imglink, setImg] = useState(null);
    const [imgUp, setUp] = useState(false);
    const [isEditing, setEdit] = useState(false);
    const [id, setId] = useState(0);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [newCustomer, setNewCustomer] = useState(false)
    const history = useHistory();
   

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {

        const getCustomers = async () => {
            axios.get(API_URL + "customer", { params: { token: token } }).then((result) => {
                if (!result.data.data) return;
                setCustomer(result.data.data);
                setOptions(result.data.data.map((option) => {
                    const firstLetter = option.name;
                    return {
                        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                        ...option,
                    }
                }))


            })
        }

        getCustomers();

    }, [])


   useEffect(() => {
       if(!customer.lenght){

       }
   }, [customer])

    const readId = (event) => {
        setId(event.target.value)
    };

    const save = async () => {

        if(!customer.name)
            NotificationManager.error("Lütfen Müşteri Adını Giriniz.","Hata")

        let form = new FormData();
        
        for (const [key,value] of Object.entries(customer))
        {
            // console.log(key,value);
            form.append(key.toString(),value);
        
        }
        
        if(customer.image && imgUp) {
            var imgname = uuidv4() + "." +  customer.image.name.split('.').pop();;
            form.set("file",customer.image,imgname);
        }
        else if(customer.image && !newCustomer)
            form.set("image",customer.image);
        form.append("token",token);
        // form.forEach((k,v) => {console.log(k,v);});

        if(newCustomer)
            var res = await axios.post(API_URL + "customer",form,{
                headers: {
                    'content-type': 'multipart/form-data'
                },
                params :{
                    token:token
                }
            });
        else
            res = await axios.put(API_URL + "customer/" + customer._id,form,{
                headers: {
                    'content-type': 'multipart/form-data'
                },
                params :{
                    token:token
                }
            });

        if(res.data.status === 200)
        {
            console.log(res);
            NotificationManager.success("Müşteri Başarıyla Oluşturuldu","Başarılı");
            history.push("/listcustomer");
        }
        else
           {
            console.log(res);
                NotificationManager.error("Bir hata oluştu","Hata");}


    }


    const customerUpdate = function cu (key_ )  {
        setCustomer({...customer,...key_})
        // console.log(customer);
    }



    return (
        <div >

            

            <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                marginTop="15px"

            >
                <Container style={{ maxWidth: "1450px" }}>
                    <Grid container spacing={1}
                        style={{ placeItems: "center" }}
                        alignItems="flex-start"
                        justifyContent="center"
                    >
                        <Grid item xs >
                            <TransitionsModal 
                                customer={customer} 
                                setValue={setValue} 
                                setNewCustomer={setNewCustomer}
                                
                            />
                            
                        </Grid>
                        <Grid item xs={10} sm={10}>
                            <Autocomplete
                                id="grouped-demo"
                                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                groupBy={(option) => option.firstLetter}
                                getOptionLabel={(option) => option ? option.barcode.toString() : "0"}
                                getOptionSelected={(option, value) => option.barcode === value.barcode}
                                fullWidth
                                noOptionsText={

                                    "Müşteri Bulununamadı"
                                }
                                onChange={async (e, newValue) => {
                                    setId(e.target.value);
                                    newValue === null ? setEdit(false) : setEdit(true);
                                    setCustomer(newValue);
                                    setNewCustomer(false);
                                    newValue !== null ? setImg(newValue.image) : setImg(null)
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
                                            label="Müşteri Adı"
                                            variant="outlined"
                                            onChange={readId}
                                        />}


                            />
                        </Grid>
                    </Grid>
                </Container>

            </Box>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-start"

            >
                <Container style={{ maxWidth: "1450px" }}>
                    <Grid container spacing={0}>
                        <div className={classes.root}>
                            <AppBar position="static" color="default">
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons="on"
                                    indicatorColor="primary"
                                    textColor="primary"
                                    aria-label="scrollable force tabs example"
                                >
                                    <Tab label="Genel" icon={<RiFileUserFill size="2em" style={{ opacity: 1 }} />} {...a11yProps(0)} />
                                    <Tab label="Ödeme Ekle" icon={<RiMoneyDollarCircleFill size="2em" />} {...a11yProps(1)} />
                                    <Tab label="Borç ekle" icon={<IoAddCircleSharp size="2em" />} {...a11yProps(2)} />
                                    <Tab label="Senetler" icon={<RiBillFill size="2em" />} {...a11yProps(3)} />
                                    <Tab label="Siparişler" icon={<FaShoppingCart size="2em" />} {...a11yProps(4)} />
                                    <Tab label="Faturalar" icon={<FaFileInvoiceDollar size="2em" />} {...a11yProps(5)} />
                                    <Tab label="Satışlar" icon={<AiFillShopping size="2em" />} {...a11yProps(6)} />
                                    <Tab label="Ayarlar" icon={<RiSettings3Fill size="2em" />} {...a11yProps(7)} />
                                    <Tab label="Düzenle" icon={<FaUserEdit size="2em" />} {...a11yProps(8)} />

                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                <Paper elevation={8} >
                                    <CustomerInformation />
                                </Paper>

                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Paper elevation={8} >
                                    <CustomerPay></CustomerPay>
                                </Paper>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Paper elevation={8} >
                                    <CustomerDebt></CustomerDebt>
                                </Paper>
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <Paper elevation={8} >
                                    <CustomerBill></CustomerBill>
                                </Paper>
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                <Paper elevation={8} >
                                    <CustomerOrders></CustomerOrders>
                                </Paper>
                            </TabPanel>
                            <TabPanel value={value} index={5}>
                                <Paper elevation={8} >
                                    <CustomerInvoice></CustomerInvoice>
                                </Paper>
                            </TabPanel>
                            <TabPanel value={value} index={6}>
                                <Paper elevation={8} >
                                    <CustomerSales></CustomerSales>
                                </Paper>
                            </TabPanel>
                            <TabPanel value={value} index={7}>
                                <Paper elevation={8} >
                                    <CustomerSettings></CustomerSettings>
                                </Paper>
                            </TabPanel>
                            <TabPanel value={value} index={8}>
                                <Paper elevation={8} >
                                    <CustomerEdit 
                                        newCustomer={newCustomer} 
                                        setCustomer={customerUpdate}
                                        save={save}
                                    >
                                    </CustomerEdit>
                                </Paper>
                            </TabPanel>
                        </div>

                    </Grid>
                </Container>

            </Box>
        </div>
    )
}

export default CustomerPage

