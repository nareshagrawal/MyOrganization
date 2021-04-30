import react from 'react';
import UserProfile from '../components/UserProfile/profile';
import NavigationHeader from '../components/Navigation/NavigationHeader';

const UserProfileContainer = (props) => {

    return (<div>
        <NavigationHeader />
        <UserProfile />
    </div>
    )

}

export default UserProfileContainer;