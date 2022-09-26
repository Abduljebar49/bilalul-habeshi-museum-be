const express = require("express");
const { getComments, getComment, addComment, deleteComment } = require("../controllers/comment-controller");

const router = express.Router();

router.get('/comments',getComments);
router.get('/comment/:id',getComment);
router.post('/comment',addComment);
router.delete('/comment/:id',deleteComment);

module.exports = {
  routes: router,
};
