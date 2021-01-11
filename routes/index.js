const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/authMiddleware')
const Story = require('../models/Story')

// @desc Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean() //As described by the mongoose docs, documents returned from queries with the lean option true are plain javascript objects, not Mongoose Documents
    res.render('dashboard', {
      name: req.user.firstName,
      stories,
    })
  } catch (error) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router
