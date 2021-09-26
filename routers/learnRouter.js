const express = require('express')
const adminRouter = require('./routers/adminRouter')
const publicRouter = require('./routers/publicRouter')
const app = express()

app.use(express())

app.use('/admin', adminRouter)
app.use('/', publicRouter)

app.listen(5000, (req, res) =>{
  console.log('listening  from port 5000')
})