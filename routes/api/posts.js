const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

//@route post api/post
//@desc create a post
//@access  private
router.post(
    '/',
    [auth, [check('text', 'adding text is required').not().isEmpty()]],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
  
      try {
        const user = await User.findById(req.user.id).select('-password'); //find the user and get it from db without the password
  
        const newPost = new Post({
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id,
        });
  
        const post = await newPost.save();
        res.json(post);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );
  
  //@route get api/posts
  //@desc get all posts
  //@access  private
  router.get('/', auth, async (req, res) => {
    try {
      const posts = await Post.find().sort({ date: -1 }); //sort by the most recent first that why we used the negative 1
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  //@route get api/post/:id
  //@desc get single post by the id
  //@access  private
  router.get('/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found ' });
      }
      res.json(post);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found ' });
      }
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  //@route DELETE api/post/:id
  //@desc DELETE post
  //@access  private
  router.delete('/:id', auth, async (req, res) => {
    try {
      //remove Post
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found ' });
      }
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'user not authorized' });
      }
      await post.remove();
      res.json('Post removed');
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found ' });
      }
      res.status(500).send('Server error');
    }
  });
  
  //@route get api/post/like/:id
  //@desc like a post
  //@access  private
  router.put('/like/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (
        post.likes.filter(like => like.user.toString() === req.user.id).length > 0
      ) {
        return res.status(400).json({ msg: 'post already liked' });
      }
      post.likes.unshift({ user: req.user.id });
      await post.save();
      res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  //@route get api/post/unlike/:id
  //@desc like a post
  //@access  private
  router.put('/unlike/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (
        post.likes.filter(like => like.user.toString() === req.user.id).length ===
        0
      ) {
        return res.status(400).json({ msg: 'post has not yet been liked' });
      }
  
      let removeIndex = post.likes
        .map(like => like.user.toString())
        .indexOf(req.user.id);
  
      post.likes.splice(removeIndex, 1);
  
      await post.save();
      res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  //@route post api/post/comment/:id
  //@desc create a comment for a post
  //@access  private
  router.post(
    '/comment/:id',
    [auth, [check('text', 'adding text is required').not().isEmpty()]],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
  
      try {
        const user = await User.findById(req.user.id);
        const post = await Post.findById(req.params.id);
        const newComments = {
          user: req.user.id,
          avatar: user.avatar,
          name: user.name,
          text: req.body.text,
        };
        post.comments.unshift(newComments); //unshift push at the beginning rather than the end
  
        await post.save();
  
        res.json(post.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );
  
  //@route delete api/post/comment/:id
  //@desc delete a comment from a post
  //@access  private
  router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
  
      //remove comment
      const post = await Post.findById(req.params.id);
      const comment=post.comments.find(
          comment => comment.id===req.params.comment_id
      );
      if(!comment){
          return res.status(404).json({msg:'Comment does not exists'});
  
      }
      if(comment.user.toString()!==req.user.id){
          return res.status(401).json({msg:'User not authorized'})
      }
     
      const removeIndex = post.comments
        .map(comment => comment.user.toString())
        .indexOf(req.user.id);
  
      post.comments.splice(removeIndex, 1);
  
      await post.save();
      res.json(post.comments
          );
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'comment not found ' });
      }
      res.status(500).send('Server error');
    }
  });
  module.exports = router;
  