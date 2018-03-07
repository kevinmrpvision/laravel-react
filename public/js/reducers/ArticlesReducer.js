export default function reducer(state={
    articles: [],
    article: null,
    fetched: false,
    error: null
}, action){

  switch (action.type){

    case "FETCH_ARTICLES_REJECTED": {
      return {
        ...state,
        fetched: false,
        error: action.payload
      }
    }

    case "FETCH_ARTICLES_FULFILLED": {
      return {
        ...state,
        fetched: true,
        articles: action.payload.data.articles,
      }
    }

    case "FETCH_ARTICLE_REJECTED": {
      return {
        ...state,
        fetched: false,
        error: action.payload
      }
    }

    case "FETCH_ARTICLE_FULFILLED": {
      return {
        ...state,
        fetched: true,
        article: action.payload
      }
    }

  }

  return state;

}
