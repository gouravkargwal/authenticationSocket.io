const database = [];

const registerUser = ({ username, email, password }) => {
  let result = database.filter(
    (user) => user.email === email || user.username === username
  );
  if (result.length === 0) {
    const user = {
      username,
      password,
      email,
      images: [],
    };
    database.push(user);
    return { user };
  } else {
    return { error: "User already exists!" };
  }
};

const loginUser = ({ username, password }) => {
  let result = database.filter(
    (user) => user.username === username && user.password === password
  );
  if (result.length !== 1) {
    return { error: "Incorrect credentials" };
  } else {
    const user = {
      _email: result[0].email,
    };
    return {
      user,
    };
  }
};

const uploadPhoto = ({ email, photoURL }) => {
  let result = database.filter((user) => user.email === email);
  if (result.length === 0) {
    return { error: "User not found!" };
  } else {
    const newImage = {
      image_url: photoURL,
      _ref: email,
    };
    result[0]?.images.unshift(newImage);
    return { image: newImage };
  }
};

const allPhotos = () => {
  let images = [];
  for (let i = 0; i < database.length; i++) {
    images = images.concat(database[i]?.images);
  }
  return { images };
};

module.exports = {
  registerUser,
  loginUser,
  uploadPhoto,
  allPhotos,
};
