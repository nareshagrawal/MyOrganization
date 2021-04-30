// Instead of passing values from App to Sidebar to Modal and vice versa we create a Context
import Cookies from 'js-cookie'
import React, { useContext, useState, useEffect, useCallback } from 'react'
// import useLocalStorage from '../components/hooks/useLocalStorage';
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'
import ChatService from '../services/saveconvo.service';

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationProvider({ id, children }) {
  const [conversations, setConversations] = useState([]); // useLocalStorage('conversations', []); //useState([]);  // useLocalStorage('conversations', []);
  const { contacts } = useContacts();
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const socket = useSocket();
  const [messageDetail, setMessageDetails] = useState({});




  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        //   console.log('conversationProvider', contact.id)
        return contact.id === recipient
      })
      const name = (contact && contact.userName) || recipient
      return { id: recipient, name }
    })

    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return { ...message, senderName: name, fromMe }
    })


    const selected = index === selectedConversationIndex
    return { ...conversation, messages, recipients, selected }
  })



  //  APIs
  useEffect(() => {
    let mounted = true;
    ChatService.getConversations(Cookies.get('tokenId'), id)       // fetchUsersConvo()
      .then(items => {
        if (mounted) {
          if (items) {
            setConversations(items.conversations);
          } else {
            ChatService.addConversations(Cookies.get('tokenId'), id) //createConversationDoc() 
          }
        }
      })
    return () => mounted = false;
  }, [])


  function createConversation(recipients) {
    let flag = false;
    let conv = formattedConversations.map(conv => conv.recipients.map(rec => rec.id))
    for (let i = 0; i < conv.length; i++) {


      flag = arrayEquality(conv[i], recipients)

      if (flag)
        break;


    }


    if (!flag)
      setConversations(prevConversations => {
        return [...prevConversations, { recipients, messages: [] }]
      })
  }

  const addMessageToConversation = useCallback(({ recipients, text, sender }) => {

    // Get previous conversations
    setConversations(prevConversations => {

      let madeChange = false
      const newMessage = { sender, text }
      const newConversations = prevConversations.map(
        conversation => {
          console.log('XXXX conversation', conversation)
          console.log('XXXX recipient', recipients)
          if (arrayEquality(conversation.recipients, recipients)) {

            madeChange = true
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage]
            }
          }

          return conversation

        })



      // Its a new conversation
      if (madeChange) {

        console.log("new conversations");
        console.log(newConversations);
        ChatService.updateConversations(Cookies.get('tokenId'), id, newConversations);


        return newConversations
      }
      // get previous conversation
      else {

        const conversationsObj = {
          recipients: recipients,
          messages: newMessage
        }



        // console.log('prevConversations', prevConversations)

        console.log('New Message', newMessage)
        ChatService.updateConversations(Cookies.get('tokenId'), id, conversationsObj);




        return [
          ...prevConversations,
          { recipients, messages: [newMessage] }
        ]
      }

    })

  }, [setConversations])




  useEffect(() => {
    if (socket == null) {
      console.log("XXXX messageDetails")
      console.log(messageDetail);

      return
    }

    socket.on('recieve-message', addMessageToConversation)




    return () => socket.off('recieve-message')
  }, [socket, addMessageToConversation, messageDetail])


  function sendMessage(recipients, text) {

    addMessageToConversation({ recipients, text, sender: id })

    setMessageDetails({ recipients, text, sender: id })

    socket.emit('send-message', { recipients, text })
  }




  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations
    [selectedConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
    sendMessage,
    createConversation
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}


function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}