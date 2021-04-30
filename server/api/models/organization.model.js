import mongoose from "mongoose";

const orgSchema = new mongoose.Schema(
  {
    orgName: {
        type: String,
        required:"Org name required",
        index: {unique: true}
      }, 
    orgID: {
        type: String
    },
    email: {
      type: String,
      required:"Org email required",
      index: {unique: true}
    },
    phoneNumber: {
      type: String
    },
    address: {
      type: String
    },
    createdDate: {
      type: Date,
      default:Date.now,
      required:"Created Date is required"
    }
  },
  {
    versionKey: false,
  }
);
// orgSchema.index({ orgName: 1, email: 1 }, { unique: true});
orgSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orgSchema.set("toJSON", { virtual: true });

const orgModel = mongoose.model("organizations", orgSchema);

export default orgModel;
