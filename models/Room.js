const { Schema, model, Types } = require('mongoose');

const roomSchema = new Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: Number, required: true, min: 0.01 },
    beds: { type: Number, required: true, min: 1 },
    imageUrl: { type: String },
    gallery: { type: String },
    facilities: { type: [Types.ObjectId], default: [], ref: 'Facility' },
    description: { type: String, required: true },
});

const Room = model('Room', roomSchema);

module.exports = Room;