const express = require('express')
const connectTomongo = require('./db');
var cors = require('cors') 

connectTomongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json());

app.use('/api/auth',require('./Routes/auth'))
app.use('/api/notes',require('./Routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
