const { Comment } = require("../models/User");
const { User } = require("../models/User");
const { Reply } = require("../models/User");

exports.createComment = async (req, res) => {
  try {
    const { userId, content } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const comment = new Comment({ content, user: userId });
    const savedComment = await comment.save();
    user.comments.push(savedComment._id);
    await user.save();

    res.status(201).json({ message: "Comment created", comment: savedComment });
  } catch (err) {
    console.error("Failed to create a comment", err);
    res.status(500).json({ message: "Failed to create a comment" });
  }
};

exports.replyComment = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const { commentId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const reply = new Reply({ content, user: userId, comment: commentId });
    const savedReply = await reply.save();
    comment.replies.push(savedReply._id);
    await comment.save();
    user.replies.push(savedReply._id);
    await user.save();

    res.status(201).json({ message: "Reply created", reply: savedReply });
  } catch (err) {
    console.error("Failed to create a reply", err);
    res.status(500).json({ message: "Failed to create a reply" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate({
        path: "replies",
        populate: { path: "user", select: "fullName" },
      })
      .populate({ path: "user", select: "fullName" });

    res.json({ comments });
  } catch (err) {
    console.error("Failed to fetch comments", err);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json({ message: "Comment updated", comment });
  } catch (err) {
    console.error("Failed to update comment", err);
    res.status(500).json({ message: "Failed to update comment" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json({ message: "Comment deleted", comment });
  } catch (err) {
    console.error("Failed to delete comment", err);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};
