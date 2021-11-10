import IconButton from '@material-ui/core/IconButton';
import PageviewIcon from '@material-ui/icons/Pageview';
import ReceiptIcon from '@material-ui/icons/Receipt';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Input } from 'reactstrap';
import NotificationManager from "react-notifications/lib/NotificationManager";
import moment from 'moment';
import DeleteOrder from '../partial/deleteOrderModal';

const customstyles = {
    rows: {
        style:{
            minHeight:"80px"
        }
    }
};


  export default function ListOrders(props) {

    const columns = [
        {
          name: 'Müşteri',
          selector: row => row.customer.name
        },
        {
            name:'Faturalandırıldı Mı?',
            selector: row => {return row.is_sold ? 'Evet':'Hayır'}
        },
        {
            name:'Sipariş Tarihi',
            selector: row => moment(row.date).format('Do MMM YYYY HH:mm:ss')
        },
        {
            name:'Toplam Tutar',
            selector: row => {return row.total_amount + "  ₺"}
        },
        {
            cell: (row) => {
                return(
                    <div>
                        <Tooltip title="Faturalandır">
                        <Link to={"/newbill?order="+ row.id}>
                            <IconButton style={{color:"#1b5e20"}} disabled={!row.is_sold}>
                                <ReceiptIcon />
                            </IconButton>
                        </Link>
                        </Tooltip>
                        <Tooltip title="İncele">
                        <Link to={"/vieworder/"+ row.id}>
                            <IconButton style={{color:"#1b5e20"}}>
                                <PageviewIcon />
                            </IconButton>
                        </Link>
                        </Tooltip>
                        <Tooltip title="Düzenle">
                            <Link to={"/order/"+ row.id}>
                                <IconButton color="primary">
                                    <EditIcon />
                                </IconButton>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Sil">
                            <DeleteOrder delete={deleteOrder} id={row.id}/>
                        </Tooltip>
                    </div>
                )
            }
        }
      ];


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




        var token = useSelector(state => state.userReducer.user.access_token)
        const [items,setItems] = useState([]);
        const [rows,setRows] = useState([]);

        var fetch = async function () {
            var res = await axios.get(API_URL + "orders?token=" + token);
            if(res.data.status === 200)
                {
                    var r = [];
                    res.data.data.map(element => {
                        r.push({date:element.created_date,total_amount:element.total_amount,is_sold:element.is_sold,customer:element.customer,name:element.name,id:element._id})
                        return null;
                    })
                    setRows(r);
                    setItems(r);
                }
        }


        const filterChange = (event) => {
            if(event.target.value === "")
                setRows(items);
            else
                setRows(items.filter(element => element.customer.name.toLowerCase().includes(event.target.value)))
        } 

        useEffect(() => {
            fetch();
            // eslint-disable-next-line
        },[]);


        return (
            <div className="container">
                <div className="row justify-content-between">
                    <h4 className="mb-4 mt-4 col-6">Siparişler</h4>
                    <div className="col-lg-2 mb-4 mt-4"><Input className="form-control" onChange={filterChange} placeholder="Filtrele"/></div>
                    
                </div>
                <div className="card">
                    <DataTable
                        columns={columns}
                        data={rows}
                        pagination
                        customStyles={customstyles}
                        noDataComponent="Sipariş Bulunamadı"
                    />
                </div>
            </div>
        )
  }

  