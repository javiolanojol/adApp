'use strict'
const {getAllAds,deleteSingleAd,validateFields,createAd} = require('../utils/adsUtils')

const adsController = {}

    adsController.renderPostAdForm = (req,res) => res.render('templates/postAdForm')

    adsController.showAdsList = async (req,res) => res.render('templates/adsCatalog',{adsListHelper:await getAllAds()})

    adsController.removeAd = async (req,res) => {

        await deleteSingleAd({_id:req.params.id});
        res.redirect("/ads/catalog");

    }

    adsController.postNewAd = async (req,res) => {
        const{title,description} = req.body;
        if(validateFields(title,description)){
            await createAd(title,description)
            return res.redirect("/ads/catalog")
        }
        return res.redirect("/ads/postForm")

    }

module.exports = adsController
