require('dotenv').config()
// required packages
const express = require('express')
const rowdy = require('rowdy-logger')
const cookieParser = require('cookie-parser')
const db = require('./models')
const cryptoJS = require('crypto-js')
const axios = require('axios')
// app config
const PORT = process.env.PORT || 3000
const app = express()
app.set('view engine', 'ejs')

// middlewares
const rowdyRes = rowdy.begin(app)
app.use(require('express-ejs-layouts'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// DIY middleware
// happens on every request
app.use((req, res, next) => {
  //  handy dandy debugging request logger
  console.log(`[${new Date().toLocaleString()}] incoming request: ${req.method} ${req.url}`)
  console.log('request body:', req.body)
  // modify the response to give data to the routes/middleware that is 'downstream'
  res.locals.myData = 'hi, I came from a middleware!'
  // tell express that the middleware is done
  next()
})

// auth middleware
app.use(async (req, res, next) => {
  try {
    // if there is a cookie --
    if (req.cookies.userId) {
      // try to find that user in the db
      const userId = req.cookies.userId
      const decryptedId = cryptoJS.AES.decrypt(userId, process.env.ENC_KEY).toString(cryptoJS.enc.Utf8)
      const user = await db.user.findByPk(decryptedId)
      // mount the found user on the res.locals so that later routes can access the logged in user
      // any value on the res.locals is availible to the layout.ejs
      res.locals.user = user
    } else {
      // the user is explicitly not logged in
      res.locals.user = null
    }
    next()
  } catch (err) {
    console.log(err)
  }
})

// routes
// app.get('/', (req, res) => {
//   // console.log(res.locals)
//   // throw new Error('oooops')
//   res.render('index')
// })

app.get('/', async (req, res) => {
  try {
    const searchUrl = 'https://forza-api.tk/'
    console.log(searchUrl)
    const response = await axios.get(searchUrl)
    const searchUrl2 = 'https://forza-api.tk/'
    const response2 = await axios.get(searchUrl)
    const searchUrl3 = 'https://forza-api.tk/'
    const response3 = await axios.get(searchUrl)
    console.log(response)
    res.render('index.ejs', {
      i: response.data.image,
      i2: response2.data.image,
      i3: response3.data.image
    })

  } catch (err) {
    console.log('t')
  }
})
app.get('/users/profile', async (req, res) => {
  try {
    const searchUrl = 'https://forza-api.tk/'
    console.log(searchUrl)
    const response = await axios.get(searchUrl)
    const searchUrl2 = 'https://forza-api.tk/'
    const response2 = await axios.get(searchUrl)
    const searchUrl3 = 'https://forza-api.tk/'
    const response3 = await axios.get(searchUrl)
    console.log(response)
    res.render('users/profile.ejs', {
      i: response.data.image,
      i2: response2.data.image,
      i3: response3.data.image
    })

  } catch (err) {
    console.log('t')
  }
})
// controllers
app.use('/users', require('./controllers/users'))

// 404 error handler -- needs to go last
app.use((req, res, next) => {
  // render a 404 template
  res.status(404).render('404.ejs')
})



// 500 error handler
app.use((error, req, res, next) => {
  // log the error
  console.log(error)
  // send a 500 error template
  res.status(500).render('500.ejs')
})



app.get('/favorites', async (req, res) => {
  const allFaves = await db.favorite.findAll()
  res.render('favorites.ejs' , {allFaves})
})

app.post('/favorites', async (req, res) => {
  //console.log(req.body)
  await db.fave.create({
    favoriteid: req.body.favoriteid,
    userid: userid
  })
  //res.redirect('/faves')
})
// app.post('/favorites', async (req, res) => {
//   console.log('USER', res.locals.user)
//   const created = await db.favorite.create({
//     favoriteid: req.body.favoriteid,
//     // userid: userid
//   })
//   res.send(created)
//   //res.redirect('/favorites')
// })


// app.post('/favorites', async (req, res) => {
//   try{
//     const created = await db.favorite.create({
//       favoriteid: req.body.favoriteid,
//       // userid: userid
//     })
//   }
//   catch (err){
// console.log(err)
//   }
// })

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  rowdyRes.print()
})
