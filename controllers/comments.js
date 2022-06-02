const express = require('express')
const router = express.Router()
const db = require('../models')
const cryptoJS = require('crypto-js')
const bcrypt = require('bcryptjs')

router.get('/', async (req, res) => {

    if (!res.locals.user) {
          // if the user is not authorized, ask them to log in
          res.render('users/login.ejs', { msg: 'please log in to continue' })
          return // end the route here
      }
    const user = res.locals.user
    const allComments = await db.comment.findAll()



    res.render('users/favorites.ejs' , {allComments, user})
  })

  router.post('/', async (req, res) => {
    //console.log(req.body)
    console.log('ROUTE HIT')
    await db.comment.create({

        favoriteId: req.body.id,
        userId: res.locals.user.dataValues.id,
        comment: req.body.comment



    })

    res.redirect('/favorites')
  })

// router.delete('/', async (req,res) => {
//     const instance = await db.favorite.findOne({
//         where: {
//             favoriteId: req.body.favoriteId
//         }
//     })

//     console.log(instance, 'TEST')
//     // await the destruction
//     await instance.destroy()
//     res.redirect('/favorites')
// })





router.get('/:id/edit', async (req,res) => {
    const id = await db.comment.findOne({
        where: {
           id : req.params.id
        }
    })
    console.log(id)

     res.render('users/edit.ejs', {comment:id})
})
router.put('/', async(req, res) => {
    const updatedComment = await db.comment.findOne({
        where: {
          id : req.body.id
        }
    })
    await updatedComment.update({comment: req.body.comment})
    res.redirect('/favorites')
})
  module.exports = router
