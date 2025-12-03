import {
    BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import People from "./pages/People";
import PersonDetail from "./pages/PersonDetail";
import Planets from "./pages/Planets";
import PlanetDetail from "./pages/PlanetDetail";
import Films from "./pages/Films";
import FilmDetail from "./pages/FilmDetail";
import Species from "./pages/Species";
import SpeciesDetail from "./pages/SpeciesDetail";
import Vehicles from "./pages/Vehicles";
import VehicleDetail from "./pages/VehicleDetail";
import Starships from "./pages/Starships";
import StarshipDetail from "./pages/StarshipDetail";

function App() {
    return (
        <div>
            <Router>
                <Menu/>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/people">
                        <People/>
                    </Route>
                    <Route path="/people/:id">
                        <PersonDetail/>
                    </Route>
                    <Route exact path="/planets">
                        <Planets/>
                    </Route>
                    <Route path="/planets/:id">
                        <PlanetDetail/>
                    </Route>
                    <Route exact path="/films">
                        <Films/>
                    </Route>
                    <Route path="/films/:id">
                        <FilmDetail/>
                    </Route>
                    <Route exact path="/species">
                        <Species/>
                    </Route>
                    <Route path="/species/:id">
                        <SpeciesDetail/>
                    </Route>
                    <Route exact path="/vehicles">
                        <Vehicles/>
                    </Route>
                    <Route path="/vehicles/:id">
                        <VehicleDetail/>
                    </Route>
                    <Route exact path="/starships">
                        <Starships/>
                    </Route>
                    <Route path="/starships/:id">
                        <StarshipDetail/>
                    </Route>
                    <Redirect to="/"/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
