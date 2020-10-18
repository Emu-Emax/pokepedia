import React from 'react';
import '../App.css';
import {PokeList} from "./PokeList";
import {Route, Router, Switch} from 'react-router-dom';
import {history} from '../utils';
import urls from '../utils/urls';
import {PokemonDetails} from "./PokemonDetails";
import styled from 'styled-components'
import {AuthorizedView} from "./AuthorizedView";
import {NotFoundView} from "./NotFoundView";


function App() {
    return (
        <Router history={history}>
            <BodyWrapper>
                <Switch>
                    <Route exact path={urls.get('home')}>
                        <PokeList/>
                    </Route>
                    <Route exact path={urls.get('private')}>
                        <AuthorizedView/>
                    </Route>
                    <Route exact path={urls.get('pokemonDetail')}>
                        <PokemonDetails/>
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