import {PokemonObjectType, ShortenedPokemon, UserType} from "./objectTypes";

export const POKEMON_RESULTS_FAIL = 'POKEMON_RESULTS_FAIL';
export const POKEMON_RESULTS_SUCCESS = 'POKEMON_RESULTS_SUCCESS';
export const POKEMON_RESULTS_LOADING = 'POKEMON_RESULTS_LOADING';

export interface PokemonResultsFail {
    type: typeof POKEMON_RESULTS_FAIL
}

export interface PokemonResultsSuccess {
    type: typeof POKEMON_RESULTS_SUCCESS
    payload: {
        results: ShortenedPokemon[],
        next: string
    }
}

export interface PokemonResultsLoading {
    type: typeof POKEMON_RESULTS_LOADING
}

export type PokemonResultsDispatchTypes = PokemonResultsLoading | PokemonResultsFail | PokemonResultsSuccess


export const GET_POKEMON_FAIL = 'GET_POKEMON_FAIL';
export const GET_POKEMON_SUCCESS = 'GET_POKEMON_SUCCESS';
export const GET_POKEMON_LOADING = 'GET_POKEMON_LOADING';

export interface GetPokemonFail {
    type: typeof GET_POKEMON_FAIL
}

export interface GetPokemonSuccess {
    type: typeof GET_POKEMON_SUCCESS
    payload: {
        pokemon: PokemonObjectType,
    }
}

export interface GetPokemonLoading {
    type: typeof GET_POKEMON_LOADING
}

export type GetPokemonDispatchTypes = GetPokemonFail | GetPokemonSuccess | GetPokemonLoading


export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export interface LoginUserFail {
    type: typeof LOGIN_USER_FAIL
}

export interface LoginUserSuccess {
    type: typeof LOGIN_USER_SUCCESS
    payload: {
        user: UserType,
        token: string,
    }
}

export interface LogoutSuccess {
    type: typeof LOGOUT_USER_SUCCESS
}


export type UserDispatchTypes = LoginUserFail | LoginUserSuccess | LogoutSuccess