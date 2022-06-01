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
    const allFaves = await db.favorite.findAll({
        include: [db.comment]
    })


    console.log(allFaves)
    res.render('users/favorites.ejs' , {allFaves, user})
  })

  router.post('/', async (req, res) => {
    console.log(req.body)
    await db.favorite.findOrCreate({
      where:{
        carUrl: req.body.carUrl,
        userId: res.locals.user.dataValues.id
      },


    })

    res.redirect('/favorites')
  })

router.delete('/', async (req,res) => {
    const instance = await db.favorite.findOne({
        where: {
            carUrl: req.body.carUrl
        }
    })

    console.log(instance, 'TEST')
    // await the destruction
    await instance.destroy()
    res.redirect('/favorites')
})

  module.exports = router
