import conversationsModel from '../models/conversations.model';
import 'babel-polyfill';


// Get Recipient
const getConversations = () => {
    const promise = conversationsModel.findOne();
    return promise;  
}

// Update recipient array
const updateConversations = (email, updatedRecipients) => {
    const promise = conversationsModel.findOneAndUpdate({userEmail:email},
        updatedRecipients, 
        { new: true }
    ).exec(); 
    return promise;
}


// Save conversations
const saveConversations = (newConversations) => {
    const tempConv =  new conversationsModel(newConversations);
    const promise = tempConv.save();
    return promise;
}

export default {
    getConversations: getConversations,
    updateConversations: updateConversations,
    saveConversations: saveConversations
};