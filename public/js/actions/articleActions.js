import axios from "axios";
import { NotificationManager } from 'react-notifications';

export function fetchArticles(){
  return function (dispatch) {
    axios.get(baseUrl+"api/v1/articles")
    .then((response) => {
      dispatch({type: "FETCH_ARTICLES_FULFILLED", payload: response.data});
    })
    .catch((error) => {
      dispatch({type: "FETCH_ARTICLES_REJECTED", payload: error});
    })
  }
}

export function fetchArticle(id){
  return function (dispatch) {
    axios.get(baseUrl+"api/v1/articles/"+id)
    .then((response) => {
      dispatch({type: "FETCH_ARTICLE_FULFILLED", payload: response.data.article});
    })
    .catch((error) => {
      dispatch({type: "FETCH_ARTICLE_REJECTED", payload: error});
    })
  }
}

export function deleteArticle(formData){
  return function (dispatch) {
    axios.post(baseUrl+"api/v1/articles/delete", formData)
    .then((response) => {
      NotificationManager.success(response.data.message, 'Success', 5000);
      dispatch(fetchArticles());
    })
    .catch((error) => {
      NotificationManager.error("An error occured in the operation", 'Error', 5000);
    })
  }
}





