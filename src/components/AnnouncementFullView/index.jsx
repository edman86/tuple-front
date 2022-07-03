import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import Announcement from "../Announcement";
import { useParams } from "react-router-dom";
import axios from "../../axios";

const AnnouncementFullView = () => {
    const [postData, setPostData] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    const { id } = params;

    useEffect(() => {
        axios.get(`/posts/${id}`)
            .then(res => {
                setPostData(res.data);
                setIsLoading(false);
            })
            .catch(err => err);
    }, []);

    if (isLoading) {
        return <Announcement isLoading={isLoading} />
    }

    return (
        <>
            <Announcement
                id={postData._id}
                title={postData.title}
                imageUrl={postData.imageUrl ? `http://localhost:5000${postData.imageUrl}` : ''}
                user={{
                    avatarUrl: postData.user.avatarUrl,
                    username: postData.user.username,
                }}
                createdAt={postData.createdAt}
                viewsCount={postData.viewsCount}
                tags={["lorem", "ipsum", "dolor"]}
                isFullPost
            >
                <ReactMarkdown children={postData.description} />
            </Announcement>
        </>
    );
};

export default AnnouncementFullView;
