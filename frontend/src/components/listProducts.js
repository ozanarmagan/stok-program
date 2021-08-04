import IconButton from '@material-ui/core/IconButton';
import PageviewIcon from '@material-ui/icons/Pageview';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import {Link, useHistory} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Input } from 'reactstrap';
import DeleteProduct from '../partial/deleteProductModal';
import NotificationManager from "react-notifications/lib/NotificationManager";


const customstyles = {
    rows: {
        style:{
            minHeight:"80px"
        }
    }
};


  export default function ListProducts(props) {

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
          name: 'İsim',
          selector: 'name',
          sortable: true,
        },
        {
          name: 'Kategori',
          selector: 'category',
          sortable: true,
        },
        {
            cell: (row) => {
                return(
                    <div>
                        <Tooltip title="İncele">
                        <Link to={"/viewproduct/"+ row.id}>
                            <IconButton style={{color:"#1b5e20"}}>
                                <PageviewIcon />
                            </IconButton>
                        </Link>
                        </Tooltip>
                        <Tooltip title="Düzenle">
                            <Link to={"/product/"+ row.id}>
                                <IconButton color="primary">
                                    <EditIcon />
                                </IconButton>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Sil">
                            <DeleteProduct delete={deleteProduct} id={row.id}/>
                        </Tooltip>
                    </div>
                )
            }
        }
      ];


    const history = useHistory();

    const deleteProduct = async function(id,toggle) {
        var res = await axios.delete(API_URL + "products/" + id,{data:{token:token}})

        if(res.status === 200)
        {
            NotificationManager.success("Ürün Başarıyla Silindi","Başarılı");
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
            var res = await axios.get(API_URL + "products?token=" + token);
            if(res.data.status === 200)
                {
                    var r = [];
                    res.data.data.map(element => {
                        r.push({category:element.category.name,name:element.name,id:element._id,image:element.image})
                    })
                    setRows(r);
                    setItems(r);
                }
        }


        const filterChange = (event) => {
            if(event.target.value === "")
                setRows(items);
            else
                setRows(items.filter(element => element.name.toLowerCase().includes(event.target.value)))
        } 

        useEffect(() => {
            fetch();
        },[]);


        return (
            <div className="container">
                <div className="row justify-content-between">
                    <h4 className="mb-4 mt-4 col-6">Ürünler</h4>
                    <div className="col-lg-2 mb-4 mt-4"><Input className="form-control" onChange={filterChange} placeholder="Filtrele"/></div>
                    
                </div>
                <div className="card shadow">
                    <DataTable
                        columns={columns}
                        data={rows}
                        pagination
                        customStyles={customstyles}
                    />
                </div>
            </div>
        )
  }

  