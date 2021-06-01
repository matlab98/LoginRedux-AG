import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null,
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.notesLoad:
            console.log(action.payload)
            return {
                ...state,
                notes: [...action.payload]
            }

        case types.notesUpdate:
            console.log(action.payload.id)
            return {
                ...state,
                notes: state.notes.map(
                    notes => notes.id === action.payload.id
                        ? action.payload.notes
                        : notes
                )
            }

        default:
            return state;
    }
}