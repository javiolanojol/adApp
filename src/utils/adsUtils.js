'use strict'
const Ad = require('../models/Ad')

const getAllAds = () => {
    return Ad.find().lean()
};

const deleteSingleAd =  (id) =>{
    return Ad.deleteOne(id);
}

const validateFields = (title,description) =>{
    if(title !== description) return true;
}

const createAd = (title,description) =>{
    const newAd = new Ad({title:title,description:description});
    return newAd.save();
}

const checkDate = (dateToCheck,adDate) =>{

    if(new Date(dateToCheck) > new Date(adDate)) return true;

}

async function removePerDate(dateToCheck){

    const adList = await getAllAds();

    adList.forEach(async(ad)=>{
        if(checkDate(dateToCheck,ad.publicationDate)){
            await deleteSingleAd({_id:ad._id})
        }
    })
}

module.exports = {getAllAds,deleteSingleAd,validateFields,createAd,removePerDate}