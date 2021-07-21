import { Route,Switch } from "react-router-dom";
import Editcategory from "../components/editCategory";
import HomePage from "../components/homePage";
import ProductPage from "../components/productPage";

import ListCategories from "../components/listCategories";
import NewCategory from "../components/newCategory";
import ViewCategory from "../components/viewCategory";

export default function PageRouter(props) {
    return (
        <Switch>
            <Route exact path="/product/" component={ProductPage}/>
            <Route exact path="/" component={HomePage} />
            
            <Route exact path="/" component={HomePage} />
            <Route exact path="/newcategory" component={NewCategory} />
            <Route exact path="/categories" component={ListCategories} />
            <Route exact path="/category/:category_id" component={ViewCategory} />
            <Route exact path="/editcategory/:category_id" component={Editcategory} />
        </Switch>
    )
}