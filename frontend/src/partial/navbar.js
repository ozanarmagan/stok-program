import {Link} from 'react-router-dom';
export default function Navbar (props) {
    return (
<nav class="navbar navbar-expand-lg navbar-light " style={{backgroundColor:"#e9faff"}}>
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">Logo</Link>
    <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fas fa-bars"></i>
    </button>

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