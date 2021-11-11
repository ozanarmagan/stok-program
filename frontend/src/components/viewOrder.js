import { Tooltip } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";
import DeleteOrder from "../partial/deleteOrderModal";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DataTable from "react-data-table-component";
import PageviewIcon from '@material-ui/icons/Pageview';
import 'moment/locale/tr';
import moment from 'moment';
export default function ViewOrder(props)
{
    const [products,setProducts] = useState([]);
    const [customerRow,setCustomer] = useState([]);
    const token = useSelector(state => state.userReducer.user.access_token);
    const [totalPrice,setPrice] = useState(0.0);
    const [totalTax,setTax] = useState(0.0);
    const [prices,setPrices] = useState([{property:'Toplam KDV',value:0.0},{property:'Toplam Fiyat',value:0.0}]);
    const customer_columns = [
        {
            name:'property',
            selector:'property',
        },
        {
            name:'value',
            selector: 'value',
        }
    ]

    const priceTableStyle = {rows: {
            style: {
                '&:not(:last-of-type)': {
                    borderBottomStyle: 'none',
                    borderBottomWidth:'50px'
                },
            
            }
        }
    }   

    const product_columns = [
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
          selector: (row) => row.category.name,
          sortable: true,
        },
        {
            name: 'Vergi Oranı',
            selector: (row) => row.category.tax_rate,
            sortable: true,
        },
        {
            name:'Satış Fiyatı',
            selector: (row) => row.price_to_sell,
        },
        {
            name:'Miktar',
            selector: (row) => row.amount,
        },
        {
            cell: (row) => {
                return(                        
                <Tooltip title="İncele">
                <Link to={"/viewproduct/"+ row._id}>
                    <IconButton style={{color:"#1b5e20"}}>
                        <PageviewIcon />
                    </IconButton>
                </Link>
                </Tooltip>);
            }
        }];
    const price_columns = [
        {
            name:'property',
            selector:'property',
        },
        {
            name:'value',
            selector: (row) => {return(String(row.value) + ' ₺');},
            style: {
                fontSize:'20px'
            }
        }];
    useEffect(
        () => {
            axios.get(API_URL + "orders/" + props.match.params.order_id + "?token=" + token)
                .then(
                    res => {
                        console.log(res.data.data.last_change_date);
                        setProducts(res.data.data.product_details)
                        setPrices([{property:'Toplam KDV',value: res.data.data.total_tax.toFixed(2)},{property:'Toplam Fiyat',value: res.data.data.total_price.toFixed(2)}])
                        if(res.data.data.customer_type === 0)
                            axios.get(API_URL + "customer/" + res.data.data.customer_id + "?token=" + token)
                                .then(
                                    res2 => {
                                        moment.locale('tr');
                                        setCustomer([
                                            {property:'Müşteri Türü',value:'Şahıs'},
                                            {property:"Müşteri Adı",value:res2.data.data.name},
                                            {property:'TC Kimlik No',value:res2.data.data.identity_number},
                                            {property:'Telefon Numarası',value:res2.data.data.phone},
                                            {property:'GSM Numarası',value:res2.data.data.gsm},
                                            {property:'Adres',value:res2.data.data.address},
                                            {property:'Vergi No',value:res2.data.data.tax_no},
                                            {property:'Vergi Dairesi',value:res2.data.data.tax_place},
                                            {property:'Sipariş Oluşturulma Tarihi',value:moment(res.data.data.created_date).format('Do MMMM YYYY HH:mm:ss')},
                                            {property:'Sipariş Son Değiştirilme Tarihi',value:moment(res.data.data.last_change_date).format('Do MMMM YYYY HH:mm:ss')}
                                        ])
                                    }
                                ) 
                        else
                            axios.get(API_URL + "company/" + res.data.data.customer_id + "?token=" + token)
                                .then(
                                    res2 => {
                                        setCustomer([
                                            {property:'Müşteri Türü',value:'Şirket'},
                                            {property:"Şirket Adı",value:res2.data.data.name},
                                            {property:'Sahibi',value:res2.data.data.owner},
                                            {property:'Telefon Numarası',value:res2.data.data.phone},
                                            {property:'Fax',value:res2.data.data.fax},
                                            {property:'GSM Numarası',value:res2.data.data.gsm},
                                            {property:'Adres',value:res2.data.data.address.replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '')},
                                            {property:'Vergi No',value:res2.data.data.tax_no},
                                            {property:'Vergi Dairesi',value:res2.data.data.tax_place},
                                            {property:'Sipariş Oluşturulma Tarihi',value:moment(res.data.data.created_date).format('Do MMMM YYYY HH:mm:ss')},
                                            {property:'Sipariş Son Değiştirilme Tarihi',value:moment(res.data.data.last_change_date).format('Do MMMM YYYY HH:mm:ss')}
                                        ])
                                    }
                                ) 
                        
                    }
                )
        },[]);
    

    const deleteOrder = async function(id,toggle) {
            var res = await axios.delete(API_URL + "orders/" + id,{data:{token:token}})
    
            if(res.status === 200)
            {
                NotificationManager.success("Sipariş Başarıyla Silindi","Başarılı");
                toggle();
                fetch();
            }
            else
                NotificationManager.error("Bir hata oluştu","Hata");
        }

    
    return(
        <div className="container">
            <div className="shadow-lg p-3 mt-4 mb-5 bg-white rounded">
                <div className="row justify-content-between">
                    <div className="col-4 mt-2"> <h3>Sipariş</h3></div>
                
                    <div className="col-2 d-flex flex-row-reverse">
                    <Tooltip title="Sil">
                    <DeleteOrder id={props.match.params.order_id} delete={deleteOrder}/>
                    </Tooltip>
                    <Tooltip title="Düzenle">
                    <Link to={"/order/" + props.match.params.order_id} style={{textDecoration:"none"}}><IconButton><EditIcon style={{color:"blue"}}/></IconButton></Link>
                    </Tooltip>
                    </div>
                </div>
                <div className="mt-4 ml-2"> <h5>Müşteri Bilgileri</h5></div>
                <div className="row">
                    <div className="col-lg-6 mt-3">
                            <DataTable
                                columns={customer_columns}
                                data={customerRow.slice(0,6)}
                                noTableHead={true}
                            />
                    </div>
                    <div className="col-lg-6 mt-3">
                            <DataTable
                                columns={customer_columns}
                                data={customerRow.slice(6,12)}
                                noTableHead={true}
                            />
                    </div>
                </div>
                <hr/>
                <div className="col-4 mt-4"> <h5>Ürünler</h5></div>
                <DataTable
                        columns={product_columns}
                        data={products}
                    />
                <div className="col-lg-4 mt-4" style={{marginLeft:"auto"}}>
                    <DataTable
                        columns={price_columns}
                        data={prices}
                        customStyles={priceTableStyle}
                        noTableHead={true}
                        />
                </div>
            </div>
        </div>
    );
}