
import Navbar from './partial/navbar'
import Login from './pages/login'
import {useSelector} from 'react-redux';
import './css/main.css'
import PageRouter from './utility/router';
import { BrowserRouter } from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';
import Sidebar from './partial/sidebar';
import { useRef } from 'react';

function App() {

  const state = useSelector(state => state.userReducer);
  const sideBarRef = useRef(null);
  return (
    <div className="App" ref={sideBarRef}>
      <BrowserRouter>
      {state.logged_in ?<div><Sidebar/><div class="contentt"><Navbar sidebarref={sideBarRef}/><PageRouter/></div></div>  : <Login/> }
      </BrowserRouter>
      <NotificationContainer/>
    </div>
  );
}

export default App;
