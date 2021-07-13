import { useState } from 'react';
import {ImArrowUp2,ImArrowDown2} from 'react-icons/im';
import {FaMinus} from 'react-icons/fa';
import {Tooltip} from 'reactstrap';
import Select from 'react-select';
export default function HomePage(props) {

    const options = [
        {value:'lastmonth',label:"Son 1 Ay"},
        {value:'last3months',label:"Son 3 Ay"},
        {value:'last6months',label:"Son 6 Ay"}
    ]
    
    const [netToolTip,setNet] = useState(false);

    const [incomeToolTip,setIncome] = useState(false);

    const [outcomeToolTip,setOutcome] = useState(false);

    const [sellToolTip,setSell] = useState(false);

    const [option,setOpt] = useState(options[0]);
    
    const toggleNet = () => setNet(!netToolTip);

    const toggleIn = () => setIncome(!incomeToolTip);

    const toggleOut = () => setOutcome(!outcomeToolTip);

    const toggleSell = () => setSell(!sellToolTip);

    const onSelect = (selected) => setOpt(selected);


    return(
    <div className="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-2 mt-3">
            <Select className="col-xl-2 shadow" onChange={onSelect} defaultValue={options[0]} options={options}/>
        </div>
        <div className="row">
            <div className="col-xl-3 col-md-6 mb-4 mt-4">
                <div className="card shadow border-left-primary">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs  text-primary text-uppercase mb-1" style={{fontWeight:"800"}}>
                                    Net Kazanç</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">20000 ₺</div>
                            </div>
                            <div className="col-auto align-middle" id="net">
                                <ImArrowUp2 className="d-block" style={{color:'green',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/>
                                <span className="d-block" style={{color:'green',fontSize:"14px",fontWeight:"600"}}>%15.74</span>
                            </div>
                            <Tooltip placement="bottom" isOpen={netToolTip} target="net" toggle={toggleNet}>
                                {option.label}a Göre Karşılaştırma
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4 mt-4">
                <div className="card shadow border-left-success">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs  text-success text-uppercase mb-1" style={{fontWeight:"800"}}>
                                    Gelir</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">40000 ₺</div>
                            </div>
                            <div className="col-auto align-middle text-center" id="income">
                                <ImArrowDown2 className="d-block" style={{color:'red',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/>
                                <span className="d-block" style={{color:'red',fontSize:"14px",fontWeight:"600"}}>-%10.82</span>
                            </div>
                            <Tooltip placement="bottom" isOpen={incomeToolTip} target="income" toggle={toggleIn}>
                                {option.label}a Göre Karşılaştırma
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4 mt-4">
                <div className="card shadow border-left-danger">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs  text-danger text-uppercase mb-1" style={{fontWeight:"800"}}>
                                    Gider</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">20000 ₺</div>
                            </div>
                            <div className="col-auto align-middle text-center" id="outcome">
                                <FaMinus className="d-block" style={{color:'black',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/>
                                <span className="d-block" style={{color:'black',fontSize:"14px",fontWeight:"600"}}>%0.00</span>
                            </div>
                            <Tooltip placement="bottom" isOpen={outcomeToolTip} target="outcome" toggle={toggleOut}>
                                {option.label}a Göre Karşılaştırma
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4 mt-4">
                <div className="card shadow border-left-warning">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs  text-warning text-uppercase mb-1" style={{fontWeight:"800"}}>
                                    Satış Sayısı</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">252</div>
                            </div>
                            <div className="col-auto align-middle" id="sell">
                                <ImArrowUp2 className="d-block" style={{color:'green',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/>
                                <span className="d-block" style={{color:'green',fontSize:"14px",fontWeight:"600"}}>%22.89</span>
                            </div>
                            <Tooltip placement="bottom" isOpen={sellToolTip} target="sell" toggle={toggleSell}>
                                {option.label}a Göre Karşılaştırma
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}