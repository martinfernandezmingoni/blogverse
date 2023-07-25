const {Router} = require('express')
const Post = require('../models/postModel')

const router = Router()

router.get(('/'), async(req,res) =>{
  try {
    const post = await Post.find()
    res.status(200).json({message:post}) 
  } catch (error) {
    res.status(400).json({message:error})
  }
})

router.post(('/'), async (req,res) =>{
  try {
    const {title, content, author} = req.body
    const newPost = new Post({
      title, 
      content, 
      author
    })
    await newPost.save()
    res.status(200).json({message: newPost})
  } catch (error) {
    res.status(500).json({message: error})
  }
})

router.delete(('/post/:id'), async (req,res) => {
  try {
    const {id} = req.params
    await Post.findByIdAndDelete(id)
    res.json({message:'Publicacion eliminada exitosamente'})
  } catch (error) {
    res.status(500).json({message: error})
  }
})

module.exports = router