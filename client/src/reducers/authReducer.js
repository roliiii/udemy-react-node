import { FETCH_USER } from "../actions/types";


const defaultState = null

export default function authReducer(state = defaultState, action) {
    console.log(action)
    switch (action.type) {
        case (FETCH_USER): 
            return action.payload || false;
        default:
            return state;
    }
}