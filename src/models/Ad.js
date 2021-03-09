'use strict'

const {Schema, model} = require("mongoose");

const adSchema = new Schema ({
    title:{
        type:String,
        required:true
    },description:{
        type:String,
        required:true
    },publicationDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = model("Ad", adSchema, "ads");