const Joi = require('joi');


const validatePerson=(person)=>{
    const personSchema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        hobbies: Joi.array().items(Joi.string()).required(),
    });

    return personSchema.validate(person)
}


module.exports=validatePerson