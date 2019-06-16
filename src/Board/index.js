import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

import BoardList from './BoardList';
import './Board.scss';
import PostView from "./PostView.js";
import PostAdd from "./PostAdd";

@inject('stores')
@observer
class Board extends Component {

    componentDidMount() {
        this.props.stores.PostStore.fetchItems();
    }

    render(){
        if(this.props.match && this.props.match.params.command === 'view'){
           return <PostView postId={this.props.match.params.postid}/>
        }

        if(this.props.match && this.props.match.params.command === 'add'){
            return <PostAdd />
        }

        if(this.props.match && this.props.match.params.command === 'edit')
            return <PostAdd postid={this.props.match.params.postid} />;

        let p = this.props.stores.PostStore;
        let u = this.props.stores.ProfileStore;
        return (
            <div>
                {p.items && <BoardList items={p.items} user={u} />}
            </div>
        );
    }
}

export default Board;