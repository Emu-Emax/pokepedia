import React from 'react';
import '../App.css';
import {Route, Router, Switch} from 'react-router-dom';
import {history} from '../utils';
import urls from '../utils/urls';
import {PokemonDetails} from "./PokemonDetails";
import styled from 'styled-components'
import {Dashboard} from "./Dashboard";
import {NotFoundView} from "./NotFoundView";
import PokeList from "./PokeList";
import {Login} from "./Login";
import {PrivateRoute} from "./PrivateRoute";


function App() {
    return (
        <Router history={history}>
            <BodyWrapper>
                <Switch>
                    <Route exact path={urls['home']}>
                        <PokeList/>
                    </Route>
                    <Route path={urls['dashboard']}>
                        <PrivateRoute>
                            <Dashboard/>
                        </PrivateRoute>
                    </Route>
                    <Route exact path={urls['pokemonDetail']}>
                        <PokemonDetails/>
                    </Route>
                    <Route exact path={urls['login']}>
                        <Login/>
                    </Route>
                    <Route>
                        <NotFoundView/>
                    </Route>
                </Switch>
            </BodyWrapper>
        </Router>
    );
}

export default App;


const BodyWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`