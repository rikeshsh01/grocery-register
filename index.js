const connectToMongo = require("./db")
const express = require('express')



const app = express()
const port = 4000

app.use(express.json());


// Available Routes 
app.use('/api/customer',require('./routes/customer'));
app.use("/api/creditlist",require('./routes/creditlist'));
app.use("/api/admin",require('./routes/admin'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

connectToMongo();
