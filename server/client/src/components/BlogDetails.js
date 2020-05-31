import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getABlogQuery } from '../queries/queries'

class BlogDetails extends Component {
    blogDets=()=>{
        const {Blog} = this.props.data
        if(Blog){
            return(
            <div className="white-text">
                <h2 className="white-text">{Blog.name}</h2>
                <p className="white-text">{Blog.tag}</p>
                <p className="white-text">{Blog.problem}</p>
                <p className="white-text">District: {Blog.district.name}</p>
                <p className="white-text"><i>All other issues in this District:</i></p>
                <ul className="other-blogs">
                    {
                        Blog.district.blogs.map(blog=>{
                            return(
                                <li key = { blog.id } className="white-text">
                                    <strong>{ blog.name }</strong> | 
                                    <div className="chip" style={{margin:'0px 10px'}}>
                                    { blog.tag } 
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            )
        }else{
            return(<h5>Nothing selected yet...</h5>)
        }
    }    
    
    render() {
        return (
            <div id="blog-details" className="col s12">
                {this.blogDets()}
            </div>
        )
    }
}

export default graphql(getABlogQuery,{
    options:(props)=>{
        return{
            variables:{
                id: props.blogID
            }
        }
    }
})(BlogDetails)
