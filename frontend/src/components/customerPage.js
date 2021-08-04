import React, { useState, useEffect} from 'react'
import { TextField, makeStyles, Container, Grid, Box, Paper,Typography} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { API_URL } from '../constants';
import {Button} from '@material-ui/core';
import axios from 'axios';
import { useSelector } from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PropTypes from 'prop-types';
import CustomerEdit from './customer/customerEdit';
import { FaUserEdit, FaShoppingCart, FaFileInvoiceDollar } from 'react-icons/fa';
import { AiFillShopping } from 'react-icons/ai';
import { RiBillFill, RiFileUserFill, RiMoneyDollarCircleFill, RiSettings3Fill } from 'react-icons/ri';

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
      if(props.customer.lenght){
        setOpen(true);}
      else{
          props.setEdit(false);
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
    const [customers, setCustomers] = useState([])
    const [options, setOptions] = useState([]);
    const [isEditing, setEdit] = useState(false);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [val, setVal] = useState("person");
    const history = useHistory();
   

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {

        const getCustomers = async () => {
            var customers = [];
            var opts = [];
            axios.get(API_URL + "customer", { params: { token: token } }).then(async (result) => {
                if (!result.data.data) return;
                
                result.data.data.map(element => {
                    customers.push({...element,type:'person'});
                    return null;
                })
                setCustomers(customers);
                result.data.data.map((option) => {
                    const firstLetter = option.name[0];
                    opts.push({
                        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                        type:'person',
                        ...option,
                    });
                    return null;
                })


            })

            

            axios.get(API_URL + "company", { params: { token: token } }).then((result) => {
                if (!result.data.data) return;
                var customers_ = [];
                result.data.data.map(element => {
                    customers_.push({...element,type:'company'});
                    return null;
                })
                setCustomers([...customers,...customers_]);
                result.data.data.map((option) => {
                    const firstLetter = option.name[0];
                    opts.push({
                        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                        type:"company",
                        ...option,
                    });
                    return null
                })
                setOptions(opts);


            })
        }

        getCustomers();
        // eslint-disable-next-line
    }, [])


    useEffect( () => {
        console.log("qqwewqeqw")
    },[val]);




    const save = async () => {

        if(!customer.name)
            NotificationManager.error("Lütfen Müşteri Adını Giriniz.","Hata")

        if(!isEditing)
            var res = await axios.post(API_URL + ( customer.type === 'person' ? "customer" : "company" ),{...customer,token:token});
        else
        {
            var init = await customers.find(element => element._id === customer._id);
            console.log(customer._id,customers)
            if(init.type === val)
                res = await axios.post(API_URL + (customer.type === 'person' ? "customer/" : "company/") + customer._id,{...customer,token:token});
            else
                res = res = await axios.post(API_URL + (val === 'person' ? "customer/" : "company/"),{...customer,token:token});
        }

        if(res.data.status === 200)
        {
            if(isEditing)
            {
                NotificationManager.success("Müşteri Başarıyla Düzenlendi","Başarılı");
                init = await customers.find(element => element._id === customer._id);
                if(init.type !== val)
                    axios.delete(API_URL + (init.type === "person" ?  "customer/" : "company/") + customer._id,{data:{token:token}});
            }
            else
                NotificationManager.success("Müşteri Başarıyla Oluşturuldu","Başarılı");
            history.push("/listcustomer");
        }
        else
           {
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
                                setEdit={setEdit}
                                
                            />
                            
                        </Grid>
                        <Grid item xs={10} sm={10}>
                            <Autocomplete
                                id="grouped-demo"
                                value={customer ? customer.name : null}
                                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                groupBy={(option) => option.firstLetter}
                                getOptionLabel={(option) => option.name}
                                getOptionSelected={(option, value) => option.name === value.name}
                                fullWidth
                                noOptionsText={

                                    "Müşteri Bulununamadı"
                                }
                                onChange={async (e, newValue) => {
                                    newValue === null ? setEdit(false) : setEdit(true);
                                    setCustomer(newValue);
                                    if(newValue !== null)
                                        setVal(newValue.type)
                                }}
                                renderOption={(option) => (
                                    <React.Fragment>
                                        {option.name}
                                    </React.Fragment>
                                )}
                                renderInput={
                                    (params) =>
                                        <TextField
                                            {...params}
                                            label="Müşteri Adı"
                                            variant="outlined"
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
                                        newCustomer={!isEditing} 
                                        setCustomer={customerUpdate}
                                        customer={customer}
                                        value={val}
                                        setValue={setVal}
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

