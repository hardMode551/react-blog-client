import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import UserInfo from './UserInfo';
import { useDispatch } from 'react-redux';
import { fetchRemovePost } from '../redux/slices/Posts/asyncActions';

import Spinner from './Skeletons/Spinner';

import styles from './scss/Post.module.scss';

const Post = ({
  id,
  title,
  text,
  imageUrl,
  tags,
  viewsCount,
  createdAt,
  user,
  isLoadingPosts,
  isFullPost,
  isEditable,
}) => {
  const dispath = useDispatch();

  const deletePost = () => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      dispath(fetchRemovePost(id));
      return <Navigate to="/" />;
    }
  };

  if (isLoadingPosts) {
    return <Spinner />;
  }
  return (
    <div className={styles.root}>
      {imageUrl && <img className={styles.imagePost} src={imageUrl} alt={title} />}
      <div className={styles.userInfo}>{!isFullPost && <UserInfo {...user} />}</div>
      <div className={styles.post}>
        <div className={styles.title}>
          <h2>{isFullPost ? <h2>{title}</h2> : <Link to={`/FullPost/${id}`}>{title}</Link>}</h2>
          <ReactMarkdown
            className={isFullPost ? styles.fullText : styles.shortText}
            children={text}
          />

          <div className={styles.tagsBlock}>
            {tags.map((obj, index) => (
              <li key={index}>{`# ${obj}`}</li>
            ))}
          </div>
          <div className={styles.postInfo}>
            <p className={styles.viewsCount}>
              <svg
                enableBackground="new 0 0 32 32"
                height="32px"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 32 32"
                width="32px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <polyline
                    fill="none"
                    points="   649,137.999 675,137.999 675,155.999 661,155.999  "
                    stroke="#FFFFFF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  />
                  <polyline
                    fill="none"
                    points="   653,155.999 649,155.999 649,141.999  "
                    stroke="#FFFFFF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  />
                  <polyline
                    fill="none"
                    points="   661,156 653,162 653,156  "
                    stroke="#FFFFFF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  />
                </g>
                <g>
                  <g>
                    <path d="M16,25c-4.265,0-8.301-1.807-11.367-5.088c-0.377-0.403-0.355-1.036,0.048-1.413c0.404-0.377,1.036-0.355,1.414,0.048    C8.778,21.419,12.295,23,16,23c4.763,0,9.149-2.605,11.84-7c-2.69-4.395-7.077-7-11.84-7c-4.938,0-9.472,2.801-12.13,7.493    c-0.272,0.481-0.884,0.651-1.363,0.377c-0.481-0.272-0.649-0.882-0.377-1.363C5.147,10.18,10.333,7,16,7    c5.668,0,10.853,3.18,13.87,8.507c0.173,0.306,0.173,0.68,0,0.985C26.853,21.819,21.668,25,16,25z" />
                  </g>
                  <g>
                    <path d="M16,21c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S18.757,21,16,21z M16,13c-1.654,0-3,1.346-3,3s1.346,3,3,3    s3-1.346,3-3S17.654,13,16,13z" />
                  </g>
                </g>
              </svg>{' '}
              {viewsCount}
            </p>
            <label>·</label>
            <p>{createdAt}</p>
          </div>
          {isEditable && isFullPost && (
            <>
              <Link to={`/FullPost/edit/${id}`}>
                <button>Редактировать</button>
              </Link>
              <button onClick={deletePost}>Удалить</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
