import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Input } from 'reactstrap';
import NotificationManager from "react-notifications/lib/NotificationManager";
import AddStock from '../partial/addStockModal';


  


  export default function Stock(props) {

    const columns = [
        {
            cell:(row) => {
                return(<img src={row.image} alt="row" style={{height:"80px",width:"80px"}} />)
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
            name: 'Stok',
            selector: 'stock',
            sortable: true,
        },
        {
            name: 'Kritik Stok',
            selector: 'c_stock',
            sortable: true,
        },
        {
            cell: (row) => {
                return(
                    <AddStock id={row.id} init={parseInt(row.stock)} image={row.image} add={add}/>
                )
            }
        }
      ];

      const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)


      const add = async (id,amount,toggle,init,image) => {
          var res = await axios.put(API_URL + "products/" + id,{token:token,image:image,stock:init + amount});
          if(res.data.status === 200)
            NotificationManager.success("Stok Başarıyla Eklendi");
          else
            NotificationManager.error("Hata oluştu");
          toggle();
          fetch();
      }

        var token = useSelector(state => state.userReducer.user.access_token)
        const [items,setItems] = useState([]);
        const [rows,setRows] = useState([]);
        var fetch = async function () {
            if(getLastItem(window.location.pathname) == 'criticalstocks')
                var res = await axios.get(API_URL + "critical_stocks?token=" + token);
            else
                res = await axios.get(API_URL + "products?token=" + token);
            if(res.data.status === 200)
                {
                    var r = [];
                    res.data.data.map(element => {
                        r.push({category:element.category.name,name:element.name,id:element._id,image:element.image,stock:element.stock,c_stock:element.critical_stock})

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
                setRows(items.filter(element => element.name.toLowerCase().includes(event.target.value)))
        } 

        useEffect(() => {
            fetch();
        },[]);


        return (
            <div className="container">
                <div className="row justify-content-between">
                    <h4 className="mb-4 mt-4 col-6">{getLastItem(window.location.pathname) == 'criticalstocks' ? "Kritik Stoktakiler" : "Stoklar"}</h4>
                    <div className="col-lg-2 mb-4 mt-4"><Input className="form-control" onChange={filterChange} placeholder="Filtrele"/></div>
                    
                </div>
                
                <DataTable
                    columns={columns}
                    data={rows}
                    pagination
                />
            </div>
        )
  }