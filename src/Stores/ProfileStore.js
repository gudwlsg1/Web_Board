import {observable, action} from "mobx";
import axios from "axios";

class ProfileStore {
    static __instance = null;

    static getinstance(){
        if(ProfileStore.__instance === null){
            ProfileStore.__instance = new ProfileStore();
        }
        return ProfileStore.__instance;
    }

    constructor(){
        ProfileStore.__instance = this;
    }

    @observable user_data = null;
    @action login = async (user) => {
        this.user_data = null;
        try{
            let response = await axios({
                url : `http://localhost:8080/api/users/login`,
                method : "post",
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                data: JSON.stringify(user),
                timeout : 3000
            });

            if(response.status === 200 && response.data){
                /*await setTimeout(
                    ()=> this.user_data = response.data,
                    3000
                );*/
                this.user_data = response.data;
                console.log(response.data);
                return true;
            }
            return false;
        }catch (ex) {
            console.log(ex);
            return false;
        }
    }

    @action logout = () => {
        this.user_data = null;
    }

    @action editUser = async (user) => {
        try{
            let response = await axios({
                url : `http://localhost:8080/api/users`,
                method : "put",
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                data: JSON.stringify(user),
                timeout : 3000
            });

            if(response.status === 200){
                this.user_data.account = user.account;
                this.user_data.email = user.email;
                this.user_data.username = user.username;

                return true;
            }
            return false;
        }catch (ex) {
            console.log(ex);
            return false;
        }
    }
}

export default ProfileStore.getinstance();