import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { PostContext } from '../../context/PostContext';

const AddPostModal = (props) => {
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'to learn',
    });

    const resetPostForm = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'to learn',
        });
        setModalShow(false);
    };

    const handleChangeNewPost = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value,
        });
    };

    const {
        modalControls: [modalShow, setModalShow],
        addPost,
        toastControls: [toast, setToast],
    } = useContext(PostContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success, message } = await addPost(newPost);
        setToast({
            ...toast,
            show: true,
            message,
            type: success ? 'success' : 'danger',
        });
        resetPostForm();
    };
    const hideModal = () => {
        resetPostForm();
    };

    return (
        <Modal
            onHide={hideModal}
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Bạn muốn thêm gì?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            required
                            value={newPost.title}
                            onChange={handleChangeNewPost}
                            name="title"
                            type="text"
                            placeholder="Enter title"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            value={newPost.description}
                            onChange={handleChangeNewPost}
                            placeholder="Mô tả"
                            name="description"
                            as="textarea"
                            rows={3}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            value={newPost.url}
                            onChange={handleChangeNewPost}
                            name="url"
                            type="text"
                            placeholder="Url"
                        />
                    </Form.Group>
                    <Button variant="success" onClick={hideModal}>
                        Close
                    </Button>
                    <Button type="submit" variant="danger">
                        Learn
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddPostModal;
