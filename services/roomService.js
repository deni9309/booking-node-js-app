const Room = require('../models/Room');

function getAll(search, city, fromPrice, toPrice) {
    return Room.find({}).lean();

}

function getById(id) {
    return Room.findById(id).lean();
}

async function create(roomData) {
    const room = {
        name: roomData.name,
        city: roomData.city,
        price: Number(roomData.price),
        beds: Number(roomData.beds),
        imageUrl: roomData.imageUrl,
        gallery: roomData.gallery,
        facilities: roomData.facilities,
        description: roomData.description
    };

    const missingFields = Object.entries(room).filter(([k, v]) => !v);
    if (missingFields.length > 0) {
        throw new Error(missingFields.map(kv => `${kv[0]} is required!`).join('\n'));
    }

    const result = await Room.create(room);
    return result;
}

module.exports = {
    getAll,
    getById,
    create,
};

/*function generateId() {
    return ('000000' + (Math.random() * 999999 | 0).toString(16)).slice(-6);
}*/