import React from 'react';
import { withRouter } from 'react-router';
import NavigationHeader from '../Navigation/NavigationHeader'
import StickyNote from '../StickyNotes/StickyNote'
function Dashboard(props) {
  return (
    <div>
      <NavigationHeader />
      {/* <Logout {...props}></Logout> */}
      <StickyNote></StickyNote>
    </div>
  );
}

export default withRouter(Dashboard);
