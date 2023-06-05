import React, { useEffect, useState } from "react";
import useUsers from "../hook/useUsers";
import { useUser } from "../providers/UserProvider";
import UserInterface from "../interfaces/userInterface";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import "./UserProfile.css";
import { CheckCircle } from "@mui/icons-material";

const UserProfile = () => {
  const Navigate = useNavigate();
  const { handelGetUser } = useUsers();
  const { user } = useUser();
  const [userProfile, setProfile] = useState<UserInterface | undefined>(
    undefined
  );

  useEffect(() => {
    if (user?._id) {
      handelGetUser(user?._id).then((userData) => {
        if (userData!._id !== user._id) return Navigate(ROUTES.ROOT);
        setProfile(userData);
      });
    }
  }, []);

  useEffect(() => {
    if (!user) Navigate(ROUTES.ROOT);
  }, [user]);

  if (userProfile) {
    return (
      <div className="user-profile-container">
        <h2 className="user-profile-title">User Profile</h2>
        <div className="user-profile-image-container">
          <img
            className="user-profile-image"
            src={userProfile.image.url}
            alt={userProfile.image.alt}
          />
        </div>
        <div className="user-profile-details">
          <h3 className="user-profile-name">
            {`${userProfile.name.first} ${
              userProfile.name.middle ? userProfile.name.middle + " " : ""
            }${userProfile.name.last}`}
          </h3>
          <p className="user-profile-info">Phone: {userProfile.phone}</p>
          <p className="user-profile-info">Email: {userProfile.email}</p>
          <p className="user-profile-info">
            address:{" "}
            {`${userProfile.address.country} ${userProfile.address.city}  ${userProfile.address.street} ${userProfile.address.houseNumber} ${userProfile.address.zip} `}
          </p>
          <p className="user-profile-info">User Number: {userProfile._id}</p>
          {userProfile.isBusiness && (
            <p className="user-profile-info">
              {" "}
              <CheckCircle className="business-user-icon" />
              Business User
            </p>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default UserProfile;
