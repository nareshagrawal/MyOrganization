import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: "username"
    },
    email: {
      type: String
    },
    googleID: {
      type: String,
      required: "googleID"
    },
    picture: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    address: {
      type: String
    },
    orgID: {
      type: String
    },
    role: {
      type: String,
    },
    managerDetail: {},
    createdDate: {
      type: Date,
      default: Date.now,
      required: "Created Date is required"
    },
    lastModifiedDate: {
      type: Date,
    },
    lastSignedDate: {
      type: Date
    }
  },
  {
    versionKey: false,
  }
);
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", { virtual: true });

const model = mongoose.model("users", userSchema);

export default model;
