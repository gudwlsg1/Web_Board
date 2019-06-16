import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class UserView extends Component {
    state = {
        goToEdit : false
    };

    render() {
        if(this.state.goToEdit){
            return <Redirect to='/user/edit' />;
        }
        let user = this.props.stores.ProfileStore.user_data;
        let created = new Date(user.created);
        return(
            <div>
                <div>이름 : {user.username}</div>
                <div>이메일 : {user.email}</div>
                <div>가입일 : {created.getMonth() + 1}-{created.getDate()} </div>
                <div><button onClick={this.userEdit}>정보수정</button><button onClick={this.logout}>로그아웃</button></div>
            </div>
        )
    }

    logout = ()=> {
        this.props.stores.ProfileStore.logout();
    };

    userEdit = async ()=>{
        await this.setState({
            ...this.state,
            goToEdit : true
            }
        );
    }
}

export default UserView;