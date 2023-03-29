import axios from "axios";
import { fetchDataRequest, fetchDataSuccess, fetchDataError } from "./action";

export function fetchProducts(pageNumber) {
  return dispatch => {
    dispatch(fetchDataRequest());
    axios
      .get(
        `${process.env.REACT_APP_API_URL}beers?page=${pageNumber}&per_page=10`
      )
      .then(response => {
        dispatch(fetchDataSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchDataError(error));
      });
  };
}