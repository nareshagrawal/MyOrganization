import Cookies from 'js-cookie';
import react, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import UserContext from './../../contexts/UserContext';
import orgServices from '../../services/org.service'
import convService from '../../services/saveconvo.service'

const NavigationHeader = (props) => {
    const { setIsAuthenticated } = useContext(UserContext);
    const [orgDetail, setOrgDetail] = useState({})
    const [userDetail, setUserDetail] = useState({})
    const tokenId = Cookies.get('tokenId');
    const orgId = Cookies.get('orgId');

    const updateUserAndOrgDetails = async (tokenId, orgID) => {
        const response = await orgServices
            .getOrgDetails(tokenId, orgID);
        const userDetails = await convService.getUser(tokenId)
        setOrgDetail({ ...response })
        setUserDetail({ ...userDetails });
        // props.getOrgDetails(response);
    }

    // Loading profile on page load
    useEffect(() => {
        updateUserAndOrgDetails(tokenId, orgId)

        // Getting user profile
    }, []);

    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('googleId');
        Cookies.remove('tokenId');
        Cookies.remove('orgId');
        setIsAuthenticated(false);
        props.history.push("signup");
    }
    console.log("orgDetail", orgDetail);
    console.log("userDetail", userDetail);
    return (

        <nav className="topnav">
            <Link className="navbar-brand" href="#">
                <div className="logo-image">
                    <img src={userDetail.picture} className="img-fluid" />
                </div>
            </Link>
            <Link onClick={logout}>Logout</Link>
            <Link to="/profile">Edit Profile</Link>
            <Link to="/dashboard">Dashboard</Link>
            <span className="activeRight"> {orgDetail.orgName}</span>

        </nav>)
}

export default withRouter(NavigationHeader);