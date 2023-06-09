exports.getCheckedFacilitiesForRoomViewData = (roomFacilities, allFacilities) => {
    const currentlyChecked = roomFacilities.map(f => f.toString());

    allFacilities = allFacilities.map(x =>
        currentlyChecked.includes(x._id.toString())
            ? { ...x, isChecked: 'checked' }
            : { ...x, isChecked: '' }

    );

    return allFacilities;
};
