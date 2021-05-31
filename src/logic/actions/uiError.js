import { types } from '../../components/types/types'

export const setError = (err) => {
    return {
        type: types.uiSetError,
        payLoad: err
    }
}

export const removeError = () => {
    return {
        type: types.uiRemoveError,
    }
}

export const startLoading = () => ({
    type: types.uiStartLoading
})

export const finishLoading = () => ({
    type: types.uiFinishLoading
})