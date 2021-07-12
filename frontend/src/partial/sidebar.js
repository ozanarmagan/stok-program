import '../css/sidebar.css'
import {IoIosHome,IoIosArrowForward,IoIosArrowUp,IoMdCart} from 'react-icons/io';
import {Collapse} from 'reactstrap';
import {RiBillFill} from 'react-icons/ri';
import {MdPersonPin} from 'react-icons/md';
import {FaBoxes} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useState } from 'react';
export default function Sidebar(props) {
    const [state,setState] = useState({bills:false,customers:false,products:false});



    const handleClickBills = (e) => {
        setState({bills:!state.bills});
    }

    const handleClickCustomers = (e) => {
        setState({customers:!state.customers});
    }

    const handleClickProducts = (e) => {
        setState({products:!state.products});
    }

    return (
<div class="sidenav">
    <div className="sidebar-logo">Logo</div>
    <Link to='/'><IoIosHome style={{marginBottom:"2px",marginLeft:"5px",color:"whitesmoke"}}/> <span style={{marginLeft:"5px"}}>Ana Sayfa</span></Link>


    <div className="sidebar-heading">İŞLEMLER</div>
    <Link to='/' onClick={handleClickBills}>
        <RiBillFill style={{marginBottom:"2px",marginLeft:"5px",color:"whitesmoke"}}/> 
        <span style={{marginLeft:"5px"}}>Faturalar</span> 
        {state.bills ? <IoIosArrowUp className="collapsebtn"/> : <IoIosArrowForward className="collapsebtn"/>} 
    </Link>
    <Collapse isOpen={state.bills}>
    <div className="submenu">
        <div className="submenu-heading">FATURA İŞLEMLERİ</div>
        <Link className="submenu-item" to="/">Fatura Sorgulama</Link>
        <Link className="submenu-item" to="/">Fatura Düzenleme</Link>
        <Link className="submenu-item" to="/">Yeni Fatura</Link>
    </div>
    </Collapse>
    <Link to='/' onClick={handleClickCustomers}>
        <MdPersonPin style={{marginBottom:"2px",marginLeft:"5px",color:"whitesmoke"}}/> 
        <span style={{marginLeft:"5px"}}>Müşteriler</span>
        {state.customers ? <IoIosArrowUp className="collapsebtn"/> : <IoIosArrowForward className="collapsebtn"/>} 
    </Link>
    <Collapse isOpen={state.customers}>
    <div className="submenu">
        <div className="submenu-heading">MÜŞTERİ İŞLEMLERİ</div>
        <Link className="submenu-item" to="/">Yeni Müşteri</Link>
        <Link className="submenu-item" to="/">Tüm Müşteriler</Link>
    </div>
    </Collapse>
    <Link to='/' onClick={handleClickProducts}>
        <FaBoxes style={{marginBottom:"2px",marginLeft:"5px",color:"whitesmoke"}}/> 
        <span style={{marginLeft:"5px"}}>Ürünler</span>
        {state.products ? <IoIosArrowUp className="collapsebtn"/> : <IoIosArrowForward className="collapsebtn"/>} 
    </Link>
    <Collapse isOpen={state.products}>
    <div className="submenu">
        <div className="submenu-heading">ÜRÜN İŞLEMLERİ</div>
        <Link className="submenu-item" to="/">Hızlı Ürün Ekle</Link>
        <Link className="submenu-item" to="/">Kritik Stoktakiler</Link>
        <Link className="submenu-item" to="/">Stok Sayım</Link>
        <Link className="submenu-item" to="/">Kategoriler</Link>
        <Link className="submenu-item" to="/">Tüm Ürünler</Link>
    </div>
    </Collapse>
</div>
    )
}