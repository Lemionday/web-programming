import React from 'react';
import maleAvatar from './assets/male.jpg';
import femaleAvatar from './assets/female.jpg';


const Avatar = ({ gender }) => {
  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  };

  const getAvatarImage = () => {
    if (gender === 'nam') {
      return maleAvatar;
    } else return femaleAvatar;
  };

  return <img src={getAvatarImage()} alt="Avatar" style={avatarStyle} />;
};

export default Avatar;
