const {Comment, validateComment} = require('../models/comment');
const express = require("express");
const { Router } = require('express');
const router = express.Router();

//ENDPOINTS GO HERE// 
router.post("/", async (req, res) => {
    try{
        const {error} = validateComment(req.body);
        if (error) return res.status(400).send(error)

        let newComment = await new Comment(req.body);
        await newComment.save()
        return  res.status(201).send(newComment)

    } catch (error){
        return res.status(500).send(`Internal Server Error: ${error}`)
    }
})

router.put("/:commentId", async(req, res) => {
try{
    const {error} = validateComment(req.body);
    if (error) return res.status(400).send(error);

    let likes = await Comment.findByIdAndUpdate(req.params.commentId, req.body, {new:true})
    if(!likes) return res.status(400).send(`Could not find any comments with the ID of ${req.params.commentId}`)

    return res.send(likes)

}catch (error){
    return res.status(500).send(`internal server errror: ${error}`)
}




})

router.get("/:videoId", async (req, res) => {
    try{
        let comments = await Comment.find({videoId: req.params.videoId})
        if (!comments) return res.status(400).send(`No products in this collection`);
        return res.status(200).send(comments)
    } catch (error){
        return res.status(500).send(`Internal Server Error: ${error}`)
    }
})

module.exports = router