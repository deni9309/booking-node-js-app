const Room = require('../models/Room');

function getAll(search, city, fromPrice, toPrice) {
    return Room.find({}).lean();
}

function getById(id) {
    return Room.findById(id).lean();
}

function getByIdWithFacilities(id) {
    return Room.findById(id).populate('facilities', 'label iconUrl').lean();
}

async function create(roomData, ownerId) {
    const room = {
        name: roomData.name,
        city: roomData.city,
        price: Number(roomData.price),
        beds: Number(roomData.beds),
        imageUrl: roomData.imageUrl,
        gallery: roomData.gallery,
        description: roomData.description,
        owner: ownerId,
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
    getByIdWithFacilities,
    create,
};

/*function generateId() {
    return ('000000' + (Math.random() * 999999 | 0).toString(16)).slice(-6);
}*/