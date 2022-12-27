import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Skeletons/Spinner';

const Tags = ({ isLoadingTags, items }) => {
  return (
    <>
      {(isLoadingTags ? [...Array(5)] : items).map((name, i) => (
        <Link key={i} to={`/posts/tags/${name}`}>
          {isLoadingTags ? <Spinner /> : <p>{name}</p>}
        </Link>
      ))}
    </>
  );
};

export default Tags;
