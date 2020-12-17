const passport = require('passport')
const { ExtractJwt } = require('passport-jwt')
require('dotenv').config
const mongoose = require('mongoose')

//option 1
const db = require('../models')
const User = require('../models/User')
db.User.findById


//passprt strategy for authenticating with a JSON web token
//this allows us to authenticate endpoints using a token 
const JwtStrategy = require('passport-jwt').Strategy
const Extract = require('passport-jwt').ExtractJwt

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
//key is inside of our Environment
options. secretOrKey = process.env.Jwt_SECRET 

module.exports = (passport) =>{
    passport.use(new JwtStrategy(options, (jwt_payload, done)=>{
        //have a user that were going to find by the ied in the paylod
        // when we get a user back we will check the database
        User.findById(jwt_payload.id)
        .then(user =>{
            if (user){
                //if a user is found return null for (error) and the user
                return done(null, user)
            }else{
                //no user was found
                return done(null,false)
            }
        }).catch(error => console.log(error))
    }))
}