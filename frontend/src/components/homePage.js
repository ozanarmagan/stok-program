import { useEffect, useState } from 'react';
import {ImArrowUp2,ImArrowDown2} from 'react-icons/im';
import {FaMinus} from 'react-icons/fa';
import {Tooltip} from 'reactstrap';
import Select from 'react-select';
import {Line} from 'react-chartjs-2';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import axios from 'axios';
import { API_URL } from '../constants/api_constant';
import { useSelector } from 'react-redux';
import tr from "moment/locale/tr";

//
function createData(customer,amount,time,type) {
    return { customer,amount,time,type };
  }
  
  const rows = [
    createData('Ubeyd Talha Alkan', 1000, 5, 'Senet'),
  ];

  moment().locale("tr",tr);

export default function HomePage(props) {

    const options = [
        {value:0,label:"Son 1 Ay"},
        {value:1,label:"Son 3 Ay"},
        {value:2,label:"Son 6 Ay"}
    ]
    
    const token = useSelector(state => state.userReducer.user.access_token)

    const [netToolTip,setNet] = useState(false);

    const [dataP,setDataP] = useState([]);

    const [netRev,setNetR] = useState(0);

    const [tPaid,setTpaid] = useState(0);

    const [tDebt,setTdebt] = useState(0);

    const [tBills,setTbills] = useState(0);


    const [pnetRev,setNetRp] = useState(0);

    const [ptPaid,setTpaidp] = useState(0);

    const [ptDebt,setTdebtp] = useState(0);

    const [ptBills,setTbillsp] = useState(0);

    const [dataO,setDataO] = useState([]);

    const [dataN,setDataN] = useState([]);

    const [label,setLabel] = useState([]);

    const [incomeToolTip,setIncome] = useState(false);

    const [outcomeToolTip,setOutcome] = useState(false);

    const [sellToolTip,setSell] = useState(false);

    const [option,setOpt] = useState(options[0]);
    
    const toggleNet = () => setNet(!netToolTip);

    const toggleIn = () => setIncome(!incomeToolTip);

    const toggleOut = () => setOutcome(!outcomeToolTip);

    const toggleSell = () => setSell(!sellToolTip);

    const fetch =  async function () {
        var labels = [];
        var date = moment().subtract(1,'month');
        var res = await axios.get(API_URL+"dashboard?token="+token+"&since="+date.format("YYYY-MM-DD") + "&range=" + option.value);
        var dataP_ = [];
        var dataO_ = [];
        var dataN_ = [];
        
        for(var i = 29;i>=0;i--)
        {
            try {
            dataP_.push(res.data.data[i].e1);
            dataO_.push(res.data.data[i].e2);
            dataN_.push(res.data.data[i].e1 - res.data.data[i].e2);
            } catch (error) {
                
            }
            
        }
        setNetR(res.data.total_paid - res.data.total_debts);
        setTpaid(res.data.total_paid);
        setTdebt(res.data.total_debts);
        setTbills(res.data.count);
        setNetRp(parseFloat(res.data.difference_net));
        setTpaidp(parseFloat(res.data.difference_paid));
        setTdebtp(parseFloat(res.data.difference_debt));
        setTbillsp(parseFloat(res.data.difference_count));
        setTpaid(res.data.total_paid);
        setTdebt(res.data.total_debts);
        setTbills(res.data.count);
        setDataP(dataP_);
        console.log(dataP_);
        setDataO(dataO_);
        setDataN(dataN_);
        var d = moment();
        for(i=0;i < 30;i++)
        {

            labels.push(d.format("Do MMM"));
            switch(option.value)
            {
                case 0:
                    d.subtract(1,'day');
                    break;
                case 1:
                    d.subtract(3,'day');
                    break;
                case 2:
                    d.subtract(6,'day');
                    break;
                default:
                    break;
            }
        }
        labels.reverse();
        setLabel(labels);
    }

    useEffect(() => {
        fetch();
        // eslint-disable-next-line 
    },[]);

    const onSelect = async (selected) => {
        if(selected === option)
            return;
        setOpt(selected);

        switch(selected.value)
        {
            case 0:
                var date = moment().subtract(1,'month');
                break;
            case 1:
                date = moment().subtract(3,'month');
                break;
            case 2:
                date = moment().subtract(6,'month');
                break;
            default:
                break;
        }
        

        var labels = [];
        var d = moment();
        for(var i=0;i < 30;i++)
        {
            labels.push(d.format("Do MMM"));
            switch(selected.value)
            {
                case 0:
                    d.subtract(1,'day');
                    break;
                case 1:
                    d.subtract(3,'day');
                    break;
                case 2:
                    d.subtract(6,'day');
                    break;
                default:
                    break;
            }
        }

        labels.reverse();
    
        setLabel(labels);

        var res = await axios.get(API_URL+"dashboard?token="+token+"&since="+date.format("YYYY-MM-DD") + "&range=" + selected.value);
        
        var dataP_ = [];
        var dataO_ = [];
        var dataN_ = [];
        for(i = 29;i>=0;i--)
        {
            dataP_.push(res.data.data[i].e1);
            dataO_.push(res.data.data[i].e2);
            dataN_.push(res.data.data[i].e1 - res.data.data[i].e2);
        }

        setDataP(dataP_);
        setNetR(res.data.total_paid - res.data.total_debts);
        setTpaid(res.data.total_paid);
        setTdebt(res.data.total_debts);
        setTbills(res.data.count);
        setNetRp(parseFloat(res.data.difference_net));
        setTpaidp(parseFloat(res.data.difference_paid));
        setTdebtp(parseFloat(res.data.difference_debt));
        setTbills(parseFloat(res.data.difference_count));
        setDataO(dataO_);
        setDataN(dataN_);
    }


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
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{netRev} ₺</div>
                            </div>
                            <div className="col-auto align-middle" id="net">
                                {pnetRev === 0 ?  <FaMinus className="d-block" style={{color:'black',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/> :  
                                (pnetRev > 0  ?  <ImArrowUp2 className="d-block" style={{color:'green',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/> : <ImArrowDown2 className="d-block" style={{color:'red',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/>)
                                }
                                <span className="d-block" style={{color:pnetRev === 0  ? 'black' : (pnetRev > 0 ? 'green' : 'red') ,fontSize:"14px",fontWeight:"600"}}>%{Math.abs(pnetRev).toFixed(2)}</span>
                            </div>
                            <Tooltip placement="bottom" isOpen={netToolTip} target="net" toggle={toggleNet}>
                                Önceki Döneme Göre Karşılaştırma
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
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{tPaid} ₺</div>
                            </div>
                            <div className="col-auto align-middle text-center" id="income">
                            {ptPaid === 0 ?  <FaMinus className="d-block" style={{color:'black',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/> :  
                                (ptPaid > 0  ?  <ImArrowUp2 className="d-block" style={{color:'green',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/> : <ImArrowDown2 className="d-block" style={{color:'red',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/>)
                                }
                                <span className="d-block" style={{color:ptPaid === 0  ? 'black' : (ptPaid > 0 ? 'green' : 'red') ,fontSize:"14px",fontWeight:"600"}}>%{Math.abs(ptPaid).toFixed(2)}</span>
                            </div>
                            <Tooltip placement="bottom" isOpen={incomeToolTip} target="income" toggle={toggleIn}>
                                Önceki Döneme Göre Karşılaştırma
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
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{tDebt} ₺</div>
                            </div>
                            <div className="col-auto align-middle text-center" id="outcome">
                            {ptDebt === 0 ?  <FaMinus className="d-block" style={{color:'black',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/> :  
                                (ptDebt > 0  ?  <ImArrowUp2 className="d-block" style={{color:'green',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/> : <ImArrowDown2 className="d-block" style={{color:'red',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/>)
                                }
                                <span className="d-block" style={{color:ptDebt === 0  ? 'black' : (ptDebt > 0 ? 'green' : 'red') ,fontSize:"14px",fontWeight:"600"}}>%{Math.abs(ptDebt).toFixed(2)}</span>
                            </div>
                            <Tooltip placement="bottom" isOpen={outcomeToolTip} target="outcome" toggle={toggleOut}>
                                Önceki Döneme Göre Karşılaştırma
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
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{tBills}</div>
                            </div>
                            <div className="col-auto align-middle" id="sell">
                            {ptBills === 0 ?  <FaMinus className="d-block" style={{color:'black',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/> :  
                                (ptBills > 0  ?  <ImArrowUp2 className="d-block" style={{color:'green',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/> : <ImArrowDown2 className="d-block" style={{color:'red',fontSize:"24px",marginLeft:"auto",marginRight:"auto"}}/>)
                                }
                                <span className="d-block" style={{color:ptBills === 0  ? 'black' : (ptBills > 0 ? 'green' : 'red') ,fontSize:"14px",fontWeight:"600"}}>%{Math.abs(ptBills).toFixed(2)}</span>
                            </div>
                            <Tooltip placement="bottom" isOpen={sellToolTip} target="sell" toggle={toggleSell}>
                                Önceki Döneme Göre Karşılaştırma
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div class="col-xl-4 col-lg-6">
                <div className="card shadow mb-4">
                    <div className="card-header">
                        <h6 className="text-success"  style={{fontWeight:"600",fontSize:"20px"}}>Gelir</h6>
                    </div>
                    <div className="card-body">
                        <Line data={ {
                                labels: label,
                                datasets: [{
                                label: "Gelir",
                                lineTension: 0.3,
                                backgroundColor: "rgba(78, 115, 223, 0.05)",
                                borderColor: "rgba(28,230,138, 1)",
                                pointRadius: 3,
                                pointBackgroundColor: "rgba(28,230,138, 1)",
                                pointBorderColor: "rgba(28,230,138, 1)",
                                pointHoverRadius: 3,
                                pointHoverBackgroundColor: "rgba(28,230,138, 1)",
                                pointHoverBorderColor: "rgba(28,230,138, 1)",
                                pointHitRadius: 10,
                                pointBorderWidth: 2,
                                data: dataP,
                                }],
                            }}
                            legend="false"
                            options={{plugins:{legend:false},animation:{duration:0}}}/>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-6">
                <div className="card shadow mb-4">
                    <div className="card-header">
                        <h6 className="text-danger" style={{fontWeight:"600",fontSize:"20px"}}>Gider</h6>
                    </div>
                    <div className="card-body" style={{position:"relative"}}>
                        <Line data={ {
                                labels: label,
                                datasets: [{
                                label: "Gider",
                                lineTension: 0.3,
                                backgroundColor: "rgba(78, 115, 223, 0.05)",
                                borderColor: "rgba(220,53,69, 1)",
                                pointRadius: 3,
                                pointBackgroundColor: "rgba(220,53,69, 1)",
                                pointBorderColor: "rgba(220,53,69, 1)",
                                pointHoverRadius: 3,
                                pointHoverBackgroundColor: "rgba(220,53,69, 1)",
                                pointHoverBorderColor: "rgba(220,53,69, 1)",
                                pointHitRadius: 10,
                                pointBorderWidth: 2,
                                data: dataO,
                                }],
                            }}
                            legend="false"
                            options={{plugins:{legend:false},animation:{duration:0}}}/>
                    </div>
                </div>
            </div>

            <div className="col-xl-4 col-lg-6">
                <div className="card shadow mb-4">
                    <div className="card-header">
                        <h6 className="text-primary" style={{fontWeight:"600",fontSize:"20px"}}>Net</h6>
                    </div>
                    <div className="card-body">
                        <Line data={ {
                                labels: label,
                                datasets: [{
                                label: "Net Kazanç",
                                lineTension: 0.3,
                                backgroundColor: "rgba(78, 115, 223, 0.05)",
                                borderColor: "rgba(13,110,253, 1)",
                                pointRadius: 3,
                                pointBackgroundColor: "rgba(13,110,253, 1)",
                                pointBorderColor: "rgba(13,110,253, 1)",
                                pointHoverRadius: 3,
                                pointHoverBackgroundColor: "rgba(13,110,253, 1)",
                                pointHoverBorderColor: "rgba(13,110,253, 1)",
                                pointHitRadius: 10,
                                pointBorderWidth: 2,
                                data: dataN,
                                }],
                            }}
                            legend="false"
                            options={{plugins:{legend:false},animation:{duration:0}}}/>
                    </div>
                </div>
            </div>
        </div>


        <div className="row">
            <div className="col-xl-6 col-lg-6">
                <div className="card shadow mb-4">
                    <div className="card-header">
                        <h5 style={{fontWeight:"500"}}>Vadesi Yaklaşan Alacaklar</h5>
                    </div>
                    <div className="card-body">
                    <TableContainer component={Paper}>
                        <Table  aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Müşteri</TableCell>
                                <TableCell align="right">Miktar</TableCell>
                                <TableCell align="right">Kalan Gün</TableCell>
                                <TableCell align="right">Ödeme Türü</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.customer}>
                                <TableCell component="th" scope="row">
                                    {row.customer}
                                </TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.time}</TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </div>
                </div>
            </div>
            <div className="col-xl-6 col-lg-6">
                <div className="card shadow mb-4">
                    <div className="card-header">
                        <h5 style={{fontWeight:"500"}}>Vadesi Yaklaşan Ödemeler</h5>
                    </div>
                    <div className="card-body">
                        Boş
                    </div>
                </div>
            </div>
        </div>
    </div>);
}