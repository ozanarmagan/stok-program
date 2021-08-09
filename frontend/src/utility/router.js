import { Route,Switch } from "react-router-dom";
import Editcategory from "../components/editCategory";
import HomePage from "../components/homePage";
import ProductPage from "../components/productPage";
import CustomerPage from "../components/customerPage";
import Stock  from "../components/Stock";

import ListCategories from "../components/listCategories";
import NewCategory from "../components/newCategory";
import ViewCategory from "../components/viewCategory";
import ListProducts from "../components/listProducts";
import ViewPorduct from "../components/viewProduct";
import NewOrder from "../components/newOrder";
import ListOrders from "../components/listOrders";

export default function PageRouter(props) {
    return (
        <Switch>
            <Route exact path="/customer/" component={CustomerPage}/>
            <Route exact path="/product/" component={ProductPage}/>
            <Route exact path="/order/" component={NewOrder}/>
            <Route exact path="/listorders/" component={ListOrders}/>
            <Route exact path="/product/:product_id" component={ProductPage}/>
            <Route exact path="/viewproduct/:product_id" component={ViewPorduct}/>
            <Route exact key="0" path="/stocks" component={Stock}/>
            <Route exact key="1" path="/criticalstocks" component={Stock}/>
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