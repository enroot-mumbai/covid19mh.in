import { gql } from 'apollo-boost';

export const getDistrictQuery = gql`
{
    Districts{
        name
        id
    }
}
`

export const getBlogQuery = gql`
    {
        Blogs{
            name
            problem
            tag
            id
        }
    }
`

export const getABlogQuery = gql`
    query($id:ID){
        Blog(id:$id){
            name
            id
            tag
            problem
            district{
                name
                id
                blogs{
                    name
                    tag
                    id
                }
            }
        }
    }
`

export const addBlog = gql`
    mutation($name:String!,$tag:String!,$problem:String!,$districtID:ID!){
        addBlog(name:$name,tag:$tag,problem:$problem,districtID:$districtID){
            name
            tag
            id
        }
    }
`