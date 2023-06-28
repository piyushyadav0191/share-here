const express = require("express");
const authController = require("../controller/auth.controller");
const commentController = require("../controller/comment.controller");
const { authenticateUser } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/allusers", authenticateUser, authController.getAllUsers);
router.post("/user/comment", authenticateUser, commentController.createComment);
router.post(
  "/user/comments/:commentId/replies",
  authenticateUser,
  commentController.replyComment
);
router.get("/comments", authenticateUser, commentController.getComments);
router.put(
  "/comments/update/:commentId",
  authenticateUser,
  commentController.updateComment
);
router.delete(
  "/comments/delete/:commentId",
  authenticateUser,
  commentController.deleteComment
);

module.exports = router;
