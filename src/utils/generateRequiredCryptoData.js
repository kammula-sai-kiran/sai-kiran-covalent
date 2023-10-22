const generateRequiredCryptoData = (allCryptoData) => {

    const currentDate = new Date();

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    
    const currentTime = `${hours}:${minutes}:${seconds}`;

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

    return requiredCryptoData;
};

export default generateRequiredCryptoData;
