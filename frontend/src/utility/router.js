import { Route,Switch } from "react-router-dom";
import HomePage from "../components/homePage";

export default function PageRouter(props) {
    return (
        <Switch>
            <Route path="/" component={HomePage} />
        </Switch>
    )
}