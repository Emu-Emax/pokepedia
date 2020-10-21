import {
    GET_POKEMON_FAIL,
    GET_POKEMON_LOADING,
    GET_POKEMON_SUCCESS,
    GetPokemonDispatchTypes,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    POKEMON_RESULTS_FAIL,
    POKEMON_RESULTS_LOADING,
    POKEMON_RESULTS_SUCCESS,
    PokemonResultsDispatchTypes,
    UserDispatchTypes,
} from "./dispatchTypes";

import API from "../utils/api";
import {Dispatch} from "react";
import axios from 'axios';
import {generateToken} from "../utils/helperFunctions";
import {UserType} from "./objectTypes";


export const fetchPokemonResults = () => async (dispatch: Dispatch<PokemonResultsDispatchTypes>) => {
    try {
        dispatch({
            type: POKEMON_RESULTS_LOADING
        })

        const res = await API.getPokemon('pokemon?limit=4');
        dispatch({
            type: POKEMON_RESULTS_SUCCESS,
            payload: {
                results: res.data.results,
                next: res.data.next
            }
        })

    } catch(e) {
        dispatch({
            type: POKEMON_RESULTS_FAIL
        })
    }
}

export const getPokemon = (pokemonName : string) => async (dispatch: Dispatch<GetPokemonDispatchTypes>) => {
    try {
        dispatch({
            type: GET_POKEMON_LOADING
        })

        const res = await API.getPokemon('pokemon/' + pokemonName);
        dispatch({
            type: GET_POKEMON_SUCCESS,
            payload: {
                pokemon: {
                    name: res.data.name,
                    height: res.data.height,
                    weight: res.data.weight,
                    types: res.data.types,
                    sprites: res.data.sprites,
                    abilities: res.data.abilities,
                }
            }
        })

    } catch(e) {
        dispatch({
            type: GET_POKEMON_FAIL
        })
    }
}

export const fetchNextPokemons = (next : string) => async (dispatch: Dispatch<PokemonResultsDispatchTypes>) => {
    try {
        dispatch({
            type: POKEMON_RESULTS_LOADING
        })

        const res = await axios.get(next);
        dispatch({
            type: POKEMON_RESULTS_SUCCESS,
            payload: {
                results: res.data.results,
                next: res.data.next
            }
        })

    } catch(e) {
        dispatch({
            type: POKEMON_RESULTS_FAIL
        })
    }
}



export const loginUser = (user : UserType) => async (dispatch: Dispatch<UserDispatchTypes>) => {
        try {
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {
                    user: user,
                    token: generateToken()
                }
            })

        } catch(e) {
            dispatch({
                type: LOGIN_USER_FAIL
            })
        }
}


export const logoutUser = () => async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
        dispatch({
            type: LOGOUT_USER_SUCCESS,
        })

    } catch(e) {
        dispatch({
            type: LOGIN_USER_FAIL
        })
    }
}
