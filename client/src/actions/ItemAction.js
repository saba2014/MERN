import { GET_ITEMS, ADD_ITEM, DELETE_ITEM,EDIT_ITEM, ITEMS_LOADING } from "./types";
import axios from 'axios';
import { tokenConfig } from "./authAction";
import { returnErrors } from "./errorAction";

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload:res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addItem = item => (dispatch, getState) =>{
    axios
        .post('/api/items', item, tokenConfig(getState) )
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};


export const deleteItem = id => (dispatch, getState) => {
   axios
       .delete(`/api/items/${id}`, tokenConfig(getState))
       .then(res =>
       dispatch({
          type: DELETE_ITEM,
          payload:id
       }))
       .catch(err =>
           dispatch(returnErrors(err.response.data, err.response.status))
       );
};

export const setItemsLoading = () => {
    return{
        type: ITEMS_LOADING,

    }
};


export const editItem = newItem => (dispatch, getState) => {
    axios
        .put(`/api/items/${newItem._id}`, newItem, tokenConfig(getState))
        .then(res =>{
           dispatch({
                type: EDIT_ITEM,
                payload: newItem

            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};