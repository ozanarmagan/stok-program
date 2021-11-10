import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { API_URL } from "../constants"
import DataTable from 'react-data-table-component';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, Input} from "reactstrap";
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";

export default function Order(props) {

    const columns = [
        {
            cell:(row) => {
                if(row.image)
                    return(<img src={row.image} alt="row" style={{height:"90px",width:"90px"}} />)
                else
                    return null;
            },
            width:"150px"
        },
        {
          name: 'Ürün İsmi',
          selector: (row) => row.name,
          sortable: true,
        },
        {
          name: 'Kategori',
          selector: (row) => row.category,
          sortable: true,
        },
        {
            name: 'Vergi Oranı',
            selector: (row) => row.tax_rate,
            sortable: true,
        },
        {
            name:'Satış Fiyatı',
            selector: (row) => row.price_to_sell,
        },
        {
            name: 'Miktar',
            cell:(row) => {
                return(
                    <Input className="form-control" style={{width:"80px"}} value={row.amount} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} onChange={async (event) => {
                        var s = selected;
                        s.find(element => element._id === row._id).amount = event.target.value === "" ? 0 : event.target.value;
                        console.log(s);
                        setSelected([...s]);
                    }} />
                )
            }
        },
        {
            cell:(row) => {
                return (
                    <Button color="danger" onClick={() => {
                        var s = selected;
                        s.splice(s.indexOf(element => element._id === row._id),1);
                        setSelected([...s]);
                    }}>Sil</Button>
                )
            }
        }
      ];



    
    const history = useHistory();

    const [products,setProducts] = useState([]);
    const [current,setCurrent] = useState(null);
    const [current_customer,setCurrentC] = useState(null);
    const [customers,setCustomers] = useState([]);
    const [amount,setAmount] = useState(1);
    const [selected,setSelected] = useState([]);
    const [edit,setEdit] = useState(false);
    const token = useSelector(state => state.userReducer.user.access_token);
    const fetch_products = async () => {
        var res = await axios.get(API_URL + "/products?token=" + token);
        var r = [];
        res.data.data.map(element => {r.push({_id:element._id,price_to_sell:element.price_to_sell,image:element.image,name:element.name,category:element.category.name,tax_rate:element.category.tax_rate});return null;});
        setProducts(r);

        var res2 = await axios.get(API_URL + "/customer?token=" + token);
        var r2 = [];
        res2.data.data.map(element => r2.push({...element,type:'person'}));

        var res3 = await axios.get(API_URL + "/company?token=" + token);
        var r3 = [];
        res3.data.data.map(element => r3.push({...element,type:'company'}));

        setCustomers([...r2,...r3]);
    }

    useEffect( () => {
        fetch_products();
    // eslint-disable-next-line
    },[]);


    useEffect( () => {
        if(props.match.params.order_id)
        {
            axios.get(API_URL + "orders/" + props.match.params.order_id + "?token=" + token)
                .then(
                    res => {
                        if(res.data.status === 200)
                        {
                            setEdit(true);
                            res.data.data.products.map(element => {
                                axios.get(API_URL + "products/" + element.id + "?token=" + token)
                                    .then(
                                        res2 => {
                                            setSelected([...selected,{_id:res2.data.data._id,price_to_sell:res2.data.data.price_to_sell,image:res2.data.data.image,name:res2.data.data.name,category:res2.data.data.category.name,tax_rate:res2.data.data.category.tax_rate,amount:element.amount}]);
                                        }
                                    )
                            });
                            console.log("customertype",res.data.data.customer_type);
                            if(res.data.data.customer_type === 0)
                                axios.get(API_URL + "customer/" + res.data.data.customer_id + "?token=" + token)
                                    .then(
                                        res2 => {
                                            setCurrentC({...res2.data.data,type:'person'});
                                        }
                                    )
                            if(res.data.data.customer_type === 1)
                                    axios.get(API_URL + "company/" + res.data.data.customer_id + "?token=" + token)
                                        .then(
                                            res2 => {
                                                setCurrentC({...res2.data.data,type:'company'});
                                            }
                                        )

                        }
                    }
                )
        }
    // eslint-disable-next-line
    },[]);


    const changeAmount = (event) => {
        setAmount(parseInt(event.target.value === "" ? 0 : event.target.value));
    }

    const add = () => {
        console.log(current);
        setSelected([...selected,{...current,amount:amount}]);
        setAmount(1);
        setCurrent(null);
    }


    const addOrder = async () => {
        if(current_customer === null  || selected.length === 0)
            NotificationManager.error("Lütfen ürün ve müşteri ekleyin","Hata");

        var pr = [];
        selected.forEach(element => {
            pr.push({id:element._id,amount:element.amount})
        });


        if(!edit)
        {
            var res = await axios.post(API_URL + "orders", {token:token,products:pr,customer_type:current_customer.type === 'person' ?  0 : 1,customer_id:current_customer._id});

            if(res.data.status === 200)
            {
                NotificationManager.success("Sipariş Başarıyla Eklendi");
                history.push("/listorders")
            }
        }
        else
        {
            var res2 = await axios.post(API_URL + "orders/" + props.match.params.order_id, {token:token,products:pr,customer_type:current_customer.type === 'person' ?  0 : 1,customer_id:current_customer._id});

            if(res2.data.status === 200)
            {
                NotificationManager.success("Sipariş Başarıyla Düzenlendi");
                history.push("/listorders")
            }
        }
    }


    return(
        <div className="container mt-4">
            <h3>{edit ? "Sipariş Düzenle" : "Yeni Sipariş"}</h3>

            <div className="row mt-4 mb-4 justify-content-between" style={{paddingBottom:"30px"}}>
                <div className="col-lg-6">
                    <Autocomplete
                        options={customers}
                        getOptionLabel={option => option.name}
                        renderInput={(params) => <TextField {...params} label="Müşteri Seç" variant="outlined" />}
                        groupBy={option => option.name[0]}
                        getOptionSelected={(option, value) => option.name === value.name}
                        noOptionsText="Müşteri Bulunamadı"
                        value={current_customer}
                        onChange={(e,nw) => {
                            setCurrentC(nw);
                        }}
                    />
                </div>
               <div className="col-lg-1">
                   <Button color="success" onClick={addOrder} >{edit ? "Siparişi Düzenle" : "Sipariş Ekle"}</Button>
               </div>
            </div>
                <h4 style={{marginLeft:"30px"}}>Ürünler</h4>
                <div className="row mt-4 mb-4  justify-content-center">
                    <div className="col-lg-6">
                        <Autocomplete
                            options={products.filter(element => selected.every(e => e._id !== element._id))}
                            getOptionLabel={option => option.name}
                            renderInput={(params) => <TextField {...params} label="Ürün Seç" variant="outlined" />}
                            getOptionSelected={(option, value) => option.name === value.name}
                            noOptionsText="Ürün Bulunamadı"
                            value={current}
                            onChange={(e,nw) => {
                                setCurrent(nw);
                            }}
                        />
                    </div>
                    <div className="col-lg-2">
                        <TextField label="Miktar" className="form-control" value={amount} style={{marginTop:"5px"}} onChange={changeAmount} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} />
                    </div>
                    <div className="col-lg-2 mt-3">
                        <Button color="primary" onClick={add}>Ekle</Button>
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    pagination
                    data={selected}
                    noDataComponent="Lütfen Siparişe Ürün Ekleyin"
                />
        </div>
    )
}