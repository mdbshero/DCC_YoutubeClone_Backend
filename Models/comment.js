const mongoose = require("mongoose");
const Joi = require("joi");
const {replySchema} = require('./reply');

const commentSchema = new mongoose.Schema({
	text:{type:String, required:true, min:1, max:255},
	likes:{type:Number, default:0},
	dislikes:{type:Number, default:0},
	date:{type:Date, default:(Date.now())},
	replies:{type:[replySchema], default:[]},
    //replies:[{type:replySchema}]
	videoId:{type:String}
});


function validateComment(comment){
    const schema = Joi.object({
        text:Joi.string().required().min(1).max(255),
        videoId:Joi.string(),
        likes:Joi.number(),
        dislikes:Joi.number()
    })
    return schema.validate(comment)
}

const Comment = mongoose.model("Comment", commentSchema);

module.exports={
    commentSchema,
    Comment,
    validateComment
}