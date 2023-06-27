const { Schema, model, Types } = require('mongoose');

const facilitySchema = new Schema({
    label: {
        type: String,
        required: [true, 'Label is required!']
    },
    iconUrl: {
        type: String,
        minLength: [3, 'Icon Url must be at least 6 characters long!'],
        //required: true,
        // default: () => { return '/static/img/icons/checked.png'; },
    },
    rooms: {
        type: [Types.ObjectId],
        default: [],
        ref: 'Room'
    }
});

const Facility = model('Facility', facilitySchema);

module.exports = Facility;