const mongoose = require('mongoose');

const collectionName = 'post'
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model(collectionName, postSchema);

module.exports = Post;