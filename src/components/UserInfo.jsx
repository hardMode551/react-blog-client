import React from 'react';
import noAvatar from '../assets/images/no-avatar.png';

const UserInfo = ({ avatarUrl, fullName }) => {
  return (
    <>
      <img src={avatarUrl || noAvatar} alt={fullName} />
      <p>{fullName}</p>
    </>
  );
};

export default UserInfo;
