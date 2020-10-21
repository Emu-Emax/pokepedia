import {combineReducers} from "redux";
import pokemonReducer from "./pokemonReducer";
import userReducer from "./userReducer";

const RootReducer = combineReducers({
    pokemonReducer: pokemonReducer,
    userReducer: userReducer,
});

export default RootReducer