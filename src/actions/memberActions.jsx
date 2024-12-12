import {ActionTypes} from "../constants/action-types";

export const viewMember = () => dispatch => {
    //get api request
    dispatch({
        type:ActionTypes.VIEW_MEMBER,
        payload:[],
    })
}