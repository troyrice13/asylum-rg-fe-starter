import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const handleVerifyEmail = () => {
    alert('Verification email sent! Please check your inbox.');
  };

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  console.log(user);

  return (
    isAuthenticated && (
      <div className="profile-container">
        <h2>Profile</h2>
        <img src={user.picture} alt={user.name} />
        <h3>{user.nickname}</h3>
        <p>{user.email}</p>
        {user.email_verified ? (
          <p>Email Verified</p>
        ) : (
          <div>
            <p className="verification-message">Email not verified</p>
            <button className="verify-button" onClick={handleVerifyEmail}>
              Verify Email
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default ProfilePage;
