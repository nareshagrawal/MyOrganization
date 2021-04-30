import React, { useState, useEffect } from 'react';
// import './App.scss';
import Dashboard1 from '../Web-Chat-Component/Dashboard';
import { ContactsProvider } from '../../contexts/ContactsProvider';
import { ConversationProvider } from '../../contexts/ConversationProvider';
import { SocketProvider } from '../../contexts/SocketProvider';
import Cookies from 'js-cookie'
import ChatService from '../../services/saveconvo.service';

function  LandingPage() {
  
  const [id, setId] = useState(); 
  
  const [user, setUser] = useState();

  useEffect(() => {
    let mounted = true;
    ChatService.getUser(Cookies.get('tokenId')) 
      .then(items => { 
        if(mounted) {
          setId(items.email);
          setUser(items);
        }
      })
    return () => mounted = false;
  }, [])

  const dashboard = (
    <SocketProvider  id={id}>
      <ContactsProvider id={id} >
        <ConversationProvider  id={id}>
            <Dashboard1 id={id} />
        </ConversationProvider>
      </ContactsProvider>
    </SocketProvider>
  )
  return (
     id ?
      dashboard : <div> </div> 
     )
}

export default LandingPage;
