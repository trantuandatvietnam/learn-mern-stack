import axios from 'axios';
import React, { createContext, useReducer, useState } from 'react';
import postReducer from '../reducer/PostReducer';
import { API_URL } from './constans';
export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    const [postState, dispatch] = useReducer(postReducer, {
        postFound: null,
        posts: [],
        postLoading: true,
    });

    const [modalShow, setModalShow] = useState(false);
    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: null,
    });

    // get all posts
    const getAllPosts = async () => {
        try {
            const res = await axios.get(`${API_URL}/posts`);
            if (res.data.success) {
                dispatch({
                    type: 'POST_LOADED_SUCCESS',
                    payload: res.data.posts,
                });
            }
        } catch (error) {
            dispatch({
                type: 'POST_LOADED_FAIL',
            });
        }
    };
    // create post
    const addPost = async (newPostForm) => {
        try {
            const res = await axios.post(`${API_URL}/posts`, newPostForm);
            if (res.data.success) {
                dispatch({
                    type: 'ADD_POST',
                    payload: res.data.newPost,
                });
            }
            return { success: true, message: 'Post success' };
        } catch (error) {
            // error.response.data của server chủ động trả lại lỗi
            return error.response.data
                ? error.response.data
                : { success: false, message: 'server err' };
        }
    };
    // delete post
    const deletePost = async (postId) => {
        try {
            const res = await axios.delete(`${API_URL}/posts/${postId}`);
            console.log(res);
            if (res.data.success) {
                dispatch({
                    type: 'DELETE_POST',
                    payload: postId,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    // update post
    const updatePost = async (postUpdate) => {
        try {
            const res = await axios.put(
                `${API_URL}/posts/${postUpdate._id}`,
                postUpdate
            );
            if (res.data.success) {
                dispatch({
                    type: 'UPDATE_POST',
                    payload: res.data.postUpdate,
                });
            }
            return res.data;
        } catch (error) {
            return { success: false, message: 'Update post is fail!' };
        }
    };
    // find post
    const findPost = (postId) => {
        const postFound = postState.posts.find((post) => post._id === postId);
        dispatch({
            type: 'FIND_POST',
            payload: postFound,
        });
    };
    // reset postEdit
    const resetPostEdit = () => {
        dispatch({
            type: 'RESET_POST_EDIT',
            payload: null,
        });
    };

    const postContextData = {
        postState,
        resetPostEdit,
        findPost,
        updatePost,
        getAllPosts,
        addPost,
        deletePost,
        modalControls: [modalShow, setModalShow],
        toastControls: [toast, setToast],
    };
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
