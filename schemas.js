const joi = require('joi')

 module.exports.modelSchema = joi.object({
        model: joi.object({
            model: joi.string().required(),
            bio: joi.string().required(),
            photo: joi.string().required(),
            age: joi.number().required(),
            height: joi.string().required(),
            eyecolor: joi.string().required(),
            city: joi.string().required()

        }).required()
    })
   