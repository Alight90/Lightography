const mongoose = require('mongoose')

photoSchema = new mongoose.Schema({
    model:{
        type:String,
        required:true},
    year:{
        type:Number,
        required:true,
        min:2000

    },
    category:{
        type:String,
        lowercase:true,
        enum:['nude','boudior','Halloween']
    }
})

const Photo = mongoose.model('Photo',photoSchema)
module.exports=Photo