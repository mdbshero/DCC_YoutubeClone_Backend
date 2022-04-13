const { Comment, validateComment } = require('../models/comment');
const { Reply, validateReply } = require("../models/reply")
const express = require("express");
const { Router } = require('express');
const router = express.Router();


//POST a reply to a comment
router.post("/:commentId/replies", async (req, res) => {
try {
    let { error } = validateReply(req.body);
    if (error) return res.status(400).send(`Body for reply not valid! ${error}`);

    let comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(400).send(`Comment with Id ${req.params.commentId}`)

    let reply = await new Reply(req.body);
    comment.replies.push(reply);
    await comment.save();
    return res.send(comment.replies)
} catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`)
}
})

//PUT likes and dislikes
router.put("/:commentId/replies/:replyId", async(req, res) => {
    try{

        let comment = await Comment.findById(req.params.commentId);
        if(!comment) return res.status(400).send(`Could not find any comments with the ID of ${req.params.commentId}`)
    
        const reply = comment.replies.id(req.params.replyId);
        if (!reply)
        return res.status(400).send(`There is no reply.`);
        reply.likes = req.body.likes;
        reply.dislikes = req.body.dislikes;

        await comment.save();
        return res.send(reply)
    
    }catch (error){
        return res.status(500).send(`internal server errror: ${error}`)
    }
})

module.exports = router;
