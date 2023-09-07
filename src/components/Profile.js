import React, { useState } from "react";

const Profile = () => {
  // You can initialize user data here or fetch it from an API
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    location: "",
    interests: "",
  });

  const containerStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const imgStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    margin: "0 auto",
    display: "block",
  };

  const userInfoStyle = {
    marginTop: "20px",
    textAlign: "center",
  };

  const buttonStyle = {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const handleEditProfile = () => {
    const [userProfile, setUserProfile] = useState({
      name: "",
      email: "",

    });

    const updatedProfile = { ...userProfile };


    const editedProfile = prompt("Edit your profile", JSON.stringify(updatedProfile));

    if (editedProfile) {
      try {

        const parsedProfile = JSON.parse(editedProfile);


        setUserProfile(parsedProfile);

        alert("Profile updated successfully!");
      } catch (error) {
        alert("Invalid profile data. Please try again.");
      }
    }
  };


  return (
    <div>
      <h1>Profile</h1>
      <div style={containerStyle}>
        <img src="profile-image.jpg" alt="User Profile" style={imgStyle} />
        <div style={userInfoStyle}>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Location:</strong> {userData.location}
          </p>
          <p>
            <strong>Interests:</strong> {userData.interests}
          </p>
        </div>
        <button style={buttonStyle} onClick={handleEditProfile}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
