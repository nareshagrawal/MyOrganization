import StickyModel from '../models/sticky.model';
import 'babel-polyfill';


// Get Sticky
const getSticky = (email) => {
    const promise = StickyModel.findOne({ userEmail: email });

    return promise;
}



const updateSticky = (email, updatedStickyState) => {
    const promise = StickyModel.findOneAndUpdate({ userEmail: email },
        updatedStickyState,
        { new: true }
    ).exec();
    return promise;
}


const saveSticky = (newSender) => {
    const newSticky = new StickyModel(newSender);
    const promise = newSticky.save();
    return promise;
}


export default {
    getSticky: getSticky,
    saveSticky: saveSticky,
    updateSticky: updateSticky
};