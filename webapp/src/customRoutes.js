import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch, } from "react-router-dom";
import App from './components/App';
import Dashboard from './components/Dashboard/dashboard';
import CalendarContainer from './containers/CalendarContainer';
import ChatContainer from './containers/ChatContainer'
import UserContext from "./contexts/UserContext";
import UserProfileContainer from './containers/UserProfileContainer'
import OrgChartContainer from './containers/OrgChartContainer'
import StickyNote from './components/StickyNotes/StickyNote';
import Cookie from "js-cookie";
import store from "./store"

function CustomRoutes() {

    const token = Cookie.get('tokenId');
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    return (
        <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <Provider store={store}>
                <Router>
                    {isAuthenticated
                        ?
                        <Switch>
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/calendar" component={CalendarContainer} />
                            <Route path="/messages" component={ChatContainer} />
                            <Route path="/sticky" component={StickyNote} />
                            <Route path="/profile" component={UserProfileContainer} />
                            <Route path="/orgchart" component={OrgChartContainer} />
                        </Switch>
                        : <div>
                            <Route path="/signup" component={App} />
                            <Redirect to="/signup" />
                        </div>
                    }
                </Router>
            </Provider>
        </UserContext.Provider>
    )

}
export default CustomRoutes;