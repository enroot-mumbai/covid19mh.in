const graphql = require('graphql');
const _ = require('lodash');
const BlogModel = require('../model/BlogModel');
const DistrictModel = require('../model/DistrictModel');

const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull
    } = graphql;



const BlogType = new GraphQLObjectType({
    name: 'Blog',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        tag: { type: GraphQLString },
        problem: { type: GraphQLString },
        district: {
            type: DistrictType,
            resolve(parent,args){
                return DistrictModel.findById(parent.districtID);
            }
        }
    })
});

const DistrictType = new GraphQLObjectType({
    name: 'District',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        blogs: {
            type: new GraphQLList(BlogType),
            resolve(parent, args){
                return BlogModel.find( { districtID: parent.id } );
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Blog:{
            type: BlogType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return BlogModel.findById( args.id );
            }
        },
        District: {
            type: DistrictType,
            args: { id: { type: GraphQLID } },
            resolve(parent,args){
                return DistrictModel.findById( args.id );
            }
        },
        Blogs: {
            type: new GraphQLList(BlogType),
            resolve(parent,args){
                return BlogModel.find({});
            }
        },
        Districts:{
            type: new GraphQLList(DistrictType),
            resolve(parent, args){
                return DistrictModel.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addDistrict:{
            type: DistrictType,
            args: { name: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args){
                let district = new DistrictModel({
                    name: args.name
                });
                district.save().then((result)=>{
                    console.log("District Saved",result);
                    return result.name
                }).catch(err=>{
                    console.log("Error occured!",err);
                })
            }
        },
        addBlog:{
            type: BlogType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString) },
                tag: { type: new GraphQLNonNull(GraphQLString) },
                problem: { type: new GraphQLNonNull(GraphQLString) },
                districtID: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let blog = new BlogModel({
                    name: args.name,
                    tag: args.tag,
                    problem: args.problem,
                    districtID: args.districtID
                });
                return blog.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})