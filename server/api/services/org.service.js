import orgModel from '../models/organization.model';

// search org by orgid
const search = (id) => {
    const promise = orgModel.findOne({ orgID: id});
    return promise;  
}

// saving organization
const save = (org) => {
    const promise = new orgModel(org).save();
    return promise;
}


export default {
    search: search,
    save: save
};