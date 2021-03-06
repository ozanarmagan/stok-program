import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { API_URL } from "../constants";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import {Link} from "react-router-dom";
import DeleteCategory from '../partial/deleteCategoryModal';
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useHistory } from "react-router";
import EditIcon from '@material-ui/icons/Edit';
import DataTable from "react-data-table-component";
const usestyle = makeStyles( (theme => ({
    root: {
        fontFamily:"Poppins",
        fontWeight:"600"
    }
})));

const category_columns = [
    {
        name:'property',
        selector:'property',
    },
    {
        name:'value',
        selector: 'value',
        style: {
            fontSize:'17px'
        }
    }];


export default function ViewCategory(props) {
    
    const history = useHistory();

    const id = props.match.params.category_id;

    const [name,setName] = useState("");

    const [tax_rate,setTax] = useState(0);

    const [category,setCatgetory] = useState([]);

    const [interests,setInts] = useState([]);

    const [products,setPro] = useState([]);

    const token = useSelector(state => state.userReducer.user.access_token)

    const fetch = async function() {

        var res = await axios.get(API_URL + "categories/" + props.match.params.category_id + "?token=" + token);

        setName(res.data.data.name);

        setTax(res.data.data.tax_rate);

        setInts(res.data.data.interests);

        setCatgetory([{property:"Kategori Ad??",value:res.data.data.name},{property:"Vergi Oran??",value:res.data.data.tax_rate}]);

        var res2 = await axios.get(API_URL + "products?category_id=" + props.match.params.category_id +  "&token=" + token)

        setPro(res2.data.data);

    }


    const classes = usestyle();

    useEffect(() => {
        fetch();
        // eslint-disable-next-line 
    },[]);

    
    const deleteCat = async function(id,toggle) {
        var res = await axios.delete(API_URL + "categories/" + id,{data:{token:token}})

        if(res.status === 200)
        {
            NotificationManager.success("Kategori Ba??ar??yla Silindi","Ba??ar??l??");
            toggle();
            history.push("/categories");
        }
        else
            NotificationManager.error("Bir hata olu??tu","Hata");
    }




    return (
        <div className="container">
            <div className="shadow-lg p-3 mt-4 mb-5 bg-white rounded">
                <div className="row justify-content-between">
                    <div className="col-4 mt-2"> <h4>Kategori</h4></div>
                   
                    <div className="col-2 d-flex flex-row-reverse">
                    <Tooltip title="Sil">
                    <DeleteCategory id={id} delete={deleteCat}/>
                    </Tooltip>
                    <Tooltip title="D??zenle">
                    <Link to={"/editcategory/" + props.match.params.category_id} style={{textDecoration:"none"}}><IconButton><EditIcon style={{color:"blue"}}/></IconButton></Link>
                    </Tooltip>
                    </div>
                </div>
                <DataTable
                        columns={category_columns}
                        data={category}
                        noTableHead={true}
                        />

                <h5 className="mt-4">Vade Farklar??</h5>

                <TableContainer component={Paper}>
                        <Table  aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Taksit Say??s??</TableCell>
                                <TableCell align="right">Vade Fark?? (%)</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {interests.map((row) => (
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

                    <h5 className="mt-4">Bu Kategorideki ??r??nler</h5>
                    <TableContainer component={Paper} className={classes.root}>
                        <Table  aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>??r??n Ad??</TableCell>
                                <TableCell>Stok Miktar??</TableCell>
                                <TableCell>Kritik Stok</TableCell>
                                <TableCell>Barkod</TableCell>
                                <TableCell>Al???? Fiyat??</TableCell>
                                <TableCell>Sat???? Fiyat??</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {products.map((row) => (
                                <TableRow key={row.customer}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.stock}</TableCell>
                                <TableCell>{row.critical_stock}</TableCell>
                                <TableCell>{row.barcode}</TableCell>
                                <TableCell>{row.price_to_buy}</TableCell>
                                <TableCell>{row.price_to_sell}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </div>
        </div>
    )
}