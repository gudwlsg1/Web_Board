import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class Login extends Component {

    state = {
        account : '',
        password : '',
        goToProfile : false
    };

    render(){
        if(this.state.goToProfile){
            return <Redirect to='/user' />;
        }
        return(
            <div>
                <div className='login-container'>
                    <input value={this.state.account} placeholder='ID' onChange={this.updateAccount}/>
                    <input value={this.state.password} placeholder='PASSWORD' onChange={this.updatePassword} type='password'/>
                    <button onClick={this.login}>로그인</button>
                </div>
            </div>
        );
    }

    updateAccount = event => {
        this.setState({
            ...this.state,
            account : event.target.value
        });
    };

    updatePassword = event => {
        this.setState({
            ...this.state,
            password : event.target.value
        });
    };

    login = async () => {
        if(await this.props.stores.ProfileStore.login(this.state)) {
            await this.setState({
                ...this.state,
                goToProfile: true
            });
        }
        else {
            await this.setState({
                ...this.state,
                password: '',
                goToProfile : false
            });
        }
    };
}

export default Login;