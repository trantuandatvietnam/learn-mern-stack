import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { PostContext } from '../../context/PostContext';

const EditPostModal = (props) => {
    const {
        postState: { postFound },
    } = useContext(PostContext);
    const {
        updatePost,
        resetPostEdit,
        toastControls: [toast, setToast],
    } = useContext(PostContext);

    const [postEdit, setPostEdit] = useState({
        ...postFound,
    });

    const resetPostForm = () => {
        setPostEdit({
            title: '',
            description: '',
            url: '',
            status: 'to learn',
        });
    };

    const handleChangeEditPost = (e) => {
        setPostEdit({
            ...postEdit,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success, message } = await updatePost(postEdit);
        setToast({
            ...toast,
            show: true,
            message: message,
            type: success ? 'success' : 'danger',
        });
        resetPostForm();
        resetPostEdit();
    };
    const hideModal = () => {
        resetPostForm();
        resetPostEdit();
    };

    return (
        <Modal
            onHide={hideModal}
            show={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Sửa bản ghi của bạn
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            required
                            value={postEdit?.title}
                            onChange={handleChangeEditPost}
                            name="title"
                            type="text"
                            placeholder="Enter title"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            value={postEdit?.description}
                            onChange={handleChangeEditPost}
                            placeholder="Mô tả"
                            name="description"
                            as="textarea"
                            rows={3}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            value={postEdit?.url}
                            onChange={handleChangeEditPost}
                            name="url"
                            type="text"
                            placeholder="Url"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Select
                            onChange={handleChangeEditPost}
                            value={postEdit.status}
                            name="status"
                            aria-label="Default select example"
                        >
                            <option>Trạng thái</option>
                            <option value="to learn">sẽ học</option>
                            <option value="learned">Đã học</option>
                            <option value="learning">đang học</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="success" onClick={hideModal}>
                        Close
                    </Button>
                    <Button type="submit" variant="danger">
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditPostModal;
