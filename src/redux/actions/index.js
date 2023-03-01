import axios from 'axios';
import { 
    allPosts, 
    postById, 
    comments, 
    createPost, 
    updatePost, 
    deletePost
} from '../../config';

const userId = 1;

export const getAllPosts = () => {
    return async (dispatch) => {
        axios.get(allPosts)
        .then((response) => {
            const data = response.data?.filter(post => post.userId === userId)
            dispatch({
            type: "GET_ALLPOSTS",
            payload: {
                data,
            },
            });
        })
        .catch((error) => {
            console.log("error allPosts", error);
        });
    };
};

export const getPostById = (id) => {
    return async (dispatch) => {
        axios.get(postById, {userId:id})
        .then((response) => {
            const data = response.data
            dispatch({
            type: "GET_POSTBYID",
            payload: {
                data,
            },
            });
        })
        .catch((error) => {
            console.log("error", error);
        });
    };
};

export const getComments = (id) => {
    return async (dispatch) => {
        axios.get(comments, {postId:id})
        .then((response) => {
            const data = response.data
            dispatch({
            type: "GET_COMMENTS",
            payload: {
                data,
            },
            });
        })
        .catch((error) => {
            console.log("error getComments", error);
        });
    };
};

export const addPost = (data) => {
    return async (dispatch) => {
        axios.post(createPost,
        {
            ...data
        })
        .then((response) => {
            const data = response.data
            dispatch({
            type: "GET_ADDPOST",
            payload: {
                data,
            },
            });
        })
        .catch((error) => {
            console.log("error addPost", error);
        });
    };
};

export const updatePosts = (data) => {
    return async (dispatch) => {
        axios.put(updatePost, 
        {
            title: data.title,
            body: data.body
        },{
            params:{post_id:data.id}
        })
        .then((response) => {
            const data = response.data
            dispatch({
            type: "GET_UPDATEPOST",
            payload: {
                data,
            },
            });
        })
        .catch((error) => {
            console.log("error updatePosts", error);
        });
    };
};

export const deletePosts = (id) => {
    return async (dispatch) => {
        axios.delete(deletePost, 
            {params: {post_id:id}})
        .then((response) => {
            const data = response.data
            dispatch({
            type: "GET_DELETEPOST",
            payload: {
                data,
            },
            });
        })
        .catch((error) => {
            console.log("error deletePosts", error);
        });
    };
};
