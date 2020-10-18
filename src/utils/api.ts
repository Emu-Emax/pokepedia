import axios from 'axios';

// interface ServerResponse {
//     data: ServerData
// }
//
// interface ServerData {
//     foo: string
//     bar: number
// }


const API = {
    getPokemon: (pokeName: string) => get('/' + pokeName + '/', {}),
};

export default API;

const APP_URL = 'https://pokeapi.co/api/v2/';

const http = axios.create({
    baseURL: APP_URL,
    timeout: 15000,
    headers: {
    'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
},
});

export function get(path: string, requestHeaders : object) {
    return http.get(path, { headers: requestHeaders});
}