import { Schema, model } from 'mongoose';
import Response from './Response.js';
// Schema to create Post model
const thoughtsSchema = new Schema({
    published: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    advertiserFriendly: {
        type: Boolean,
        default: true,
    },
    description: {
        type: String,
        minLength: 8,
        maxLength: 500,
    },
    responses: [Response],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
// Create a virtual property `responses` that gets the amount of response per thoughts
thoughtsSchema
    .virtual('getResponses')
    // Getter
    .get(function () {
    return this.responses.length;
});
// Initialize our thoughts model
const thoughts = model('thoughts', thoughtsSchema);
export default thoughts;
