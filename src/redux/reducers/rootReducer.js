import { combineReducers } from "redux";
import { PostReducer, CommentsReducer } from ".";

const rootReducer = combineReducers({
    PostReducer,
    CommentsReducer
});

export default rootReducer;