import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import GoogleConfig from './../../apiGoogleconfig';
import Cookies from 'js-cookie';
import UserContext from './../../contexts/UserContext';

const clientId = GoogleConfig.clientId;

function Logout(props) {

  const { setIsAuthenticated } = useContext(UserContext);

  // for logout 
  const onSuccess = () => {
    console.log('Logout made successfully');
    Cookies.remove('tokenId');
    Cookies.remove('accessToken');
    Cookies.remove('googleId');
    setIsAuthenticated(false);
    props.history.push("signup");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        scope={'profile email https://www.googleapis.com/auth/calendar'}
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;