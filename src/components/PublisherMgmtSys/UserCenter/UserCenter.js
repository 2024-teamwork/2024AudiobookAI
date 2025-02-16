import React, { useState } from "react";
import "./UserCenter.css";
import userCenterAvatar from "../../../images/userCenterAvatar.png";
import camera from "../../../images/camera.png";
import Navigation from "../../Layout/navigation/Navigation";

const countryOptions = [
  "China", "United States", "United Kingdom", "Germany", "France", "Canada", "Australia", "Japan",
  "South Korea", "India", "Brazil", "Russia", "Mexico", "Italy", "Spain", "Netherlands", "Sweden",
  "Switzerland", "Singapore", "United Arab Emirates", "Saudi Arabia", "South Africa"
];

const UserCenter = () => {
  const initialUserData = {
    name: "Alphalio",
    email: "Alphalio@163.com",
    phone: "00000000000",
    gender: "female",
    country: "China",
    address: "xxx",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState(initialUserData);
  const [hasChanges, setHasChanges] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const updateAvatar = () => {
    // TODO: Implement image upload to cloud
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log("Selected file:", file); // Debugging log
      }
    };
    fileInput.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...tempData, [name]: value };
    setTempData(updatedData);
    setHasChanges(JSON.stringify(updatedData) !== JSON.stringify(userData));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    if (hasChanges) {
      setShowPopup(true);
    } else {
      setEditMode(false);
    }
  };

  const confirmCancel = () => {
    setEditMode(false);
    setTempData(userData);
    setHasChanges(false);
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleUpdate = () => {
    setUserData(tempData);
    setEditMode(false);
    setHasChanges(false);
  };

  return (
    <div className="user-center-page">
    <Navigation/>
    <div className="user-center">
      <h2>Account Setting</h2>
      <div className="profile">
      <img src={userCenterAvatar} alt="Avatar" className="avatar" />
      <div className="camera-icon" onClick={updateAvatar}>
        <img src={camera} alt="Camera Icon" />
      </div>
    </div>

      <div className={`form ${editMode ? "edit-mode" : "view-mode"}`}>
        <div className="row">
          <div className="input-box">
            <label>Name</label>
            {editMode ? (
              <input className="input-field" type="text" name="name" value={tempData.name} onChange={handleInputChange} />
            ) : (
              <p>{userData.name}</p>
            )}
          </div>
          <div className="input-box">
            <label>Email</label>
            {editMode ? (
              <input className="input-field" type="email" name="email" value={tempData.email} onChange={handleInputChange} />
            ) : (
              <p>{userData.email}</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="input-box">
            <label>Phone Number</label>
            {editMode ? (
              <input className="input-field" type="text" name="phone" value={tempData.phone} onChange={handleInputChange} />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>
          <div className="input-box">
            <label>Gender:</label>
            {editMode ? (
                <div className="radio-group">
                <label>
                    <input type="radio" name="gender" value="female" checked={tempData.gender === "female"} onChange={handleInputChange} />
                    Female
                </label>
                <label>
                    <input type="radio" name="gender" value="male" checked={tempData.gender === "male"} onChange={handleInputChange} />
                    Male
                </label>
                <label>
                    <input type="radio" name="gender" value="non-binary" checked={tempData.gender === "non-binary"} onChange={handleInputChange} />
                    Non-binary
                </label>
                </div>
            ) : (
                <p>{userData.gender === "female" ? "Female" : userData.gender === "male" ? "Male" : "Non-binary"}</p>
            )}
            </div>
        </div>
        <div className="row">
          <div className="input-box">
            <label>Country/Region</label>
            <div className="dropdown-container">
              {editMode ? (
                <select className="input-field" name="country" value={tempData.country} onChange={handleInputChange}>
                  {countryOptions.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              ) : (
                <p>{userData.country}</p>
              )}
            </div>
          </div>
          <div className="input-box">
            <label>Address</label>
            {editMode ? (
              <input className="input-field" type="text" name="address" value={tempData.address} onChange={handleInputChange} />
            ) : (
              <p>{userData.address}</p>
            )}
          </div>
        </div>
      </div>
      <div className="buttons">
        {editMode ? (
          <>
            <button onClick={handleUpdate} disabled={!hasChanges} className="update-btn">Update</button>
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
          </>
        ) : (
          <button onClick={handleEdit} className="edit-btn">Edit</button>
        )}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>You have unsaved changes. Do you want to discard them?</p>
            <div className="popup-button-container">
              <button onClick={confirmCancel} className="confirm-btn">Yes</button>
              <button onClick={closePopup} className="close-btn">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default UserCenter;