import conversationsService from "../services/conversations.service";
import 'babel-polyfill';

// Save a new ToDo
const saveConversation = (req, res) => {

  const newRecipient = {...req.body};

  const promise =  conversationsService.saveConversations(newRecipient);
  promise.then((newRecipient) => {
      res.status(200);
      res.json(newRecipient); 
  })
}


// Get a ToDo with specified id
const getConversation = (req, res) => {
  // get the id from params
  const promise =  conversationsService.getConversations();
  promise.then((recipient) => {
      res.status(200);
      res.json(recipient); 
  })
}

// Update 
const updateConversation = (req, res) => {

  const email = req.params.id;

    // getting the update body  
    const newRecipient = {...req.body};
    const promise = conversationsService.updateConversations(email, newRecipient);

    promise.then((newRecipient) => {
        res.status(200);
        res.json(newRecipient); 
    })

}

export default {
      saveConversation: saveConversation,
      getConversation: getConversation, 
      updateConversation: updateConversation
}