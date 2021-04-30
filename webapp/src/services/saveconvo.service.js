/* eslint-disable import/no-anonymous-default-export */
import {
    GET_CONVERSATIONS
    , UPDATE_CONVERSATIONS
    , ADD_NEW_CONVERSATIONS
    , GET_USER
    , GET_USERS
} from './constants'

// Add new conversations
const addConversations = (tokenId, id) => {
    let init = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            tokenId
        },
        body: JSON.stringify({
            userEmail: id,
            conversations: []
        })
    };
    return fetch(`${ADD_NEW_CONVERSATIONS}`, init
    ).then(response => response.json());
}


// Update conversations
const updateConversations = (tokenId, email, updatedConvo) => {
    let init = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            tokenId
        },
        body: JSON.stringify({
            userEmail: email,
            conversations: updatedConvo
        })
    };
    return fetch(`${UPDATE_CONVERSATIONS}/${email}`, init
    ).then(response => response.json());
}

// Get conversations

const getConversations = (tokenId, email) => {
    let init = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            tokenId
        },
    };
    return fetch(`${GET_CONVERSATIONS}/${email}`, init).then(response => response.json());
}

// Get user details
const getUser = (tokenId) => {
    let init = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            tokenId
        },
    };
    return fetch(`${GET_USER}`, init).then(response => response.json());
}


// Get contacts 
const getUsers = (tokenId) => {
    let init = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            tokenId
        },
    };
    return fetch(`${GET_USERS}`, init).then(response => response.json());
}


export default {
    addConversations
    , getConversations
    , updateConversations
    , getUser
    , getUsers
};