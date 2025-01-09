import React, { useState } from 'react';
import './Settings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const Settings = ({handleLogout}) => {
  const userInfo = JSON.parse(sessionStorage.userInfo);
  // State to hold form data
  const [formData, setFormData] = useState({
    displayName: userInfo.displayname,
    fullName: userInfo.name,
    position: userInfo.position,
    email: userInfo.email,
    phoneNumber: userInfo.mobile,
    username: userInfo.email,
    password: userInfo.password,
  });

  const [isEditable, setIsEditable] = useState({
    displayName: false,
    fullName: false,
    position: false,
    email: false,
    phoneNumber: false,
    password: false,
  });

  const [isSaveActive, setIsSaveActive] = useState(false);

  // Handle input change
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsSaveActive(true);
  };

  // Enable editing for a field
  const enableEdit = (field) => {
    setIsEditable((prev) => ({ ...prev, [field]: true }));
  };

  // Handle save button click
  const handleSave = async () => {
    console.log('Saved data:', formData);
    try {
      const response = await axios.post('http://localhost:8080/api/admin/update',{
          email: formData.email,
          displayname: formData.displayName,
          position: formData.position,
        }
      );
      setFormData(response.data);
      alert("Request Submitted Data will be upload after next login")
      console.log(response.data);
    } catch (error) {
      console.log("Error in Settings", error);
    }
    setIsSaveActive(false);
    setIsEditable({
      displayName: false,
      fullName: false,
      position: false,
      email: false,
      phoneNumber: false,
      password: false,
    });
  };

  return (
    <div className="settings-container">
      <h2 className='settings-heading'>Settings</h2>

      {/* General Section */}
      <div className="section">
        <h3 className='settings-heading'>General</h3>
        <div className="input-group">
          <label>Display Name</label>
          <input
            type="text"
            value={formData.displayName}
            onChange={(e) => handleChange('displayName', e.target.value)}
            readOnly={!isEditable.displayName}
          />
          <FontAwesomeIcon icon={faPen} onClick={() => enableEdit('displayName')} />
        </div>
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            readOnly={!isEditable.fullName}
          />
          <FontAwesomeIcon icon={faPen} onClick={() => enableEdit('fullName')} />
        </div>
        <div className="input-group">
          <label>Position</label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => handleChange('position', e.target.value)}
            readOnly={!isEditable.position}
          />
          <FontAwesomeIcon icon={faPen} onClick={() => enableEdit('position')} />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            readOnly={!isEditable.email}
          />
          {/* <FontAwesomeIcon icon={faPen} onClick={() => enableEdit('email')} /> */}
        </div>
        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="text"
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            readOnly={!isEditable.phoneNumber}
          />
          {/* <FontAwesomeIcon icon={faPen} onClick={() => enableEdit('phoneNumber')} /> */}
        </div>
      </div>

      {/* Login Info Section */}
      <div className="section">
        <h3 className='settings-heading'>Login Info</h3>
        <div className="input-group ">
          <label >Username (Email)</label>
          <input
            type="text"
            value={formData.username}
            readOnly
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            readOnly={!isEditable.password}
          />
          {/* <FontAwesomeIcon icon={faPen} onClick={() => enableEdit('password')} /> */}
        </div>
      </div>

      {/* Save Button */}
      {isSaveActive && (
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      )}
      <div className='text-center float-right mt-3 btn btn-danger' onClick={handleLogout}>Logout</div>
    </div>
  );
};

export default Settings;