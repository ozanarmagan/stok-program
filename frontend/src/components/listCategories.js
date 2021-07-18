import { DataGrid,trTR } from '@material-ui/data-grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../constants';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import PageviewIcon from '@material-ui/icons/Pageview';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteCategory from '../partial/deleteCategoryModal';
import NotificationManager from 'react-notifications/lib/NotificationManager';



export default function ListCategories(props) {




    const [categories,setCat] = useState([]);

    const token = useSelector(state => state.userReducer.user.access_token);

    const fetch = async function() {
        await axios.get(API_URL + 'categories?token=' + token)
        .then( res => {
            setCat([]);
            res.data.data.map((element) => {
                var obj = {id:element._id,name:element.name,tax_rate:element.tax_rate};
                setCat((categories) => [...categories,obj]);
               console.log(element)
               return null;
            });

        });
    }


    const deleteCat = async function(id,toggle) {
        var res = await axios.delete(API_URL + "categories/" + id,{data:{token:token}})

        if(res.status === 200)
        {
            NotificationManager.success("Kategori Başarıyla Silindi","Başarılı");
            toggle();
            fetch();
        }
        else
            NotificationManager.error("Bir hata oluştu","Hata");
    }
    

    const columns = [
        {field:'id', headerName:'ID',width:280},
        {field:'name', headerName:'Kategori İsmi',width:300},
        {field:'tax_rate', headerName:'Vergi Oranı (%)',width:400},
        {field:'button', headerName:'İşlemler',width:300,sortable:false,
        renderCell: 
            (params) => {
                return(
                <div >
                    <Tooltip title="İncele">
                    <Link to={"/category/"+ params.id}>
                        <IconButton style={{color:"#1b5e20"}}>
                            <PageviewIcon />
                        </IconButton>
                    </Link>
                    </Tooltip>
                    <Tooltip title="Düzenle">
                        <Link to={"/editcategory/"+ params.id}>
                            <IconButton color="primary">
                                <EditIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Sil">
                        <DeleteCategory delete={deleteCat} id={params.id}/>
                    </Tooltip>
                </div>);
            }
        }
    ]

    useEffect(() => {
        fetch();
        // eslint-disable-next-line 
    },[]);

    return(
        <div className="container">
            <h4 className="mb-4 mt-4">Kategoriler</h4>
            <div style={{ height: 600, width: '100%' }}>
            <DataGrid rows={categories} pageSize={5} isRowSelectable={false} localeText={trTR.components.MuiDataGrid.defaultProps.localeText}  columns={columns}/></div>
        </div>
    );
}