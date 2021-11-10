import { Route,Switch } from "react-router-dom";
import Editcategory from "../components/editCategory";
import HomePage from "../components/homePage";
import Product from "../components/product";
import CustomerPage from "../components/customerPage";
import Stock  from "../components/Stock";

import ListCategories from "../components/listCategories";
import NewCategory from "../components/newCategory";
import ViewCategory from "../components/viewCategory";
import ListProducts from "../components/listProducts";
import ViewPorduct from "../components/viewProduct";
import Order from "../components/order";
import ListOrders from "../components/listOrders";
import ViewOrder from "../components/viewOrder";

export default function PageRouter(props) {
    return (
        <Switch>
            <Route exact path="/customer/" component={CustomerPage}/>
            <Route exact path="/product/" component={Product}/>
            <Route exact path="/order/" component={Order}/>
            <Route exact path="/order/:order_id" component={Order}/>
            <Route exact path="/vieworder/:order_id" component={ViewOrder}/>
            <Route exact path="/listorders/" component={ListOrders}/>
            <Route exact path="/product/:product_id" component={Product}/>
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