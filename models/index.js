require('dotenv').config()
const mongoose = require('mongoose')

//mongo connection here
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: true
})

console.log(process.env)

//mongoose connection object 
const db = mongoose.connection
console.log(db)

//setup an event listenermthat will fire once the connection opens for the database 
//log to the terminal what host and port we are on
db.once('open',()=>{
    console.log(`connected to mongoDB at ${db.host}:${db.port}`)
})

db.on('error',(error)=>{
    console.log(`database error\n ${error}`)
})
// const User = require('./User')

// module.exports = User