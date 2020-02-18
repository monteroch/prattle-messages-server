const graphql = require("graphql");
const Message = require('../../models/message');
var mongoose = require('mongoose');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} = graphql;

const MessageType = new GraphQLObjectType({
    name: "Message",
    fields: () => ({
        _id: { type: GraphQLString },
        conversationId: { type: GraphQLString },
        author: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        text: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        getMessage:{
            type: MessageType,
            args: { _id: { type: GraphQLString }},
            resolve( parent, args ){
                try{
                    console.log("The _id is: ", args._id);
                    const result =  Message.findOne({_id: args._id});
                    return result;
                }catch(err){
                    console.log(err)
                }
            }
        },
        loadMessages:{
            // type: MessageType,
            type: new GraphQLList(MessageType),
            args:{ conversationId: { type: GraphQLString }},
            resolve(parent, args){
                try{
                    const result = Message.find({conversationId: args.conversationId});
                    return result;
                }catch(err){
                    console.log(err);
                }
            }
        }
    }
});

const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    fields:{
        saveMessage:{
            type: MessageType,
            args:{
                _id: {type: GraphQLString},
                conversationId: {type: GraphQLString}, 
                author: {type: GraphQLString}, 
                createdAt: {type: GraphQLString}, 
                text: {type: GraphQLString}},
            resolve(parent, args){
                try{
                    const message = new Message({
                        _id: args._id,
                        conversationId: args.conversationId,
                        author: args.author,
                        createdAt: args.createdAt,
                        text: args.text
                    });
                    const result = message.save();
                    console.log("The result is: ", result);
                    return result;
                }catch(err){
                    console.log(err)                  
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});