import mongoose from "mongoose";



const conversationsSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String
    },
    conversations: [
    {
      recipients: [{
      type: String
    }],
    messages: [
      {
       sender : {   type: String } , 
       text   : { type : String }
      }
      ]
    }]
  },
  {
    versionKey: false,
  }
);


// new mongoose.Schema({
//   allRecipients : [[subRecipientsSchema]]
// });
conversationsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

conversationsSchema.set("toJSON", { virtual: true });

const model = mongoose.model("Conversations", conversationsSchema);

export default model;
