
import Navbar from './partial/navbar'
import Login from './pages/login'
import {useSelector} from 'react-redux';
import PageRouter from './utility/router';
import { BrowserRouter } from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';
function App() {

  const state = useSelector(state => state.userReducer);
  
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      {state.logged_in ? <PageRouter/> : <Login/> }
      </BrowserRouter>
      <NotificationContainer/>
    </div>
  );
}

export default App;
