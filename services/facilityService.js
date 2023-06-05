const Facility = require('../models/Facility');

async function getAllFacilities() {
    return Facility.find({}).lean();
}

async function createFacility(label, iconUrl) {
    return Facility.create({
        label,
        iconUrl,
    });
}

async function attachRoomToFacilities(facilityIds, roomId) {
  await Facility.updateMany({ _id: { $in: facilityIds } }, { $push: { 'rooms': roomId } });
}

module.exports = {
    getAllFacilities,
    createFacility,
    attachRoomToFacilities,
};