import axios from '../axios';
import React from 'react';
import { useParams } from 'react-router';
import Post from '../components/Post';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useSelector } from 'react-redux';

const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoadingPosts, setIsLoadingPosts] = React.useState(true);

  const userData = useSelector((state) => state.auth.data);

  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoadingPosts(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      });
  }, []);

  if (isLoadingPosts) {
    return <Post isLoadingPosts={isLoadingPosts} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        text={data.text}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        tags={data.tags}
        isEditable={userData?._id === data.user._id}
      >
        <ReactMarkdown children={data.text} />
      </Post>
    </>
  );
};

export default FullPost;
