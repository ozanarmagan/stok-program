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
import { FaUserEdit, FaShoppingCart } from 'react-icons/fa';
import { AiFillShopping } from 'react-icons/ai';
import { RiBillFill, RiFileUserFill, RiMoneyDollarCircleFill, RiSettings3Fill } from 'react-icons/ri';
import { FiDollarSign } from "react-icons/fi";
// import {  IoAddCircleSharp} from "react-icons/io";
import { IoAddCircleSharp } from 'react-icons/io5';
import CustomerInformation from './customer/customerInformation';

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
}));

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

    const readId = (event) => {
        setId(event.target.value)
    };

    const save = () => {

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
                    <Grid container spacing={0} >
                        <Grid item xs={12} sm={12}>
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
                                    <Tab label="Satışlar" icon={<AiFillShopping size="2em" />} {...a11yProps(5)} />
                                    <Tab label="Ayarlar" icon={<RiSettings3Fill size="2em" />} {...a11yProps(6)} />
                                    <Tab label="Düzenle" icon={<FaUserEdit size="2em" />} {...a11yProps(7)} />

                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                
                                    <CustomerInformation />
                                
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                Item Four
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                Item Five
                            </TabPanel>
                            <TabPanel value={value} index={5}>
                                Item Six
                            </TabPanel>
                            <TabPanel value={value} index={6}>

                            </TabPanel>
                            <TabPanel value={value} index={7}>
                                <CustomerEdit></CustomerEdit>
                            </TabPanel>
                        </div>

                    </Grid>
                </Container>

            </Box>
        </div>
    )
}

export default CustomerPage

