import React from 'react';
import { connect } from "react-redux";
import { fetchArticle } from "./../actions/articleActions";
import { push } from "react-router";
﻿import axios from "axios";
import { NotificationManager } from 'react-notifications';

class EditArticle extends React.Component{

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props){
    super(props);

    this.state = {
      errors: '',
      id: props.params.id,
    }

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();

    var formElement = document.querySelector("form");
    var formData = new FormData(formElement);
    formData.append('id', this.state.id);
    formData.append('api_token', this.props.article.user.api_token);

    axios.post(baseUrl+"api/v1/articles/update", formData)
      .then((response) => {

        this.context.router.push('/articles');
        NotificationManager.success('Article has been updated!', 'Success', 5000);

      })
      .catch((error) => {

        var errors = error.response.data.data;

        this.setState({
          errors: errors
        });

        NotificationManager.error('Error occured during operation!', 'Error', 5000);
      });

  }

  componentWillMount(){
    this.props.dispatch(fetchArticle(this.state.id));
  }

  createMarkup() {
    return {__html: this.state.errors};
  }

  render(){

    const { article } = this.props;

    var errors = '';

    if(this.state.errors != ''){
      errors = <div class="alert alert-danger" role="alert"><div dangerouslySetInnerHTML={this.createMarkup()} /></div>
    }

    var formElements = '';
    if(article !== null){
      formElements =
      <div>
        <div className="form-group col-lg-6">
          <input className="form-control" placeholder="Title" name="title" defaultValue={article.title}/>
        </div>

        <div className="form-group col-lg-6">
          <input className="form-control" placeholder="Description" name="body" defaultValue={article.body}/>
        </div>
        
        <div className="form-group col-lg-6">
          <input className="form-control" placeholder="Slug" name="slug" defaultValue={article.slug}/>
        </div>
        
        <div className="form-group col-lg-6">
          <input className="form-control" placeholder="Excerpts" name="excerpts" defaultValue={article.excerpts}/>
        </div>
      </div>
    }

    return(
              <div>
                <h1>Edit Article</h1>
                <div className="col-lg-8">
                  {errors}
                  <form method="post" onSubmit={this.handleSubmit}>

                    {formElements}

                    <div className="form-group col-lg-6">
                      <button type="submit" className="btn btn-primary btn-block">Update Article</button>
                    </div>

                  </form>
                </div>

              </div>
          );
        }
  }

  function mapStateToProps(state) {
    return {
      article: state.articles.article,
    }
  }
  export default connect(mapStateToProps)(EditArticle)
