import React, { useEffect, useState } from 'react';
import { graphql } from 'react-apollo'
import { getBlogQuery } from '../queries/queries';
import BlogDetails from './BlogDetails'



const BlogList=(props)=> {
    const [selected,setSelected] = useState(null);
    useEffect(()=>{
        window.$(document).ready(function(){
            // window.$('.chip').chips();
        })
    })
    const DisplayBlogs=()=>{
        const blogs = props.data;
        if(blogs.loading){
            return (
                <div>Loading Content...</div>
            )
        }else{
            return blogs.Blogs.length!==0 ? (
             blogs.Blogs.map(blog=>{
               return <li key = { blog.id } onClick={e=>setSelected(blog.id)} >
                        <strong>{ blog.name }</strong> | 
                        <div className="chip" style={{margin:'0px 10px'}}>
                           { blog.tag } 
                        </div>
                    </li>
            })
            ) : (
                <span className="flow-text" style={{margin:"20px"}}>
                    This seems so dry! Try adding something!
                </span>
            )
        }
    }
    return (
        <div id="blog-list" className="col s12">
            <h4 className="flow-text">Check Out What Other People around you have to say about it:</h4>
            <hr className="seperation" />
            <ul>
                { DisplayBlogs() }
            </ul>
            <BlogDetails blogID={ selected }/>
        </div>
        
    )
}

export default graphql(getBlogQuery)(BlogList)
