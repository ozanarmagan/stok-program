import {Link} from 'react-router-dom';
import { NavbarToggler } from 'reactstrap';
export default function Navbar (props) {
    return (
<nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#e9faff"}}>
  <div class="container-fluid">
    <NavbarToggler onClick={(event) => {props.sidebarref.current.classList.toggle('active')}}/>
    <Link class="navbar-brand" to="/">Logo</Link>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

      </ul>

      <form class="w-auto">
        <input type="search" class="form-control" placeholder="Type query" aria-label="Search" />
      </form>
    </div>
  </div>
</nav>
    )
}