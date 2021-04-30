import stickyService from "../services/sticky.service";
import 'babel-polyfill';

// Save a new recipient
const updateSticky = (req, res) => {

  const email = req.params.id;

  // getting the update body  
  const newStickyState = { ...req.body };
  const promise = stickyService.updateSticky(email, newStickyState);

  promise.then((newStickyState) => {
    res.status(200);
    res.json(newStickyState);
  })

}


// Get a recipient with specified id
const getSticky = (req, res) => {
  // get the id from params
  const email = req.params.id;
  const promise = stickyService.getSticky(email);
  promise.then((sticky) => {
    res.status(200);
    res.json(sticky);
  })
}


const saveSticky = (req, res) => {

  const newStickies = { ...req.body };

  const promise = stickyService.saveSticky(newStickies);
  promise.then((newStickies) => {
    res.status(200);
    res.json(newStickies);
  })
}


export default {
  saveSticky: saveSticky,
  getSticky: getSticky,
  updateSticky: updateSticky
  //  updateRecipient: updateRecipient
}