import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import axios from "axios";

//get the items action
export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios.get("api/items").then((res) =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    })
  );
};

//add an item action
export const addItem = (item) => (dispatch) => {
  axios.post("api/items", item).then((res) =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    })
  );
};

//delete an item action
export const deleteItem = (id) => (dispatch) => {
  axios.delete(`api/items/${id}`).then((res) =>
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    })
  );
};

//set loading action (while getting items)
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
