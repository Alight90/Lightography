const mongoose = require('mongoose')
const Schema= mongoose.Schema

const modelSchema = new Schema({
    model:{
        type:String,
        required:true},
    bio:{
        type:String,
        required:true,
       
    },
    photo:{
        type:String,
        required:true,
       
    },
    age:{
        type:Number

    },
    height:{
        type:String

    },
    eyecolor:{
        type:String
    },
    city:{
        type:String

    }
    })

module.exports=mongoose.model('Model',modelSchema)