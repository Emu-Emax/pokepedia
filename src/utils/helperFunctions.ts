import {PokemonObjectType} from "../state/objectTypes";


export function getPokemonType(p: PokemonObjectType) : string {
    if (Array.isArray(p.types)) {
        if ("name" in p.types[0].type) {
            return p.types[0].type.name;
        }
    } else {
        if (Array.isArray(p.types.type)) {
            return p.types.type[0].name;
        } else
            return p.types.type.name;
    }
    return ''
}

export const comparePokemonNames = (a: PokemonObjectType, b: PokemonObjectType) => {
    return a.name.localeCompare(b.name);
}

export const comparePokemonTypes = (a: PokemonObjectType, b: PokemonObjectType) => {
    const type1 = getPokemonType(a);
    const type2 = getPokemonType(b);
    return type1.localeCompare(type2);
}

export function generateToken() {
    return 'token' + Math.random() % 100;
}