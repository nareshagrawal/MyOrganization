import React, { useEffect, useState } from 'react';
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './profile.scss';
import Cookies from 'js-cookie';
import Select from 'react-select'
import userService from '../../services/users.service'

function Profile(props) {

  const [usersList, setUsersList] = useState([]);
  const [orgID, setOrgID] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [managerEmail, setManagerEmail] = useState({});

  const token = Cookies.get('tokenId');
  const googleId = Cookies.get('googleId');
  const orgId = Cookies.get('orgId');

  const getUsers = async () => {
    const response = await userService.getUsersByGoogleId(token, { googleId });
    console.log("response", response);
    const userList = response
      .filter(user => user.googleID !== googleId)
      .map(object => { return { value: object.email, label: object.userName } });
    //    console.log("response", response)
    setUsersList(userList)
    //this.setState({ userList: userList });

  }

  // Loading profile on page load
  useEffect(() => {
    getUsers();
    // Getting user profile
    fetch(`http://localhost:8081/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'tokenId': token
      },
    })
      .then(response => response.json())
      .then(data => {
        // Setting the states
        console.log("data", data)
        setUserName(data.userName);
        setOrgID(data.orgID);
        setuserEmail(data.email);
        setAddress(data.address);
        setphoneNumber(data.phoneNumber);
        setRole(data.role);
        setManagerEmail({ value: data.managerDetail.email, label: data.managerDetail.userName });
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, []);


  // updating profile
  const updateProfile = (e) => {
    e.preventDefault();
    console.log("in update profile!")
    fetch('http://localhost:8081/updateprofile/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'tokenId': token
      },
      body: JSON.stringify({
        managerDetail: { email: managerEmail.value, userName: managerEmail.label },
        role: role,
        phoneNumber: phoneNumber,
        address: address
      }),
    })
      .then(response => {
        response.json().then(data => {
          console.log('Success:', data);
          // snacke bar
          let x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        })
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }



  return (
    <div className="profile-container">
      <div id="snackbar">Profile Updated</div>
      <p>Org ID: {orgID}</p>
      <div>
        <Form onSubmit={updateProfile}>
          <Form.Group>
            <Form.Group controlId="userName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                defaultValue={userName}
                readOnly
                required />
            </Form.Group>
            <Form.Group controlId="userEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className="form-control"
                defaultValue={userEmail}
                readOnly
                required />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => { setphoneNumber(e.target.value) }}
                placeholder="Enter Phone Number"
                required />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => { setAddress(e.target.value) }}
                placeholder="Enter Address"
                required />
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                value={role}
                onChange={(e) => { setRole(e.target.value) }}
                placeholder="Enter Role"
                required />
            </Form.Group>
            <Form.Group controlId="managerName">
              <Form.Label>Manager Name</Form.Label>
              {/* <Form.Control
                type="text"
                className="form-control"
                value={managerName}
                onChange={(e) => { setManagerName(e.target.value) }}
                placeholder="Enter Manager Name"
                required /> */}
              <Select
                id="attendees"
                value={managerEmail}
                options={usersList}
                isMulti={false}
                onChange={(event) => {
                  // console.log(event)
                  setManagerEmail(event)
                }}
                placeholder="Select Manager Email"
              >

              </Select>
            </Form.Group>
          </Form.Group>
          <div>
            <Button type="submit" className="bg-dark w-100 form-control">Update</Button>
          </div>
        </Form>
      </div>
    </div >
  );
}

export default Profile;