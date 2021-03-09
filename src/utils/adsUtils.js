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

module.exports = {getAllAds,deleteSingleAd,validateFields,createAd}