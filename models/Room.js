const { Schema, model, Types } = require('mongoose');

const URL_REGEX = /^https?:\/\/.*/i

const roomSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    city: {
        type: String,
        required: [true, 'Location is required!']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0.01, 'Price must be a positive number!']
    },
    beds: {
        type: Number,
        required: [true, 'Number of beds is required!'],
        min: [1, 'Room must have at least one bed!'],
        max: [5, 'Room can have up to five beds!'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Cover Image URL is required!'],
        validate: {
            validator: (value) => URL_REGEX.test(value),
            message: 'Image URL is not valid!'
        }
    },
    gallery: {
        type: String,
        validate: {
            validator: (value) => {
                if (value) { return URL_REGEX.test(value); }
                return true;
            },
            message: 'Image URL is not valid!'
        }
    },
    facilities: {
        type: [Types.ObjectId],
        default: [],
        ref: 'Facility'
    },
    description: {
        type: String,
        required: [true, 'Description is required!']
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Room = model('Room', roomSchema);

module.exports = Room;