const postController = require('../controllers/posts.controller')

const router = app => {
  app.use('/post', postController)
}

module.exports = router