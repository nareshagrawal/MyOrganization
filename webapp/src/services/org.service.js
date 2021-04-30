import { GET_ORG_DETAILS } from './constants'


const getOrgDetails = (tokenId, orgId) => {
    let init = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            tokenId
        }
    };
    return fetch(`${GET_ORG_DETAILS}/${orgId}`, init
    ).then(response => response.json());
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getOrgDetails }