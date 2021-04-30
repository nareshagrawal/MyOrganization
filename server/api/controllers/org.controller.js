import orgService from "../services/org.service";
import emailService from "../services/email.service";

// getting org by ID
const getOrg = (request, response) => {
    const id = request.params.id;
    const promise = orgService.search(id);
    promise.then((org) => {
    response.status(200);
    response.json(org);
  }).catch(handleError(response)); 
};

// saving org
const saveOrg = (request, response) => {
    const org =  {...request.body};

    const promise = orgService.save(org);
    promise.then((organization) => {
    emailService.email(organization.email,organization.orgID);
    console.log('in save org');
    response.status(200);
    response.json(organization);
  }).catch(handleError(response)); 
  
};

// Error Handlor function
const handleError = (response) =>{
  return (error)=> {
      if (error) {
          response.status(500);
          response.json({
              message: error.message
          });
      }
  }
}


export default {
    getOrg: getOrg,
    saveOrg: saveOrg    
}