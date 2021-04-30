import mongoose from "mongoose";


const stickySchema = new mongoose.Schema(
  {

    userEmail: {
      type: String
    },
    stickies: [
      {
        id: {
          type: String
        },
        text:
        {
          type: String

        },
        createdDate: {
          type: Date,
          default: Date.now,
          required: "Created Date is required"
        }

      }]

  }
);

stickySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

stickySchema.set("toJSON", { virtual: true });

const model = mongoose.model("stickies", stickySchema);

export default model;