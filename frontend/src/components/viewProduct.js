import axios from "axios"
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useSelector } from "react-redux"
import { API_URL } from "../constants"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from "react-router-dom";
import DeleteProduct from "../partial/deleteProductModal";
import Tooltip from '@material-ui/core/Tooltip';
import {Link} from "react-router-dom";

export default function ViewPorduct(props) {
    var token = useSelector(state => state.userReducer.user.access_token);
    const history = useHistory();

    const [rows,setRows] = useState([]);
    var [product,setProduct] = useState({name:null,category:{name:null,interests:[]},price_to_buy:null,price_to_sell:null,image:null,profit_rate:0.00});
    var fetch = async function() {
        var res = await axios.get(API_URL + "/products/" + props.match.params.product_id + "?token=" + token)
        setProduct(res.data.data);
        setRows([
            {
                property:'Ürün Adı',
                value:res.data.data.name
            },
            {
                property:'Ürün Kategorisi',
                value:res.data.data.category.name
            },
            {
                property:'Satış Fiyatı',
                value:res.data.data.price_to_sell
            },
            {
                property:'Alış Fiyatı',
                value:res.data.data.price_to_buy
            },
            {
                property:'Kar Oranı (%)',
                value:res.data.data.profit_rate.toFixed(2)
            },
            {
                property:'Menşei',
                value:res.data.data.origin
            }
        ])
    }


    const deleteProduct = async function(id,toggle) {
        var res = await axios.delete(API_URL + "products/" + id,{data:{token:token}})

        if(res.status === 200)
        {
            NotificationManager.success("Ürün Başarıyla Silindi","Başarılı");
            toggle();
            history.push("/listproducts");
        }
        else
            NotificationManager.error("Bir hata oluştu","Hata");
    }

    const columns = [
        {
            name:'property',
            selector:'property',
        },
        {
            name:'value',
            selector:'value'
        }
    ]

    useEffect( () => {console.log("fetching..."); fetch()},[]);


    return(
        <div className="container-fluid">

            <div className="row justify-content-center">
                {product.image ?
                <div className="col-lg-2 my-auto">
                    <img src={product.image} alt="ürün" style={{height:"300px",width:"300px"}}/>
                </div>
                : null }
                <div className="col-lg-4" style={{marginLeft:"30px"}}>
                    <div className="shadow p-3 mt-5 bg-white rounded">
                    <div className="row justify-content-between">
                    <div className="col-3" style={{marginLeft:"10px"}}><h4>{product.name}</h4></div>
                    <div className="col-3 d-flex flex-row-reverse">
                    <Tooltip title="Sil">
                    <DeleteProduct id={product._id} delete={deleteProduct}/>
                    </Tooltip>
                    <Tooltip title="Düzenle">
                    <Link to={"/product/" + props.match.params.product_id} style={{textDecoration:"none"}}><IconButton><EditIcon style={{color:"blue"}}/></IconButton></Link>
                    </Tooltip>
                    </div>
                </div>
                <div className="mt-3">
                    <DataTable
                        columns={columns}
                        data={rows}
                        noTableHead={true}
                        />
                    </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 mx-auto mt-4">
            <TableContainer component={Paper}>
                        <Table  aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Taksit Sayısı</TableCell>
                                <TableCell align="right">Vade Farkı (%)</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {product.category.interests.map((row) => (
                                <TableRow key={row.customer}>
                                <TableCell component="th" scope="row">
                                    {row.count}
                                </TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </div>
        </div>
    )


}