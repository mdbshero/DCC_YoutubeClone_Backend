const mongoose = require("mongoose");
const Joi = require("joi");

const replySchema = new mongoose.Schema({
	text:{type:String, required:true, min:1, max:255},
	likes:{type:Number, default:0},
	dislikes:{type:Number, default:0},
	date:{type:Date, default:(Date.now())},
});

const Reply = mongoose.model("Reply", replySchema);

function validateReply(reply){
    const schema = Joi.object({
        text:Joi.string().required().min(1).max(255),
        likes:Joi.number(),
        dislikes:Joi.number()
    })
    return schema.validate(reply)
}

module.exports={
    replySchema,
    Reply,
    validateReply
}