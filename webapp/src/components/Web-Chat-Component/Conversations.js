import React, { useContext, useState, useEffect, useCallback }  from 'react'
import Cookies from 'js-cookie'
//import React, { useContext, useState, useEffect, useCallback } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useConversations } from '../../contexts/ConversationProvider'
import ChatService from '../../services/saveconvo.service'
export default function Conversations() {

    const { conversations, selectConversationIndex } = useConversations()
    
    const [contacts, setContacts] = useState([])  

    useEffect(() => {
      let mounted = true;
      ChatService.getUsers(Cookies.get('tokenId')) // fetchUsers()
        .then(items => {
          if(mounted) {
            console.log('contacts in conversation component', items)
            setContacts(items)
          }
        })
      return () => mounted = false;
    }, [])

  //   {conversation.recipients.map(r =>  
  //     r.name
  // ).join(', ')
  // }

  function getItemInfo(email){

    for(let i = 0; i < contacts.length; i++){
      console.log(contacts[i].email)
      console.log('email XXX : ', email)
      if(contacts[i].email === email){
       
          return contacts[i].userName;
        }
    }
  
  }

  // {
  //   'xxxxxxzzz', conversation.recipients.map((item) => (
  //     <div> "something" </div>
  //   )).join(', ')
              
  // }

    return (
      <ListGroup variant="flush">
        {conversations.map((conversation, index) => (

            

          <ListGroup.Item 
            key={index}
            action
            onClick={() => selectConversationIndex(index)}
            active={conversation.selected}
            > 
            

              
             {conversation.recipients.map(r =>  
                         getItemInfo(r.name)
                    ).join(', ')
              }
  
            
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
}

