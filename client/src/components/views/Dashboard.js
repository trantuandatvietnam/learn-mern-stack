import React, { useContext, useEffect } from 'react';
import {
    Button,
    Col,
    Container,
    Row,
    Spinner,
    Toast,
    ToastContainer,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import addIcon from '../../assets/plus-circle-fill.svg';
import { AuthContext } from '../../context/AuthContextProvider';
import { PostContext } from '../../context/PostContext';
import NavbarHeader from '../layout/Navbar';
import AddPostModal from '../posts/AddPostModal';
import EditPostModal from '../posts/EditPostModal';
import SingerPost from '../posts/SingerPost';

const Dashboard = () => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        postState: { posts, postLoading, postFound },
        getAllPosts,
        modalControls: [, setShowModal],
        toastControls: [toast, setToast],
    } = useContext(PostContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate, isAuthenticated]);

    useEffect(() => {
        getAllPosts();
        // eslint-disable-next-line
    }, []);

    // show loading
    if (authLoading || postLoading) {
        return (
            <div className="spinner-container">
                <Spinner animation="grow" variant="light" />
            </div>
        );
    }

    return (
        <>
            {isAuthenticated && (
                <div>
                    <NavbarHeader />
                    <Container>
                        <Button
                            onClick={() => setShowModal(true)}
                            className="mt-3"
                            variant="primary"
                        >
                            Thêm công việc
                            <img className="ms-3" src={addIcon} alt="" />
                        </Button>
                        <Row>
                            {posts.length !== 0 ? (
                                posts.map((post) => (
                                    <Col key={post._id} md={4}>
                                        <SingerPost post={post} />
                                    </Col>
                                ))
                            ) : (
                                <div>
                                    <h3>Bạn chưa có bản ghi nào!</h3>
                                    <p>Bấm để tạo bản ghi!</p>
                                </div>
                            )}
                        </Row>
                    </Container>
                    <AddPostModal />
                    {postFound && <EditPostModal />}
                    <ToastContainer position="top-end" className="p-3">
                        <Toast
                            onClose={() => setToast({ ...toast, show: false })}
                            delay={3000}
                            autohide
                            bg={
                                (toast.type = 'success'
                                    ? toast.type
                                    : toast.type === 'warning'
                                    ? toast.type
                                    : 'danger')
                            }
                            show={toast.show}
                        >
                            <Toast.Header>
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
                                <strong className="me-auto">Notify</strong>
                                <small className="text-muted">just now</small>
                            </Toast.Header>
                            <Toast.Body className="text-white">
                                {toast.message}
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                </div>
            )}
        </>
    );
};

export default Dashboard;
