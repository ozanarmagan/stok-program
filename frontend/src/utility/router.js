import { Route,Switch } from "react-router-dom";
import Home from "../pages/home";

export default function PageRouter(props) {
    return (
        <Switch>
            <Route path="/" component={Home} />
        </Switch>
    )
}