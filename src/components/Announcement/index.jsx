import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';

import styles from './Announcement.module.scss';

const Announcement = ({
    id,
    title,
    createdAt,
    imageUrl,
    user,
    viewsCount,
    children,
    isFullPost,
    isLoading,
    isEditable,
}) => {
    const navigate = useNavigate();
    
    const handleEdit = (e) => {
        e.stopPropagation();

        navigate(`posts/${id}/edit`)
    };

    const handleRemove = async (e) => {
        try {
            await axios.delete(`/posts/${id}`);
            navigate("/");

        } catch (err) {
            console.log(err);
            alert('Deleting announcement error');
        }
    };
    
    const handleClickPost = (e) => {
        e.stopPropagation();
        
        if (isFullPost) {
            return;
        }
        navigate(`/posts/${id}`);
    };
    
    if (isLoading) {
        return <PostSkeleton />;
    }

    return (
        <div 
            className={clsx(styles.root, { [styles.rootFull]: isFullPost })}
            onClick={handleClickPost}
        >
            {isEditable && (
                <div className={styles.editButtons}>
                    <Link to={`/posts/${id}/edit`}>
                        <IconButton 
                            color="primary"
                            onClick={handleEdit}
                        >
                            <EditIcon />
                        </IconButton>
                    </Link>
                    <IconButton 
                        onClick={handleRemove} 
                        color="secondary"
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
            {imageUrl && (
                <img
                    className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
                    src={imageUrl}
                    alt={title}
                />
            )}
            <div className={styles.wrapper}>
                <UserInfo 
                    {...user} 
                    additionalText={createdAt} 
                />
                <div className={styles.indention}>
                    <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
                        {title}
                    </h2>
                    {children && <div className={styles.content}>{children}</div>}
                    <ul className={styles.postDetails}>
                        <li>
                            <EyeIcon />
                            <span>{viewsCount}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Announcement;
