import { Route,Switch } from "react-router-dom";
import HomePage from "../components/homePage";
import ProductPage from "../components/productPage";


export default function PageRouter(props) {
    return (
        <Switch>
            <Route path="/product/" component={ProductPage}/>
            <Route path="/" component={HomePage} />
            
        </Switch>
    )
}