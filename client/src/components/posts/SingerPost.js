import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import ActionsButton from './ActionsButton';

const SingerPost = ({ post }) => {
    return (
        <Card
            border={
                post.status === 'learned'
                    ? 'success'
                    : post.status === 'learning'
                    ? 'warning'
                    : 'danger'
            }
            style={{ marginTop: '24px' }}
        >
            <Card.Body>
                <Badge
                    bg={
                        post.status === 'learned'
                            ? 'success'
                            : post.status === 'learning'
                            ? 'warning'
                            : 'danger'
                    }
                >
                    {post.status}
                </Badge>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <ActionsButton url={post.url} _id={post._id} />
            </Card.Body>
        </Card>
    );
};

export default SingerPost;
