import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const UploadPhoto = ({ socket }) => {
  const navigate = useHistory();
  const [photoURL, setPhotoURL] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = localStorage.getItem('_myEmail');
    socket.emit('uploadPhoto', { email, photoURL });
  };

  useEffect(() => {
    function authenticateUser() {
      const email = localStorage.getItem('_myEmail');
      if (!email) {
        navigate.push('/');
      }
    }
    authenticateUser();
  }, [navigate]);

  useEffect(() => {
    socket.on('uploadPhotoSuccess', (data) => {
      console.log(data);
      navigate.push('/photos');
    });
    socket.on('uploadPhotoError', (data) => {
      console.log(data);
      navigate.push('/photos');
    });
  }, [socket, navigate]);

  return (
    <main className="uploadContainer">
      <div className="uploadText">
        <h2>Upload Image</h2>
        <form onSubmit={handleSubmit}>
          <label>Paste the image URL</label>
          <input
            type="text"
            name="fileImage"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
          <button className="uploadBtn" type="submit">
            UPLOAD
          </button>
        </form>
      </div>
    </main>
  );
};

export default UploadPhoto;
