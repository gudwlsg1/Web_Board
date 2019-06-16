import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@inject('stores')
@observer
class PostAdd extends Component {
    state = {
        userId : 1,
        title : '',
        content : '',
        goToList: false,
        goToPost: false,
        id : -1
    };

    constructor(props){
        super(props);
        if(this.props.postid && this.props.stores.PostStore.viewItem){
            let post = this.props.stores.PostStore.viewItem;
            this.state = {
                ...this.state,
                title : post.title,
                content : post.content,
                id : post.id
            }
        }
    }

    render(){
        console.log(this.state);
        if(this.state.goToList){
            return <Redirect to='/board'/>
        }
        if(this.state.goToPost){
            return <Redirect to={`/board/view${this.props.postId}`}/>
        }
        return(
            <div>
                <div>
                    제목 <input value={this.state.title} onChange={this.updateTitle}/>
                </div>
                <div>
                    <CKEditor editor={ClassicEditor}
                              data={this.state.content}
                              onChange={this.updateContent}/>
                </div>
                <div>
                    <button onClick={this.addNewPost}>확인</button>
                </div>
            </div>
        );
    }

    updateTitle = event => {
        this.setState({
            ...this.state,
            title : event.target.value
        });
    };

    updateContent = (event, editor) => {
        this.setState({
            ...this.state,
            content : editor.getData()
        });
    };

    addNewPost = async ()=> {
        if(this.props.postid && await this.props.stores.PostStore.editPost(this.state)){
            await this.props.stores.PostStore.fetchItems();
            await this.setState({
                ...this.state,
                goToPost: true
            });
            console.log("수정완료");
        } else if(await this.props.stores.PostStore.addNewPost(this.state)){
            await this.props.stores.PostStore.fetchItems();
            await this.setState({
                ...this.state,
                goToList: true
            });
        }
    }
}

export default PostAdd;