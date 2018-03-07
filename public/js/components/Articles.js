import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router";
import { fetchArticles, deleteArticle } from "./../actions/articleActions";
﻿import axios from "axios";

class Articles extends React.Component{
        
   constructor(){
        super();
        this.handleBtnDelete = this.handleBtnDelete.bind(this);
   }

  componentWillMount(){
     this.props.dispatch(fetchArticles());
  }
  handleBtnDelete(id, event){
    event.preventDefault();

    var r = confirm("Are you sure you want to delete this artcle!");
      if (r == true) {
        const url = baseUrl+"/api/v1/articles/delete";
        var formElement = document.getElementById("form_"+id);
        var formData = new FormData(formElement);
        this.props.dispatch(deleteArticle(formData));
      }
  }   
        
render(){
            return(
                    <div>
                    <h1 style={{margin: '0% 0% 2% 1.5%'}}>Articles</h1>
                    <Link to="articles/new" style={{margin: '0% 0% 2% 1.5%'}} className="btn btn-primary btn-sm pull-left" >Create New &nbsp; <i className="glyphicon glyphicon-plus"></i></Link>
                    <div className="col-lg-12">
                    { this.props.articles.map((article, index) => {    
                    return(
                            <div key={index+1}>
                            <div className="panel panel-primary">
                                <div class="panel-heading"> <h3 class="panel-title">{article.title}</h3> </div>
                                <div className="panel-body">
                                    {article.body}
                                </div>
                                <div className="panel-footer">
                                    <Link to={'articles/'+article.id+'/edit'} className="btn btn-success btn-xs pull-left"><i className="glyphicon glyphicon-pencil"></i></Link>
                                    <form id={"form_"+article.id} className="pull-left" method="post">
                                        <input type="hidden" name="id" value={article.id} />
                                        <a className="btn btn-danger btn-xs" onClick={(event) => this.handleBtnDelete(article.id, event)} href="#" id={article.id}><i className="glyphicon glyphicon-trash"></i></a>
                                    </form>
                                </div>
                            </div>
                            </div>
                      )
         }) }
         </div>   
         </div>   
    )
    }
}    
function mapStateToProps(state) {
    return {
      articles: state.articles.articles,
    }
}
export default connect(mapStateToProps)(Articles)
