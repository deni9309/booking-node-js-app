const Facility = require('../models/Facility');
const Room = require('../models/Room');

async function getAllFacilities() {
    return Facility.find({}).lean();
}

async function createFacility(label, iconUrl) {
    // let hasError;
    // if (!label) {
    //     hasError = true;
    //     throw new Error(`Label field is required!`);
    // }

    // if (!iconUrl) {
    //     iconUrl = iconUrl.default;
    // }

    const result = await Facility.create({ label, iconUrl });
    return result;
}

async function updateRoomFacilityRelation(facilityIdsCheckedForRoom, roomId) {
    //facilitiesNotCheckedForRoom 
    await Facility.updateMany(
        { _id: { $nin: facilityIdsCheckedForRoom } },
        { $pull: { 'rooms': roomId } }
    );

    //facilitiesCheckedForRoom
    await Facility.updateMany(
        { $and: [{ _id: { $in: facilityIdsCheckedForRoom } }, { rooms: { $ne: roomId } }] },
        { $push: { 'rooms': roomId } }
    );

    // roomWithCheckedFacilities
    await Room.findByIdAndUpdate(
        roomId,
        { $set: { 'facilities': facilityIdsCheckedForRoom } }
    );
}

module.exports = {
    getAllFacilities,
    createFacility,
    updateRoomFacilityRelation,
};