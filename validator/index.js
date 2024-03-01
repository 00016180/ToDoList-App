const Joi = require('joi');

function validateTask(task){
    const schema = {
        name: Joi.string().min(3).required(),
        date: Joi,
        isFinished: Joi.required()
    };
    return Joi.validate(task, schema);
};

module.exports = validateTask;