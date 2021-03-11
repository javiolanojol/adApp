'use strict'
const {getAllAds,deleteSingleAd,validateFields,removePerDate,replaceAd} = require('../utils/adsUtils')

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

            const newAd = await replaceAd(title,description)
            await newAd.save();
            return res.redirect("/ads/catalog")
        }

        return res.redirect("/ads/postForm")

    }

    adsController.purgeAds = async (req,res)=>{

        await removePerDate(req.body.date)
        res.redirect("/ads/catalog")

    }

module.exports = adsController
