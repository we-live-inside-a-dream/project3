const express = require('express')
// const D2dRoutes = require('./routes/D2dRoutes')


const app = express()
const port = 5001

// app.use('/api',D2dRoutes)//
app.use('/', express.static('../client/build'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})