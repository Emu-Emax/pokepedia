import React, {useEffect, useState} from 'react';
import {PokemonCard} from "./PokemonCard";
import styled from 'styled-components'
import {PageName, Spinner, StyledButton} from "../styledComponents";
import {history} from "../utils";
import {multiplyGrid} from "../theme";
import {useDispatch, useSelector} from 'react-redux';
import {fetchNextPokemons, fetchPokemonResults, getPokemon} from "../state/actions";
import {RootStore} from '../state/store';
import {comparePokemonNames, comparePokemonTypes, getPokemonType} from "../utils/helperFunctions";
import urls from "../utils/urls";
import {PokemonObjectType} from "../state/objectTypes";


const PokeList = () => {
    const dispatch = useDispatch();
    const fetchedPokemons = useSelector((state: RootStore) => state.pokemonReducer);
    const [fetched, setFetched] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [sortAlphabetically, setSortAlphabetically] = useState('');
    const [sortByType, setSortByType] = useState('');

    useEffect(() => {
        if (fetchedPokemons.pokemons.length === 0) {
            dispatch(fetchPokemonResults());
        }
        setFetched(true);
    }, [])

    useEffect(() => {
        if (!fetchedPokemons.loading && fetchedPokemons.next) {
            let pokemons = fetchedPokemons.pokemonResults;
            let offset: number = fetchedPokemons.pokemons.length;
            for (let i = offset; i < pokemons!.length; i++) {
                dispatch(getPokemon(pokemons[i].name));
            }
        }
    }, [fetchedPokemons.next])


    const loadMore = () => {
        dispatch(fetchNextPokemons(fetchedPokemons.next));
    }


    const handleSortAlpha = () => {
        if (sortAlphabetically === 'ascending') {
            fetchedPokemons.pokemons = ([...fetchedPokemons.pokemons].sort(comparePokemonNames));
            setSortAlphabetically('descending');
        } else {
            fetchedPokemons.pokemons = ([...fetchedPokemons.pokemons].sort((a, b) => comparePokemonNames(b, a)));
            setSortAlphabetically('ascending');
        }
    }


    const handleSortByType = () => {

        if (sortByType === '' || sortByType === 'descending') {
            fetchedPokemons.pokemons = ([...fetchedPokemons.pokemons].sort(comparePokemonTypes));
            setSortByType('ascending');
        }
        if (sortByType === 'ascending') {
            fetchedPokemons.pokemons = ([...fetchedPokemons.pokemons].sort((a, b) => comparePokemonTypes(b, a)));
            setSortByType('descending');
        }
    }

    const pokemonsList = fetchedPokemons.pokemons.map((item: PokemonObjectType, index: number) => {
        if (item.name.includes(searchValue))
            return (
                <PokemonCard key={index}
                             name={item.name}
                             image={item.sprites.front_default}
                             type={getPokemonType(item)}
                />
            )
    })

    return (
        <Canvas>
            <PageName>Pokepedia</PageName>
            <Row>
                <StyledButton onClick={() => history.push(urls['dashboard'])}>Dashboard</StyledButton>
                <StyledButton onClick={() => history.push(urls['login'])}>Login</StyledButton>
            </Row>

            <SearchForm onSubmit={() => {
                if (searchValue !== '') history.push('pokemon/' + searchValue)
            }}>
                <SearchField type='text' onChange={(e) => setSearchValue(e.target.value)}/>
                <StyledButton type="submit">Search</StyledButton>
            </SearchForm>
            Or enter /pokemon/name

            <FilterSection>
                <StyledButton onClick={() => handleSortAlpha()}>Sort
                    alphabetically: {sortAlphabetically}</StyledButton>
                <StyledButton onClick={() => handleSortByType()}>Sort
                    by type</StyledButton>
            </FilterSection>

            <Row>
                {fetched ? pokemonsList : <Spinner/>}
                {!fetchedPokemons.loading ?
                    <MoreWrapper><StyledButton onClick={() => loadMore()}>More</StyledButton></MoreWrapper>
                    : <MoreWrapper><Spinner/> </MoreWrapper>}
            </Row>

        </Canvas>
    )
}

export default PokeList;

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
margin-top: ${multiplyGrid(5)};
margin-bottom; ${multiplyGrid(5)};
`

const FilterSection = styled.div`
justify-content: center;
align-items: center;
margin-top: ${multiplyGrid(3)};
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