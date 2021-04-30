import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        summary: {
            type: String,
            required: "summary / title is required"
        },
        description: {
            type: String
        },
        location: {
            type: String
        },
        start: {
            dateTime: {
                type: Date
            },
            timeZone: {
                type: String
            }
        },
        end: {
            dateTime: {
                type: Date
            },
            timeZone: {
                type: String
            }
        },
        createdDate: {
            type: Date,
            default: Date.now,
            required: "Created Date is required"
        },
        status: String,
        htmlLink: String,
        attendees: [],
        eventId: String,
        bgColor: String,
        iCalUID: String,
        reminders: {},
        hangoutLink: String,
        conferenceData: {},
        userId: {
            type: String
        }
    },
    {
        versionKey: false,
    }
);
eventSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

eventSchema.set("toJSON", { virtual: true });

const model = mongoose.model("events", eventSchema);

export default model;
