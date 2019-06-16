import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

import Login from './Login';
import UserView from './UserView';
import UserEdit from './UserEdit';

@inject('stores')
@observer
class Profile extends Component {
    render(){
        let userData = this.props.stores.ProfileStore.user_data;
        if(userData === null){
            return <Login />
        } else if(this.props.match && this.props.match.params.command === 'edit'){
           return <UserEdit />
        }
        return(
            <UserView />
        );
    }
}

export default Profile;