import {observable, action} from "mobx";
import axios from "axios";

class PostStore{

    static __instance = null;

    static getinstance(){
        if(PostStore.__instance === null){
            PostStore.__instance = new PostStore();
        }
        return PostStore.__instance;
    }

    constructor(){
        PostStore.__instance = this;
    }

    @observable post_time = null;
    @action getTime = async () => this.post_time = await new Date().getTime();

    @observable items = null;
    @action fetchItems = async () => {
        try {
            this.items = null;
            let response = await axios({
                url : "http://localhost:8080/api/posts",
                method : "get",
                headers : {
                    'Content-type' : 'application/json; charset=UTF-8'
                },
                timeout : 3000
            });

            if(response.status === 200){
                this.items = response.data;
            }
        }catch (ex) {
            console.log(ex);
        }
    }

    @observable viewItem = null;
    @action fetchItem = async (postId) => {
        this.viewItem = null;
        try {
            let response = await axios({
                url : `http://localhost:8080/api/posts/${postId}`,
                method : "get",
                headers : {
                    'Content-type' : 'application/json; charset=UTF-8'
                },
                timeout : 3000
            });

            if(response.status === 200){
               this.viewItem = response.data;
            }
        }catch (ex) {
            console.log(ex);
        }
    };

    @action addNewPost = async (post) => {
        try {
            let response = await axios({
                url : `http://localhost:8080/api/posts`,
                method : "post",
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                data: JSON.stringify(post)
            });

            return (response.status === 200);
        }catch (ex) {
            console.log(ex);
            return false;
        }
    };

    @action editPost = async (post) => {
        try {
            let response = await axios({
                url : `http://localhost:8080/api/posts`,
                method : "put",
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                timeout : 5000,
                data: JSON.stringify(post)
            });

            return (response.status === 200);
        }catch (ex) {
            console.log(ex);
            return false;
        }
    }

    @action deletePost = async (postId) => {
        try {
            let response = await axios({
                url : `http://localhost:8080/api/posts/${postId}`,
                method : "delete",
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                }
            });

            return (response.status === 200);
        }catch (ex) {
            console.log(ex);
            return false;
        }
    }
}

export default PostStore.getinstance();