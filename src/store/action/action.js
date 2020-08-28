import * as actionTypes from "./actionType";

export const restoreItem = (data) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.RESTORE_ITEM,
            payload: data
        })
    }
}

export const moveToTrash = (item) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.MOVE_TO_TRASH,
            payload: item
        })
    }
}

export const addNewData = (item) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.ADD_NEW_ITEM,
            payload: item
        })
    }
}