import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import editIcon from '../../assets/pencil.svg';
import playIcon from '../../assets/play-btn.svg';
import deleteIcon from '../../assets/trash.svg';
import { PostContext } from '../../context/PostContext';

const ActionsButton = ({ url, _id }) => {
    const { deletePost, findPost } = useContext(PostContext);

    const handleDeletePost = (postId) => {
        deletePost(postId);
    };

    const handleEditPost = (postId) => {
        findPost(postId);
    };

    return (
        <>
            <Button
                variant="link"
                className="post-button"
                href={url}
                target="_blank"
            >
                <img src={playIcon} alt="" />
            </Button>
            <Button
                onClick={() => handleDeletePost(_id)}
                variant="link"
                className="post-button"
            >
                <img src={deleteIcon} alt="" />
            </Button>
            <Button
                onClick={() => handleEditPost(_id)}
                variant="link"
                className="post-button"
            >
                <img src={editIcon} alt="" />
            </Button>
        </>
    );
};

export default ActionsButton;
