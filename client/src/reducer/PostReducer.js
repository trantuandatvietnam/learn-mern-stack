const postReducer = (state, action) => {
    switch (action.type) {
        case 'POST_LOADED_SUCCESS': {
            return {
                ...state,
                posts: action.payload,
                postLoading: false,
            };
        }
        case 'POST_LOADED_FAIL': {
            return {
                ...state,
                posts: [],
                postLoading: false,
            };
        }
        case 'ADD_POST': {
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
        }
        case 'DELETE_POST': {
            const postIndex = state.posts.findIndex(
                (post) => post._id === action.payload
            );
            const newPosts = [...state.posts];
            newPosts.splice(postIndex, 1);
            return {
                ...state,
                posts: [...newPosts],
            };
        }
        case 'UPDATE_POST': {
            const newPosts = state.posts.map((post) =>
                post._id === action.payload._id ? action.payload : post
            );
            return {
                ...state,
                posts: newPosts,
            };
        }
        case 'FIND_POST': {
            return {
                ...state,
                postFound: action.payload,
            };
        }
        case 'RESET_POST_EDIT': {
            return {
                ...state,
                postFound: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default postReducer;
