import '../css/sidebar.css'
import {IoIosHome,IoIosArrowForward,IoIosArrowUp,IoMdCart,IoMdFiling,IoMdPerson} from 'react-icons/io';
import {Collapse} from 'reactstrap';
import {RiBillFill,RiBarChart2Fill,RiSettings3Fill,RiAdminFill,RiMoneyCnyBoxFill,RiProfileFill} from 'react-icons/ri';
import {MdPersonPin} from 'react-icons/md';
import {FaBoxes} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useState } from 'react';
export default function Sidebar(props) {
    const [state,setState] = useState({bills:false,indentures:false,customers:false,products:false,profile:false,stocks:false,orders:false,reports:false,admin_users:false,admin_company:false,superadmin_admins:false});

    const user = useSelector(state => state.userReducer.user);

    const handleClickBills = (e) => {
        setState({bills:!state.bills});
    }

    const handleClickCustomers = (e) => {
        setState({customers:!state.customers});
    }

    const handleClickProducts = (e) => {
        setState({products:!state.products});
    }

    const handleClickStocks = (e) => {
        setState({stocks:!state.stocks});
    }

    const handleClickOrders = (e) => {
        setState({orders:!state.orders});
    }

    const handleClickReports = (e) => {
        setState({reports:!state.reports});
    }

    const handleClickUsers = (e) => {
        setState({admin_users:!state.admin_users});
    }

    const handleClickCompany = (e) => {
        setState({admin_company:!state.admin_company});
    }

    const handleClickSuperAdmin = (e) => {
        setState({superadmin_admins:!state.superadmin_admins});
    }

    const handleClickIndenture = (e) => {
        setState({indentures:!state.indentures});
    }

    const handleClickProfile = (e) => {
        setState({profile:!state.profile});
    }

    return (
<div class="sidenav">
    <div className="sidebar-logo">Logo</div>
    <Link to='/'><IoIosHome style={{marginBottom:"2px",marginLeft:"5px",color:"whitesmoke"}}/> <span style={{marginLeft:"5px"}}>Ana Sayfa</span></Link>


    <div className="sidebar-heading">İŞLEMLER</div>
    <Link  onClick={handleClickBills}>
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
    <Link  onClick={handleClickIndenture}>
        <RiMoneyCnyBoxFill style={{marginBottom:"2px",marginLeft:"5px",color:"whitesmoke"}}/> 
        <span style={{marginLeft:"5px"}}>Senetler</span> 
        {state.indentures ? <IoIosArrowUp className="collapsebtn"/> : <IoIosArrowForward className="collapsebtn"/>} 
    </Link>
    <Collapse isOpen={state.indentures}>
    <div className="submenu">
        <div className="submenu-heading">SENET İŞLEMLERİ</div>
        <Link className="submenu-item" to="/">Yeni Senet</Link>
        <Link className="submenu-item" to="/">Senet Ödeme</Link>
        <Link className="submenu-item" to="/">Tüm Senetler</Link>
    </div>
    </Collapse>
    <Link  onClick={handleClickCustomers}>
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
    <Link  onClick={handleClickProducts}>
        <IoMdFiling style={{marginBottom:"2px",marginLeft:"5px",color:"whitesmoke"}}/> 
        <span style={{marginLeft:"5px"}}>Ürünler</span>
        {state.products ? <IoIosArrowUp className="collapsebtn"/> : <IoIosArrowForward className="collapsebtn"/>} 
    </Link>
    <Collapse isOpen={state.products}>
    <div className="submenu">
        <div className="submenu-heading">ÜRÜN İŞLEMLERİ</div>
        <Link className="submenu-item" to="/product/">Ürün Ekle</Link>
        <Link className="submenu-item" to="/">Kategori Ekle</Link>
        <Link className="submenu-item" to="/">Tüm Kategoriler</Link>
        <Link className="submenu-item" to="/newcategory">Kategori Ekle</Link>
        <Link className="submenu-item" to="/categories">Tüm Kategoriler</Link>
        <Link className="submenu-item" to="/">Tüm Ürünler</Link>
    </div>
    </Collapse>
    <Link  onClick={handleClickStocks}>
        <FaBoxes style={{marginBottom:"2px",marginLeft:"5px",color:"whitesmoke"}}/> 
        <span style={{marginLeft:"5px"}}>Stok</span>
        {state.stocks ? <IoIosArrowUp className="collapsebtn"/> : <IoIosArrowForward className="collapsebtn"/>} 
    </Link>
    <Collapse isOpen={state.stocks}>
    <div className="submenu">
        <div className="submenu-heading">STOK İŞLEMLERİ</div>
        <Link className="submenu-item" to="/">Stok Ekle</Link>
        <Link className="submenu-item" to="/">Kritik Stoktakiler</Link>
        <Link className="submenu-item" to="/">Stok Sayımı</Link>
    </div>
    </Collapse>
    <Link  onClick={handleClickOrders}>
        <IoMdCart style={{marginBottom:"2px",marginLeft:"5px",color:"whitesmoke",fontSize:"17px"}}/> 
        <span style={{marginLeft:"5px"}}>Siparişler</span>
        {state.orders ? <IoIosArrowUp className="collapsebtn"/> : <IoIosArrowForward className="collapsebtn"/>} 
    </Link>
    <Collapse isOpen={state.orders}>
    <div className="submenu">
        <div className="submenu-heading">SİPARİŞ İŞLEMLERİ</div>
        <Link className="submenu-item" to="/">Sipariş Ekle</Link>
        <Link className="submenu-item" to="/">Tüm Siparişler</Link>
    </div>
    </Collapse>
    <Link  onClick={handleClickReports}>
        <RiBarChart2Fill style={{marginBottom:"2px",marginLeft:"5px",color:"whitesmoke"}}/> 
        <span style={{marginLeft:"5px"}}>Raporlar</span>
        {state.reports ? <IoIosArrowUp className="collapsebtn"/> : <IoIosArrowForward className="collapsebtn"/>} 
    </Link>
    <Collapse isOpen={state.reports}>
    <div className="submenu">
        <div className="submenu-heading">RAPOR İŞLEMLERİ</div>
        <Link className="submenu-item" to="/">Satış Geçmişi</Link>
        <Link className="submenu-item" to="/">Stok Geçmişi</Link>
        <Link className="submenu-item" to="/">Fatura Geçmişi</Link>
    </div>
    </Collapse>
    
    <div className="sidebar-heading">PROFIL</div>
    <Link  onClick={handleClickProfile}>
        <RiProfileFill style={{marginBottom:"2px",marginLeft:"5px",color:"whitesmoke"}}/> 
        <span style={{marginLeft:"5px"}}>Profil</span>
        {state.profile ? <IoIosArrowUp className="collapsebtn"/> : <IoIosArrowForward className="collapsebtn"/>} 
    </Link>
    <Collapse isOpen={state.profile}>
    <div className="submenu">
        <div className="submenu-heading">PROFIL İŞLEMLERİ</div>
        <Link className="submenu-item" to="/">Profilimi Görüntüle</Link>
        <Link className="submenu-item" to="/">Profil Ayarları</Link>
    </div>
    </Collapse>



    { user.user_type === 1 || user.user_type === 2 ? <div>
    <div className="sidebar-heading">ADMIN</div>
    <Link  onClick={handleClickCompany}>
        <RiSettings3Fill style={{marginBottom:"2px",marginLeft:"5px",color:"whitesmoke"}}/> 
        <span style={{marginLeft:"5px"}}>Şirket</span>
        {state.admin_company? <IoIosArrowUp className="collapsebtn"/> : <IoIosArrowForward className="collapsebtn"/>} 
    </Link>
    <Collapse isOpen={state.admin_company}>
    <div className="submenu">
        <div className="submenu-heading">ŞİRKET İŞLEMLERİ</div>
        <Link className="submenu-item" to="/">Şirket Ayarları</Link>
    </div>
    </Collapse>
    <Link  onClick={handleClickUsers}>
        <IoMdPerson style={{marginBottom:"2px",marginLeft:"5px",color:"whitesmoke"}}/> 
        <span style={{marginLeft:"5px"}}>Üyelik</span>
        {state.admin_users ? <IoIosArrowUp className="collapsebtn"/> : <IoIosArrowForward className="collapsebtn"/>} 
    </Link>
    <Collapse isOpen={state.admin_users}>
    <div className="submenu">
        <div className="submenu-heading">ÜYELİK İŞLEMLERİ</div>
        <Link className="submenu-item" to="/">Çalışan Ekle</Link>
        <Link className="submenu-item" to="/">Tüm Çalışanlar</Link>
    </div>
    </Collapse>
    </div>  : null
    }



    {user.user_type === 2 ? <div>
    <div className="sidebar-heading">SUPER ADMIN</div>
    <Link  onClick={handleClickSuperAdmin}>
        <RiAdminFill style={{marginBottom:"2px",marginLeft:"5px",color:"whitesmoke"}}/> 
        <span style={{marginLeft:"5px"}}>Admin</span>
        {state.superadmin_admins ? <IoIosArrowUp className="collapsebtn"/> : <IoIosArrowForward className="collapsebtn"/>} 
    </Link>
    <Collapse isOpen={state.superadmin_admins}>
    <div className="submenu">
        <div className="submenu-heading">ADMIN İŞLEMLERİ</div>
        <Link className="submenu-item" to="/">Admin Ekle</Link>
        <Link className="submenu-item" to="/">Tüm Adminler</Link>
    </div>
    </Collapse>
    </div>  : null
    }


</div>
    )
}