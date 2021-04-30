// Instead of passing values from App to Sidebar to Modal and vice versa we create a Context

import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import ChatService from '../services/saveconvo.service';


const ContactsContext = React.createContext();



export function useContacts(){
    return useContext(ContactsContext)
}

export  function ContactsProvider({ id, children  }) {
    
    const [contacts, setContacts] = useState([]); //    useLocalStorage('contacts', [])
    
    
    
    useEffect(() => {
        let mounted = true;
        ChatService.getUsers(Cookies.get('tokenId')) // fetchUsers()
          .then(items => {
            if(mounted) {
              console.log('contacts', items)
              console.log('tokenId', Cookies.get('tokenId'))
              // add filter for contact specific info
              setContacts(items.filter((item) => item.email != id));
            }
          })
        return () => mounted = false;
      }, [])

    
    const fetchUsers = async () => { 
        const tokenId = Cookies.get('tokenId');
        const res = await fetch('http://localhost:8081/', {
            method: 'GET',
            headers:{
            'tokenId': tokenId
            },
        })
        const data = await res.json()
        return data
        } 




    function createContact(id, name){
        setContacts(prevContacts => {
            return [...prevContacts, { id, name }]
        })


    }
    return (
        <ContactsContext.Provider value={{ contacts, createContact }}>
                {children}
        </ContactsContext.Provider>           
    )
}
