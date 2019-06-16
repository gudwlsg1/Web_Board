import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class PostView extends Component {
    state = {
        goToList: false,
        goToEdit : false
    };

    componentDidMount() {
        this.props.stores.PostStore.fetchItem(this.props.postId);
    }

    render() {
        if(this.state.goToList){
            return <Redirect to='/board'/>
        }
        if(this.state.goToEdit){
            return <Redirect to={`/board/edit/${this.props.postId}`} />
        }
        let p = this.props.stores.PostStore;
        let u = this.props.stores.ProfileStore;
        if(!p.viewItem){
            return <div/>;
        }
        return(
            <div>
                <div>
                    제목 : {p.viewItem.title}
                </div>
                <div dangerouslySetInnerHTML={{__html: p.viewItem.content}} />
                <div>
                    작성시간 : {new Date(p.viewItem.created).toLocaleString()}
                </div>
                <div>
                    <Link to='/board'>목록</Link>
                    {u.user_data && p.viewItem.userId === u.user_data.id && <button onClick={this.deletePost}>삭제</button>}
                    {u.user_data && p.viewItem.userId === u.user_data.id && <button onClick={this.updatePost}>수정</button>}
                </div>
            </div>
        );
    }

    updatePost = () => {
        if(window.confirm("수정하시겠습니까?") === false) return;

        if(this.props.stores.PostStore.viewItem.userId !== this.props.stores.ProfileStore.user_data.id){
            return;
        }

        this.setState({
            goToEdit : true
        })
    }

    deletePost = async () => {
        if(window.confirm("삭제하시겠습니까?") === false) return;

        if(this.props.stores.PostStore.viewItem.userId !== this.props.stores.ProfileStore.user_data.id){
            return;
        }

        if(this.props.postId){
            if(await this.props.stores.PostStore.deletePost(this.props.postId)){
                await this.props.stores.PostStore.fetchItems();
                this.setState({
                    goToList : true
                })
            }
        }
    }
}

export default PostView;