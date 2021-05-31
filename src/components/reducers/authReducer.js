import { types } from '../types/types'

// const initialState = {
//     uid: 123,
//     name: 'Jenny',
//     dir: {
//         b:12
//     }
// }

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                uid: action.payLoad.uid,
                name: action.payLoad.displayName
            }
        case types.logout:
            return { }

        default:
            return state
    }
}