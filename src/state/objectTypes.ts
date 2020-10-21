export interface PokemonDetailsState {
    loading: boolean,
    pokemonResults: ShortenedPokemon[],
    next: string,
    pokemons: PokemonObjectType[],
}

export const initPokemon: PokemonObjectType = {
    name: 'empty',
    height: 0,
    weight: 0,
    types: <PokemonTypeHolder>{type: [<PokemonType>{name: ''}]},
    abilities: [{ability: {name: ''}}],
    sprites: <SpritesType>{}
}

export const initState: PokemonDetailsState = {
    loading: true,
    next: '',
    pokemonResults: [],
    pokemons: []
}

export interface ShortenedPokemon {
    name: string,
    url: string,
}

export interface PokemonObjectType {
    name: string,
    height: number,
    weight: number,
    types: PokemonTypeHolder | PokemonTypeHolder[],
    sprites: SpritesType
    abilities: AbilityWrapper[]
}

export interface SpritesType {
    front_default: string,
    back_default: string,
    front_shiny: string,
    back_shiny: string,
}

export interface AbilityWrapper {
    ability: AbilityType,
}

export interface AbilityType {
    name: string
}



export interface PokemonTypeHolder {
    type: PokemonType | PokemonType[],
}

export interface PokemonType {
    name: string,
}

export interface UserType {
    name: string,
    password: string,
    logged: boolean,
    token: string,
}

export const initUserType = {
    name: '',
    password: '',
    logged: false,
    token: ''
}

