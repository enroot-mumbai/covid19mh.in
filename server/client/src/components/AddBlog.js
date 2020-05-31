import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash'
import { getDistrictQuery, addBlog, getBlogQuery } from '../queries/queries'


class AddBlog extends Component {
    state={
        name:'',
        tag:'',
        problem:'',
        districtID:''
    }
    componentDidMount(){
        window.$(document).ready(function(){
            window.$('select').formSelect();
            window.$('input.autocomplete').autocomplete({
              data: {
                'Unemployement': null,
                'Resources': null,
                'Mental Health': null,
                'Lonliness': null,
                'Physical Health': null,
                'Food': null,
                'Medicines': null,
                'Money': null,
                'Transport': null,
                'Other': null
                },
            });
          });
    };
    componentDidUpdate(){
        window.$(document).ready(function(){
            window.$('select').formSelect();
        })
    }
    displayDistricts=()=>{
        // console.log(this.props)
        const data = this.props.getDistrictQuery;
        if(data.loading){
            return (<option disabled>Loading Districts...</option>)
        }else{
            return data.Districts.map(district=>{
                return(
                    <option key={ district.id } value= { district.id }>
                        { district.name }
                    </option>
                )
            })
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        // console.log(this.state)
        this.props.addBlog({
            variables:{
                name: this.state.name,
                tag: this.state.tag,
                problem: this.state.problem,
                districtID: this.state.districtID
            },
            refetchQueries: [ { query: getBlogQuery } ]
        });
        this.setState({
            name:"",
            tag:"",
            problem:"",
            districtID:""
        })
    }
    render() {
        return (
            <form id="add-blog" onSubmit={this.handleSubmit} className="white container col s12">
                <div className="input-field">
                    <label htmlFor="name" >Name:</label>
                    <input type="text" value={this.state.name} required id="name" onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="tag" >Briefly describe your experience:</label>
                    <input 
                        className="autocomplete"
                        id="tag" 
                        onChange={this.handleChange}
                        value={this.state.tag}
                        type="text"
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="problem" >Problem:</label>
                    <textarea type="text" value={this.state.problem} required onChange={this.handleChange} id="problem" className="materialize-textarea"/>
                </div>
                <div className="input-field">
                    <select id="districtID" value={this.state.districtID} required onChange={this.handleChange}>
                        <option value="" disabled>Select Your District</option>
                        { 
                           this.displayDistricts()
                        }
                    </select>
                    <label>District:</label>
                </div>
                <button className="input-field">
                    <a className="btn-floating btn-small waves-effect waves-light red">
                        <i className="material-icons">add</i>
                    </a>
                </button>
            </form>
        )
    }
}

export default compose(
    graphql(getDistrictQuery,{ name: "getDistrictQuery" } ),
    graphql(addBlog,{ name: "addBlog" } )
)(AddBlog);
