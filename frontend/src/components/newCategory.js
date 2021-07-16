import { useState } from "react";
import { Button, FormGroup, Label,Input} from "reactstrap";
import {NotificationManager} from "react-notifications";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {FiDelete} from 'react-icons/fi';
import EditInterest from "../partial/editInterestModal";
import axios from "axios";
import { API_URL } from "../constants";
import { useSelector } from "react-redux";

export default function NewCategory(props) {
    const [name,setName] = useState("");
    const [tax_rate,setTax] = useState(0);
    const [interests,setInts] = useState([]);
    const token = useSelector(state => state.userReducer.user.access_token);
    const [interests_m,setIntsm] = useState(null);
    const [interests_a,setIntsa] = useState(null);

    const addInterest = () => {
        if(interests_m >= 0 && interests_a >=0 && !interests.some(element => element.count === interests_m))
        {
            var n = [...interests,{count:interests_m,amount:interests_a}];
            setInts(n);
            setIntsa("");
            setIntsm("");
        }
        else
            NotificationManager.error("Hatalı Giriş Yaptınız","Hata");

    }

    const onChangeName = (event) => setName(event.target.value);

    const onChangeTax = (event) => setTax(event.target.value);

    const onChangeIm = (event) => setIntsm(event.target.value);

    const deleteIm = (index) => setInts(interests.filter(element => element !== interests[index]));

    const onChangeIa = (event) => setIntsa(event.target.value);

    const onEdit = (i_m,i_a,index,toggle) => {
        var i_q = interests.filter(element => element !== interests[index]);
        
        if(i_m >= 0 && i_a >=0 && !i_q.some(element => element.count === i_m))
        {
            let i_q = interests.map((element,index_) => {
                if(index === index_)
                {
                    return {count:i_m,amount:i_a};
                }
                return element;
            });
            setInts(i_q);
            setIntsa("");
            setIntsm("");
            toggle();
        }
        else
            NotificationManager.error("Hatalı Giriş Yaptınız","Hata")
    }


    const addCat = async () => {
        if(interests.length <= 0)
        {
            NotificationManager.error("Lütfen vade farkı ekleyin","Hata");
            return;
        } 
        if(name === "")
        {
            NotificationManager.error("Lütfen kategori ismini girin","Hata");
            return;
        }
        if(tax_rate < 0)
        {
            NotificationManager.error("Lütfen geçerli bir vergi oranı girin","Hata");
            return;
        }

        var res = await axios.post(API_URL + "categories",{token:token,name:name,tax_rate:parseInt(tax_rate),interests:interests});
        if(res.data.status === 200)
            NotificationManager.success("Kategori Başarıyla Eklendi","Başarılı");

        console.log(res);
    }


    return( 
        <div className="container-fluid">
            <div className="row justify-content-between">
                <div className="col-4 mt-4"><h5>Kategori Ekle</h5></div>
                    
                    <div className="col-4 d-flex flex-row-reverse mt-4">
                    <Button color="primary" onClick={addCat} style={{float:"left",fontSize:"15px"}}>Kategoriyi Ekle</Button>
                    </div>  
                </div>
            <div className="row justify-content-evenly">
                <div class="card shadow mt-2 mb-4 mr-2 col-lg-4" style={{paddingLeft:"0",paddingRight:"0"}}>
                    <div className="card-header bg-info text-white">
                        Genel Bilgiler
                    </div>
                    <div className="card-body">
                        <FormGroup className="col-lg-8 mb-4">
                            <Label for="name" style={{fontWeight:"300",marginLeft:"10px"}}>Kategori Adı</Label>
                            <Input id="name" className="form-control" placeholder="Kategori Adı" value={name} onChange={onChangeName}/>
                        </FormGroup>

                        <FormGroup className="col-lg-8">
                            <Label for="tax" style={{fontWeight:"300",marginLeft:"10px"}}>Vergi Oranı</Label>
                            <Input id="tax" value={tax_rate} onChange={onChangeTax} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} className="form-control" placeholder="Vergi Oranı"/>
                        </FormGroup>
                    </div>
                </div>

                <div class="card shadow mt-2 mb-4 mr-2 col-lg-4" style={{paddingLeft:"0",paddingRight:"0"}}>
                    <div className="card-header bg-secondary text-white">
                        Vade Farkı Ekle
                    </div>
                    <div className="card-body">
                        <FormGroup className="col-lg-8 mb-2">
                            <Label for="im" style={{fontWeight:"300",marginLeft:"10px"}}>Taksit Sayısı</Label>
                            <Input id="im" className="form-control" placeholder="Taksit Sayısı" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}  value={interests_m} onChange={onChangeIm}/>
                        </FormGroup>

                        <FormGroup className="col-lg-8 mb-4">
                            <Label for="ia" style={{fontWeight:"300",marginLeft:"10px"}}>Vade Farkı</Label>
                            <Input id="ia"  onChange={onChangeIa} value={interests_a} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} className="form-control" placeholder="Vade Farkı"/>
                        </FormGroup>
                        <Button color="success" onClick={addInterest}>Ekle</Button> 
                    </div>
                </div>
            </div>
            <div className="row  d-flex justify-content-center">
                <div className="col-lg-8">
                    <div class="card shadow mt-2 mb-4 mr-2" style={{paddingLeft:"0",paddingRight:"0"}}>
                            <div className="card-header bg-primary text-white">
                                Vade Farkları
                            </div>
                            <div className="card-body">
                            <TableContainer component={Paper}>
                        <Table  aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Taksit Sayısı</TableCell>
                                <TableCell>Vade Farkı (%)</TableCell>
                                <TableCell align="right" width="11%">İşlem</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {interests.map((element,index) => (
                                <TableRow key={element.index}>
                                <TableCell component="th" scope="row">
                                    {element.count}
                                </TableCell>
                                <TableCell>{element.amount}</TableCell>
                                <TableCell align="right" width="11%">
                                    <div class="row" style={{width:"100px"}}>
                                    <EditInterest edit={onEdit} count={element.count} amount={element.amount} index={index}/>
                                    <div className="col-1">
                                    <Button color="danger" style={{marginLeft:"5px"}} onClick={() => deleteIm(index)}><FiDelete/></Button>
                                    </div>
                                    </div>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}