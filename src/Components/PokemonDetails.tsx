import React, {FunctionComponent, useEffect, useState} from 'react';
import API from "../utils/api";
import styled from 'styled-components'
import {useParams} from "react-router";
import {history} from "../utils";
import {Bold, HeaderTwo, Label, PokemonName, Spinner, StyledButton} from "../globalStyles";
import {multiplyGrid} from '../theme';


type PokemonDetails = {
    name: string,
    height: number,
    weight: number,
    abilities: any,
    sprites: any,
    types: any,
};

interface ParamTypes {
    name: string
}


export const PokemonDetails: FunctionComponent = () => {
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>();
    const [abilities, setAbilities] = useState([]);
    const [fetched, setFetched] = useState(false);
    const {name} = useParams<ParamTypes>()

    useEffect(() => {
        API.getPokemon('pokemon/' + name).then(r => {
                setPokemonDetails(r.data);
                setAbilities(r.data.abilities)
                setFetched(true);
            }
        )
    })

    const abilitiesList = abilities.map((item: any, index: number) => {
        return (
            <Label key={index}>{item.ability.name}</Label>
        )
    })

    return (
        <Canvas>
            {fetched ? <>
                <StyledButton onClick={() => history.push('/')}>Return</StyledButton>
                <PokemonName>{pokemonDetails!.name}</PokemonName>
                <HeaderTwo>{pokemonDetails!.types[0].type.name}</HeaderTwo>
                <Row>
                    <Bold>Height: </Bold> {pokemonDetails!.height}
                </Row>
                <Row>
                    <Bold>Weight: </Bold> {pokemonDetails!.weight}
                </Row>
                <Row>
                    <PokemonSprite url={pokemonDetails!.sprites.front_default}/>
                    <PokemonSprite url={pokemonDetails!.sprites.back_default}/>
                    <PokemonSprite url={pokemonDetails!.sprites.front_shiny}/>
                    <PokemonSprite url={pokemonDetails!.sprites.back_shiny}/>
                </Row>

                <HeaderTwo>Abilities:</HeaderTwo>
                <Row>{abilitiesList}</Row>

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
