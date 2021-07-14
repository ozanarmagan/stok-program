import { useState } from 'react';
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



function createData(customer,amount,time,type) {
    return { customer,amount,time,type };
  }
  
  const rows = [
    createData('Ubeyd Talha Alkan', 1000, 5, 'Senet'),
  ];

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
        <div className="row">
            <div class="col-xl-4 col-lg-6">
                <div className="card shadow mb-4">
                    <div className="card-header">
                        <h6 className="text-success"  style={{fontWeight:"600",fontSize:"20px"}}>Gelir</h6>
                    </div>
                    <div className="card-body">
                        <Line data={ {
                                labels: ["OcaK", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran"],
                                datasets: [{
                                label: "Net Kazanç",
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
                                data: [0, 10000, 5000, 15000, 10000, 20000],
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
                    <div className="card-body">
                        <Line data={ {
                                labels: ["OcaK", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran"],
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
                                data: [0, 10000, 5000, 15000, 10000, 20000],
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
                                labels: ["OcaK", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran"],
                                datasets: [{
                                label: "Gider",
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
                                data: [0, 10000, 5000, 15000, 10000, 20000],
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