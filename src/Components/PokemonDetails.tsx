import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import {useParams} from "react-router";
import {history} from "../utils";
import {Bold, HeaderTwo, Label, PokemonName, Spinner, StyledButton} from "../styledComponents";
import {multiplyGrid} from '../theme';
import {useDispatch, useSelector} from "react-redux";
import {getPokemon} from "../state/actions";
import {RootStore} from "../state/store";
import {getPokemonType} from "../utils/helperFunctions";
import {AbilityWrapper, initPokemon} from "../state/objectTypes";


interface ParamTypes {
    name: string
}

export const PokemonDetails = () => {
    const {name} = useParams<ParamTypes>()
    const dispatch = useDispatch();
    const pokemonDetails = useSelector((state: RootStore) => state.pokemonReducer);
    const [pokemon, setPokemon] = useState(initPokemon);

    useEffect(() => {
        const p = pokemonDetails.pokemons.find(p => p.name === name);
        if (p) {
            setPokemon(p);
        } else {
            dispatch(getPokemon(name));
            setPokemon(pokemonDetails.pokemons[0]);
        }
    }, [])


    return (
        <Canvas>
            {!pokemonDetails.loading ? <>
                <StyledButton onClick={() => history.push('/')}>Return</StyledButton>
                <PokemonName>{pokemon.name}</PokemonName>
                <HeaderTwo>{getPokemonType(pokemon)}</HeaderTwo>
                <Row>
                    <Bold>Height: </Bold> {pokemon.height}
                </Row>
                <Row>
                    <Bold>Weight: </Bold> {pokemon.weight}
                </Row>
                <Row>
                    <PokemonSprite url={pokemon.sprites.front_default}/>
                    <PokemonSprite url={pokemon.sprites.back_default}/>
                    <PokemonSprite url={pokemon.sprites.front_shiny}/>
                    <PokemonSprite url={pokemon.sprites.back_shiny}/>
                </Row>

                <HeaderTwo>Abilities:</HeaderTwo>

                {pokemon.abilities.map((item: AbilityWrapper, index: number) => {
                    return (
                        <Label key={index}>{item.ability.name}</Label>
                    )
                })}

            </> : <Spinner/>}
        </Canvas>
    )
}

const Canvas = styled.div`
background: white;
border-radius: 10px;
color: black;
margin: 20px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px;
`

type SpriteProps = {
    url: string
}

const PokemonSprite = styled.div<SpriteProps>`
background: url(${props => props.url});
width: ${multiplyGrid(25)};
height: ${multiplyGrid(25)};
background-repeat: no-repeat;
background-size: contain;
`;

const Row = styled.div`
display: flex;
width: 100%;
justify-content: center;
align-items: center;

@media screen and (max-width: 700px) {
flex-direction: column;
}

`
