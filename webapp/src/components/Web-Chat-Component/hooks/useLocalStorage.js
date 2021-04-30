// When we close our browser, we want our information to persist 
// So we use useLocalStorage
// It will work as useState and store everything in local storage 
// So even if we close/refresh our page the data is there

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const PREFIX = 'runtime-error-webchat-data-'
// Key is the value we will use to store in local
// and value is the actual state we are saving



export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key


    const [value, setValue] = useState(() => {

        
        const jsonValue = localStorage.getItem(prefixedKey)
        
        console.log('jsonValue', jsonValue);

        if(jsonValue != null) return JSON.parse(jsonValue)
        if(typeof initialValue === 'function'){
            return initialValue()
        }
        else {
            return initialValue;
        }  
    })
    
    // useEffect(() => {
    //     localStorage.setItem(prefixedKey, JSON.stringify(value))
    // }, [prefixedKey, value])

    return [value, setValue] 
 
}


// Fetch user details

// const getUser = async (id) => {
//     const getUser = await fetchUser(id);
//     return getUser;
// }



 // Add Task
const fetchUser = async () => {
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

