'use strict'
const express = require("express");
const adsController = require("../controllers/adsController");
const router = express.Router();

router.get("/postForm", adsController.renderPostAdForm)
router.post("/postNewAd", adsController.postNewAd)
router.get("/catalog", adsController.showAdsList)
router.get("/adRemove/:id",adsController.removeAd)
router.post("/purgeAds", adsController.purgeAds)

module.exports = router;