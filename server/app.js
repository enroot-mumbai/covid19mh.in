const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config/keys');
const cors = require('cors');

const app = express();
app.use(cors());

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect( MONGODB_URI, options )
mongoose.connection.once("connected",()=>{
    console.log("Connected to the Database!")
})
mongoose.connection.on("error",()=>{
    console.log("Oopsie! This is embarassing! Try again!")
})

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))

const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log("Listening for requests on Port 4000...");
})