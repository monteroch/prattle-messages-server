const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const Message = require('./models/message');

const graphQLSchema = require('./graphql/schema/index');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});

app.use('/graphql', graphqlHttp({
    schema: graphQLSchema,
    graphiql: true
}));


mongoose.connect('mongodb://localhost:4444/prattle-messages', { useNewUrlParser: true, useUnifiedTopology: true })
.then( () => {
    var server = app.listen(4002, () => {
        console.log('[Prattle Messages] running on port 4002');
    })
    
})
.catch( error => {
    throw new Error('Cannot connect to DB');
})


app.get('/', (req, res) => {
    res.send('[Prattle Messages] running on port 4002');
});

app.post('/saveuser', async (req, res) => {
    console.log("POST [save-user]");
    let msg = req.body;
    const message = new Message({
        _id: msg._id,
        conversationId: msg.conversationId,
        author: msg.author,
        createdAt: msg.createdAt,
        text: msg.text

    });
    const result = await message.save();
    console.log("The result is: ", result);
    res.send(req.body.text);
});