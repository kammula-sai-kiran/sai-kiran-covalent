const generateBookmarkedData = (pricesObject) => {

    const requiredBookmarkedData = Object.entries(pricesObject)?.map(([key, value]) => ([
        key,value.USD,
    ]));

    return requiredBookmarkedData;
};

export default generateBookmarkedData;
