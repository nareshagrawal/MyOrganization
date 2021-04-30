import {
    GET_STICKIES
    , UPDATE_STICKIES
    , ADD_STICKIES
} from './constants'



const putStickies = (tokenId, email, updatedStickies) => {
    let init = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            tokenId
        },
        body: JSON.stringify({
            userEmail: email,
            stickies: updatedStickies
        })
    };
    return fetch(`${UPDATE_STICKIES}/${email}`, init
    ).then(response => response.json());
}


const getStickies = (tokenId, email) => {
    let init = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            tokenId
        },
    };
    return fetch(`${GET_STICKIES}/${email}`, init).then(response => response.json());
}

const addStickies = (tokenId, sticky) => {
    let init = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            tokenId
        },
        body: JSON.stringify(sticky)
    };
    return fetch(`${ADD_STICKIES}`, init
    ).then(response => response.json());
}



export default {
    updateSticky: putStickies
    , getStickies
    , addStickies
};