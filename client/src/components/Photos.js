import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    function authenticateUser() {
      const email = localStorage.getItem("_myEmail");
      console.log(email);
      if (!email) {
        navigate("/");
      }
    }
    authenticateUser();
  }, [navigate]);

  useEffect(() => {
    socket.emit("allPhotos", "search");
    socket.on("allPhotosMessage", (data) => {
      setPhotos(data.photos);
    });
  }, [socket]);

  return (
    <div>
      <Nav />
      <main className="photoContainer">
        {photos &&
          photos.map((photo) => (
            <div className="photo" key={photo.image_url}>
              <div className="imageContainer">
                <img
                  src={photo.image_url}
                  className="photo__image"
                  alt={photos.image_url}
                />
              </div>
            </div>
          ))}
      </main>
    </div>
  );
};

export default Home;
