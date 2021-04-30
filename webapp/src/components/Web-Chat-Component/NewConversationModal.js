import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useContacts } from '../../contexts/ContactsProvider';
import { useConversations } from '../../contexts/ConversationProvider';


export default function NewConversationModal({ closeModal }) {
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const { contacts } = useContacts()
    const { createConversation } = useConversations();

    function handleSubmit(e){
        e.preventDefault()  
        createConversation(selectedContactIds)
        closeModal()
    }


    function handleCheckboxChange(contactId){
        setSelectedContactIds(prevSelectedContactIds => {
            if(prevSelectedContactIds.includes(contactId)){
                return prevSelectedContactIds.filter(prevId => {
                    return contactId !== prevId
                })
            } else {
                    return [...prevSelectedContactIds, contactId]
                }
        })
    }
    return (
        <>     
        <Modal.Header closeButton> Create Conversation </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {contacts.map(contact => (
                    <Form.Group controlId={contact.email} key={contact.googleID}>
                       <Form.Check
                            type="checkbox"
                            value={selectedContactIds.includes(contact.email) }
                            label = {contact.userName}
                            onChange={() => handleCheckboxChange(contact.email)}
                        />
                    </Form.Group>
                ))}
            <Button type="submit">Create</Button>
            </Form>
        </Modal.Body>
       
        </>
    )
}
