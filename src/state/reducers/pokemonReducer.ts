import {
    GET_POKEMON_FAIL,
    GET_POKEMON_LOADING,
    GET_POKEMON_SUCCESS,
    GetPokemonDispatchTypes,
    POKEMON_RESULTS_FAIL,
    POKEMON_RESULTS_LOADING,
    POKEMON_RESULTS_SUCCESS,
    PokemonResultsDispatchTypes,
} from "../dispatchTypes";

import {initState, PokemonDetailsState} from "../objectTypes";

const pokemonReducer = (state : PokemonDetailsState = initState, action : PokemonResultsDispatchTypes | GetPokemonDispatchTypes) : PokemonDetailsState => {

    switch (action.type) {
        case POKEMON_RESULTS_FAIL || GET_POKEMON_FAIL:
            return {
                loading: false,
                pokemons: state.pokemons,
                pokemonResults: state.pokemonResults,
                next: state.next
            }
        case POKEMON_RESULTS_LOADING || GET_POKEMON_LOADING:
            return {
                loading: true,
                pokemons: state.pokemons,
                pokemonResults: state.pokemonResults,
                next: state.next
            }
        case POKEMON_RESULTS_SUCCESS:
            return {
                loading: false,
                pokemonResults: state.pokemonResults.concat(...action.payload.results),
                next: action.payload.next,
                pokemons: state.pokemons
            }
        case GET_POKEMON_SUCCESS:
            return {
                loading: false,
                pokemons: [...state.pokemons, action.payload.pokemon],
                pokemonResults: state.pokemonResults,
                next: state.next
            }
        default:
            return state
    }
}

export default pokemonReducer;