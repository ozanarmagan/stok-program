import { Route,Switch } from "react-router-dom";
import Editcategory from "../components/editCategory";
import HomePage from "../components/homePage";
import ProductPage from "../components/productPage";

import ListCategories from "../components/listCategories";
import NewCategory from "../components/newCategory";
import ViewCategory from "../components/viewCategory";
import ListProducts from "../components/listProducts";
import ViewPorduct from "../components/viewProduct";

export default function PageRouter(props) {
    return (
        <Switch>
            <Route exact path="/product/" component={ProductPage}/>
            <Route exact path="/product/:product_id" component={ProductPage}/>
            <Route exact path="/viewproduct/:product_id" component={ViewPorduct}/>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/listproducts/" component={ListProducts}/>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/newcategory" component={NewCategory} />
            <Route exact path="/categories" component={ListCategories} />
            <Route exact path="/category/:category_id" component={ViewCategory} />
            <Route exact path="/editcategory/:category_id" component={Editcategory} />
        </Switch>
    )
}