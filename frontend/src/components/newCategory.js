import { useState } from "react";
import { Button, FormGroup, Label,Input } from "reactstrap";
import {NotificationManager} from "react-notifications";


export default function NewCategory(props) {
    const [name,setName] = useState("");
    const [tax_rate,setTax] = useState(0);
    const [interests,setInts] = useState([]);

    const [interests_m,setIntsm] = useState("");
    const [interests_a,setIntsa] = useState("");


    const onChangeName = (event) => setName(event.target.value);

    const onChangeTax = (event) => setTax(event.target.value);

    const addInt = (event) => {
                        event.preventDefault();
                        if(parseInt(interests_m) > 0 && parseInt(interests_a) > 0) 
                            setInts([...interests,{count:interests_m,amount:interests_a}]);
                          else
                            NotificationManager.error("Eksik Giriş Yaptınız","Hata");
                        }


    return( 
        <div className="container-fluid">
            <div className="row justify-content-evenly">
                <div class="card shadow mt-2 mb-4 mr-2 col-lg-5" style={{fontSize:"18px",paddingLeft:"0",paddingRight:"0"}}>
                    <div className="card-header bg-info text-white">
                        Genel Bilgiler
                    </div>
                    <div className="card-body">
                        <FormGroup className="col-lg-8 mb-2">
                            <Label for="name" style={{fontWeight:"500",marginLeft:"15px"}}>Kategori Adı</Label>
                            <Input id="name" className="form-control" placeholder="Kategori Adı" value={name} onChange={onChangeName}/>
                        </FormGroup>

                        <FormGroup className="col-lg-8">
                            <Label for="tax" style={{fontWeight:"500",marginLeft:"15px"}}>Vergi Oranı</Label>
                            <Input id="tax" value={tax_rate} onChange={onChangeTax} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} className="form-control" placeholder="Vergi Oranı"/>
                        </FormGroup>
                    </div>
                </div>

                <div class="card shadow mt-2 mb-4 mr-2 col-lg-5" style={{fontSize:"18px",paddingLeft:"0",paddingRight:"0"}}>
                    <div className="card-header bg-secondary text-white">
                        Vade Farkları
                    </div>
                    <div className="card-body">
                    </div>
                </div>
            </div>
        </div>
    )
}