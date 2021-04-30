import React from 'react'
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'
import './Dashboard.scss'
import { useConversations } from '../../contexts/ConversationProvider'


export default function Dashboard1({ id }) {
    const { selectedConversation } = useConversations()
   
    return (

        <div className='dash-div'>
            <Sidebar id={id} />
            {selectedConversation && <OpenConversation />}
        </div>
            
    )
}
