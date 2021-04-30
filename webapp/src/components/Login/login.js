import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './login.scss';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../../utils/refreshToken';
import GoogleConfig from './../../apiGoogleconfig';
import Cookies from 'js-cookie';
import UserContext from './../../contexts/UserContext';
import { getOrgDetails } from '../../actions/organizationActions'
import { getAllUsers } from '../../actions/usersActions'
import orgServices from '../../services/org.service'
import userService from '../../services/users.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/fontawesome-free-solid'

const clientId = GoogleConfig.clientId;

function Login(props) {

  // States
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  const [isRegister, setisRegister] = useState(false);
  const [orgID, setOrgID] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [orgPh, setOrgPh] = useState('');
  const [orgAddress, setOrgAddress] = useState('');

  const updateOrgDetails = async (tokenId, orgID) => {
    const response = await orgServices
      .getOrgDetails(tokenId, orgID);
    props.getOrgDetails(response);
  }

  const getUsers = async (tokenId, googleId) => {

    const response = await userService.getUsersByGoogleId(tokenId, { googleId });
    console.log("response", response);
    props.getAllUsers(response)

  }

  // on success by google login
  const onSuccess = (res) => {

    refreshTokenSetup(res);
    Cookies.set('tokenId', res.tokenId);
    Cookies.set('accessToken', res.accessToken);
    Cookies.set('googleId', res.googleId);
    Cookies.set('orgId', orgID);

    setIsAuthenticated(true);
    updateOrgDetails(res.tokenId, orgID);
    getUsers(res.tokenId, res.googleId);
    console.log('orgID', orgID);
    //saving user to database
    fetch('http://localhost:8081/login/' + orgID, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'tokenId': res.tokenId
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    //  updateOrgDetails(res.tokenId, orgID);
    props.history.push("dashboard");
  };

  // on failure by google login
  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  // registering organization
  const orgRegistration = (e) => {
    e.preventDefault();
    const min = 1;
    const max = 10000;
    const tempOrgID = Math.floor(min + (Math.random() * (max - min)));

    // Checking org 
    fetch('http://localhost:8081/org/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orgName: orgName,
        orgID: tempOrgID,
        email: orgEmail,
        phoneNumber: orgPh,
        address: orgAddress
      }),
    })
      .then(response => {
        if (response.status !== 200) {
          alert("Please enter unique org name and email")
        } else {
          response.json().then(data => {
            console.log('Success:', data);
            //Rest the input fields
            reset();
            // Snake bar
            let x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
          })
        }
      })

  }

  // clearing form
  const reset = () => {
    setOrgID('');
    setOrgName('');
    setOrgEmail('');
    setOrgPh('');
    setOrgAddress('');
  }


  return (

    <div className="login-div p-3 bg-white rounded">
      <div className='container'>
        <div id="snackbar">Organisation ID sent your email</div>
        <div className="text-center p-1 mb-2">
          <FontAwesomeIcon className="fa-4x" icon={faUsers}></FontAwesomeIcon>
          <h3>MyOrganization</h3>
          <br />
        </div>
        <div className="mb-2">
          <Button onClick={() => { setisRegister(false) }} className={`${isRegister ? 'btn-light' : 'btn-dark'} w-50 rounded-0`}>Login </Button>
          <Button onClick={() => { setisRegister(true) }} className={`${isRegister ? 'btn-dark' : 'btn-light'} w-50 rounded-0`}>Register Organisation</Button>
        </div>

        {isRegister ? (<div>
          {/* for organization registration */}
          <Form onSubmit={orgRegistration}>
            <Form.Group>
              <Form.Group controlId="orgName">
                <Form.Control
                  type="text"
                  className="form-control"
                  value={orgName}
                  onChange={(e) => { setOrgName(e.target.value) }}
                  placeholder="Enter Name"
                  required />
              </Form.Group>
              <Form.Group controlId="orgEmail">
                <Form.Control
                  type="email"
                  className="form-control"
                  value={orgEmail}
                  onChange={(e) => { setOrgEmail(e.target.value) }}
                  placeholder="Enter Email"
                  required />
              </Form.Group>
              <Form.Group controlId="orgPh">
                <Form.Control
                  className="form-control"
                  value={orgPh}
                  onChange={(e) => { setOrgPh(e.target.value) }}
                  placeholder="Enter Phone Number"
                  required />
              </Form.Group>
              <Form.Group controlId="orgAddress">
                <Form.Control
                  type="text"
                  className="form-control"
                  value={orgAddress}
                  onChange={(e) => { setOrgAddress(e.target.value) }}
                  placeholder="Enter Address"
                  required />
              </Form.Group>
            </Form.Group>
            <div>
              <Button type="submit" className="bg-dark w-100 form-control">Register</Button>
            </div>
          </Form>
        </div>) : (
          <div>
            <br />
            <div className="login-container">
              <input type="text" className="form-control" name="orgID" value={orgID}
                onChange={(e) => { setOrgID(e.target.value) }} placeholder="Organization ID" required /><br />
            </div>
            <br />
            {/* Login button */}
            <GoogleLogin
              render={renderProps => (
                <button className="google-button" onClick={() => {

                  fetch('http://localhost:8081/org/' + orgID)
                    .then(response => response.json())
                    .then(data => {
                      console.log('Success:', data);
                      if (data !== null && orgID !== "")
                        renderProps.onClick()
                      else {
                        alert('Please enter correct organization ID')
                      }
                    })
                    .catch((error) => {
                      console.log('in error');
                      console.error('Error:', error);
                    });
                }} disabled={renderProps.disabled}>
                  <span className="google-button__icon">
                    <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335" /><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05" /><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4" /><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853" /></svg>
                  </span>
                  <span className="google-button__text">Sign in with Google</span>

                </button>
              )}

              clientId={clientId}
              scope={'profile email https://www.googleapis.com/auth/calendar'}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              style={{ marginTop: '100px' }}
              isSignedIn={isAuthenticated} />
            <p className="login-policy">By Signing up, you agree to our Terms & Private Policy</p>
          </div>)}
      </div>
    </div>
  );
}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  getOrgDetails: (orgDetails) => getOrgDetails(dispatch, orgDetails),
  getAllUsers: (userList) => getAllUsers(dispatch, userList)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
