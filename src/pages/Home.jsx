import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPosts, fetchTags } from '../redux/slices/Posts/asyncActions';
import GetStarted from '../components/GetStarted';
import Post from '../components/Post';
import Tags from '../components/Tags';
import Spinner from '../components/Skeletons/Spinner';

import styles from '../components/scss/Articles.module.scss';

const Home = () => {
  const { posts } = useSelector((state) => state.posts);
  const { tags } = useSelector((state) => state.tags);
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  const isLoadingPosts = posts.status === 'loading';
  const isLoadingTags = tags.status === 'loading';

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  if (isLoadingPosts) {
    return <Spinner />;
  }
  return (
    <>
      <GetStarted />
      <div className={styles.root}>
        <div className={styles.title}>
          <nav className={styles.navButtons}>
            <button className={styles.changePopular}>Популярные статьи</button>
            <button className={styles.changeNew}>Новые статьи</button>
          </nav>
        </div>
        <section className={styles.content}>
          <div className={styles.tags}>
            <h3>УЗНАЙТЕ БОЛЬШЕ О ВАЖНОМ ДЛЯ ВАС</h3>

            <div className={styles.tagsList}>
              <Tags isLoadingTags={isLoadingTags} items={tags.items} />
            </div>
          </div>
          <div className={styles.articles}>
            {(isLoadingPosts ? [...Array(5)] : posts.items).map((obj, index) =>
              isLoadingPosts ? (
                <Post key={index} isLoadingPosts={true} />
              ) : (
                <>
                  <Post
                    id={obj._id}
                    title={obj.title}
                    text={obj.text}
                    imageUrl={
                      obj.imageUrl ? `${process.env.REACT_APP_API_URL}/${obj.imageUrl}` : ''
                    }
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    tags={obj.tags}
                    isEditable={userData?._id === obj.user._id}
                  />
                </>
              ),
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
