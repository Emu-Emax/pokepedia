import React, {useEffect, useState} from 'react';
import API from "../utils/api";
import {PokemonCard} from "./PokemonCard";
import styled from 'styled-components'
import {Logo, Spinner, StyledButton} from "../globalStyles";
import {history} from "../utils";
import axios from 'axios';
import swal from 'sweetalert';
import {multiplyGrid} from "../theme";

type PokemonObject = {
    results: Array<PokemonItem>,
    next: string,
};

type PokemonItem = {
    name: string,
    sprites: any,
    types: any,
};

export const PokeList = () => {
    const [pokemonObject, setPokemonObject] = useState<PokemonObject>();
    const [pokemonDetails, setPokemonDetails] = useState<PokemonItem[]>([]);
    const [fetched, setFetched] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [sortAlphabetically, setSortAlphabetically] = useState('');

    useEffect(() => {
        API.getPokemon('pokemon?limit=4').then(r => setPokemonObject(r.data))
    }, [])

    useEffect(() => {
        const pokemons = pokemonObject && pokemonObject!.results;
        if (pokemons) {
            const fetchPokemonDetails = async () => {
                for (let i = 0; i < pokemons!.length; i++) {
                    await API.getPokemon('pokemon/' + pokemons![i].name).then(r => {
                        pokemonDetails.push(r.data);
                    })
                }
            }
            fetchPokemonDetails().then(() => {
                setPokemonDetails(pokemonDetails);
                if (pokemonDetails.length !== 0) setFetched(true)
            });
        }


    }, [pokemonObject])

    const loadMore = () => {
        setFetched(false);
        axios.get(pokemonObject!.next).then(r => {
                setPokemonObject(r.data);
            }
        )
    }

    const handleAuthorize = () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            swal('you already have token!');
        } else {
            localStorage.setItem('accessToken', 'hello_poke_world');
            swal('Access granted!');
        }
    };

    const handleSortAlpha = () => {
        if (sortAlphabetically === 'ascending') {
            setPokemonDetails([...pokemonDetails].sort((a, b) => b.name.localeCompare(a.name)));
            setSortAlphabetically('descending');
        } else {
            setPokemonDetails([...pokemonDetails].sort((a, b) => a.name.localeCompare(b.name)));
            setSortAlphabetically('ascending');
        }
    }

    const handleSortByType = () => {
        if (sortAlphabetically === 'none' || sortAlphabetically === 'descending') {
            setPokemonDetails([...pokemonDetails].sort((a, b) => a.types[0].type.name.localeCompare(b.types[0].type.name)));
            setSortAlphabetically('ascending');
        }
        if (sortAlphabetically === 'ascending') {
            setPokemonDetails([...pokemonDetails].sort((a, b) => b.types[0].type.name.localeCompare(a.types[0].type.name)));
            setSortAlphabetically('descending');
        }
    }

    const pokemonsList = pokemonDetails.map((item: PokemonItem, index: number) => {
        if (item.name.includes(searchValue))
            return (
                <PokemonCard key={index}
                             name={item.name}
                             image={item.sprites.front_default}
                             pokemonType={item.types[0].type.name}
                />
            )
        return
    })

    return (
        <Canvas>
            <Logo>Pokepedia</Logo>
            Or enter /pokemon/name
            <SearchForm onSubmit={() => {
                if (searchValue !== '') history.push('pokemon/' + searchValue)
            }}>
                <SearchField type='text' onChange={(e) => setSearchValue(e.target.value)}/>
                <StyledButton type="submit">Search</StyledButton>
            </SearchForm>
            <FilterSection>
                <StyledButton onClick={() => handleSortAlpha()}>Sort
                    alphabetically: {sortAlphabetically}</StyledButton>
                <StyledButton onClick={() => handleSortByType()}>Sort
                    by type</StyledButton>
                <StyledButton onClick={() => history.push('private')}>Enter private room</StyledButton>
                <StyledButton onClick={() => handleAuthorize()}>Authorize</StyledButton>

            </FilterSection>
            <Row>
                {pokemonsList}
                {fetched && <MoreWrapper><StyledButton onClick={() => loadMore()}>More</StyledButton></MoreWrapper>}
                {!fetched && <MoreWrapper><Spinner/></MoreWrapper>}
            </Row>
        </Canvas>
    )
}


const Canvas = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;

@media screen and (max-width: 700px) {
flex-direction: column;
}
`

const MoreWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: ${multiplyGrid(25)};
height: ${multiplyGrid(40)};
padding: ${multiplyGrid(3)};
margin: ${multiplyGrid(3)};
border-radius: 10px;
color: black;

`

const SearchForm = styled.form`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
`

const FilterSection = styled.div`
justify-content: center;
align-items: center;
`

const SearchField = styled.input`
width: 50%;
height: ${multiplyGrid(5)};
margin-right: ${multiplyGrid(3)};
padding: 10px;
border: none;
border-radius: 5px;
font-size: 20px;
`

const Row = styled.div`
justify-content: center;
align-items: center;
display: flex;
flex-wrap: wrap;
width: 100%;
`