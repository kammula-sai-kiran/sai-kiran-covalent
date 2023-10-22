const generateRequiredCryptoData = (allCryptoData) => {

    const currentDate = new Date();

    const currentTime = currentDate.toLocaleTimeString();

    const additionalData = Object.assign(
      {},
      ...Object.entries(allCryptoData).map(([key, value]) => ({
        [key]: value.USD,
      }))
    );

    const requiredCryptoData = Object.entries(allCryptoData).map(([key, value]) => ({
        key,
        price: value.USD.PRICE,
        marketCap: value.USD.MKTCAP,
        imageUrl: `https://www.cryptocompare.com/${value.USD.IMAGEURL}`,
        totalVol: value.USD.TOTALVOLUME24HTO,
        directVol: value.USD.VOLUME24HOURTO,
        topTierVol: value.USD.TOTALTOPTIERVOLUME24HTO,
        updatedTime: currentTime,
      }));
    return [requiredCryptoData,additionalData];
};

export default generateRequiredCryptoData;
