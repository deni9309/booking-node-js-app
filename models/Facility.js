const { Schema, model, Types } = require('mongoose');

const facilitySchema = new Schema({
    label: { type: String, required: true, minLength: 3 },
    iconUrl: {
        type: String,
        default: () => {
            return '/static/img/icons/checked.png';
        }
    },
    rooms: { type: [Types.ObjectId], default: [], ref: 'Room' }
});

const Facility = model('Facility', facilitySchema);

module.exports = Facility;