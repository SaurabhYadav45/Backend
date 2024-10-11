const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async(req, res) =>{
    try {
        // fetch data from req body
        const{post, user, body} = req.body;
        // Create comment object
        const comment = new Comment({
            post, user, body
        });
        // Save the new comment into database
        const savedComment = await comment.save();
        
        // find the post by id , add the new comment to its comment array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push:{comments:savedComment._id}},{new: true})
        .populate("comments")
        .exec();

        res.json({
            post:updatedPost,
        });
    } catch (err) {
        return res.status(500).json({
            error:"error while Creating comment"
        });
    }
}