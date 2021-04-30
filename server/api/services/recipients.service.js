import recipientModel from '../models/recipients.model';
import 'babel-polyfill';


// Get Recipient
const getRecipient = (email) => {
    const promise = recipientModel.findOne({ userEmail: email});
  
    return promise;  
}

// Update recipient array
const updateRecipient = (email, updatedRecipients) => {
    const promise = recipientModel.findOneAndUpdate({userEmail:email},
        updatedRecipients, 
        { new: true }
    ).exec(); 
    return promise;
}



const saveRecipient = (newSender) => {
    const newRecipient =  new recipientModel(newSender);
    const promise = newRecipient.save();
    return promise;
}

export default {
    getRecipient: getRecipient,
    saveRecipient: saveRecipient,
    updateRecipient: updateRecipient
};