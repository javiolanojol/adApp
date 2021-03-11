'use strict'
const Ad = require('../models/Ad')

const getAllAds = () => Ad.find().lean()

const deleteSingleAd =  (id) => Ad.deleteOne(id);

const validateFields = (title,description) => title !== description;

const createAd = (title,description) => new Ad({title:title,description:description});

const checkDate = (dateToCheck,adDate) => new Date(dateToCheck) > new Date(adDate)

const removePerDate = async (dateToCheck)=>{

    const adList = await getAllAds();

    adList.forEach( async (ad) => {
        if(checkDate(dateToCheck,ad.publicationDate)){
            await deleteSingleAd({_id:ad._id})
        }
    })
}

const getTheOldestAd = async () => {
    const adList = await getAllAds();
     return adList
        .map((element) => new Date(element.publicationDate))
        .reduce((firstDate, nextDate) =>{ return firstDate <  nextDate ? firstDate : nextDate; });

}

const removeOldestAd = async () =>{
    const adList = await getAllAds();
    let oldest = await getTheOldestAd();
    oldest = oldest.toString();
    adList.forEach(async ad => {
        const adDate = ad.publicationDate.toString();
        if(adDate === oldest){
            await deleteSingleAd({_id:ad._id})
        }
    })
}

const checkNumberOfAds = async () =>{
    const adList = await getAllAds();
    return adList.length >= 99;

}

const replaceAd = async(title,description) =>{
    if(await checkNumberOfAds()){
        await removeOldestAd()
    }
    return createAd(title,description)
}


module.exports = {getAllAds,deleteSingleAd,validateFields,createAd,replaceAd,removePerDate}