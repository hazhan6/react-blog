  export const PostReducer = (state = {data:[]}, action) => {
    switch (action.type) {
      case "GET_ALLPOSTS":
        return {
          ...state,
          data: action.payload.data,
          total: action.payload.data.length
        };

      case "GET_POSTBYID":
        return {
          ...state,
          data: action.payload.data,
        };

      case "GET_ADDPOST":
        return {
          ...state,
          data: action.payload.data,
          total: state.total + 1
        };
      
      case "GET_UPDATEPOST":
        return {
          ...state,
          data: action.payload.data,
        };
  
      case "GET_DELETEPOST":
        return {
          ...state,
          data: action.payload.data,
          total: state.total - 1
        };

      default:
        return state;
    }
  };

  export const CommentsReducer = (state = {comments:[]}, action) => {
    switch (action.type) {
      case "GET_COMMENTS":
        return {
          ...state,
          comments: action.payload.data,
        };

      default:
        return state;
    }
  };
  