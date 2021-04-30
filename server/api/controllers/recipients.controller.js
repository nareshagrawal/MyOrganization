import recipientsService from "../services/recipients.service";
import 'babel-polyfill';

// Save a new recipient
const saveRecipient = (req, res) => {

  const newRecipient = {...req.body};

  const promise =  recipientsService.saveRecipient(newRecipient);
  promise.then((newRecipient) => {
      res.status(200);
      res.json(newRecipient); 
  })
}


// Get a recipient with specified id
const getRecipient = (req, res) => {
  // get the id from params
  const email = req.params.id;
  const promise =  recipientsService.getRecipient(email);
  promise.then((recipient) => {
      res.status(200);
      res.json(recipient); 
  })
}

// Update 
const updateRecipient = (req, res) => {

  const email = req.params.id;

    // getting the update body  
    const newRecipient = {...req.body};
    const promise = recipientsService.updateRecipient(email, newRecipient);

    promise.then((newRecipient) => {
        res.status(200);
        res.json(newRecipient); 
    })

}

export default {
      saveRecipient: saveRecipient,
      getRecipient: getRecipient, 
      updateRecipient: updateRecipient
}