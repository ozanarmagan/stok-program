import { Route,Switch } from "react-router-dom";
import HomePage from "../components/homePage";
import NewCategory from "../components/newCategory";

export default function PageRouter(props) {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/newcategory" component={NewCategory} />
        </Switch>
    )
}