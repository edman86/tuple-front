import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteAnnouncement } from '../../redux/slices/announcementsSlice';

import styles from './Announcement.module.scss';

const Announcement = ({
    id,
    title,
    createdAt,
    imageUrl,
    user,
    viewsCount,
    phoneNumber,
    adress,
    category,
    children,
    isFullPost,
    isLoading,
    isEditable,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`posts/${id}/edit`);
    };

    const handleRemovePost = async (e) => {
        dispatch(deleteAnnouncement(id))
            .then(() => navigate('/'));
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
                        type="submit"
                        onClick={handleRemovePost}
                        color="secondary"
                    >
                        <DeleteForeverOutlinedIcon />
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
                <div className={styles.info}>
                    <UserInfo
                        {...user}
                        additionalText={createdAt}
                    />
                    {isFullPost &&
                        <>
                            <div className={styles.phone_number}>
                                <ContactPhoneRoundedIcon />
                                <span>
                                    Phone: {phoneNumber}
                                </span>
                            </div>
                            <div className={styles.adress}>
                                <HomeRoundedIcon />
                                <span>
                                    Adress: {adress ? adress : 'unknown'}
                                </span>
                            </div>
                        </>}
                </div>
                <div className={styles.indention}>
                    <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
                        {title}
                    </h2>
                    <Chip label={category} variant="outlined" />
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