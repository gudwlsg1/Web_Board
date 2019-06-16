import {observable, action, computed} from "mobx";

class TimeStore{

    static __instance = null;

    static getinstance(){
        if(TimeStore.__instance === null){
            TimeStore.__instance = new TimeStore();
        }
        return TimeStore.__instance;
    }

    constructor(){
        TimeStore.__instance = this;
    }

    @observable current_time = null;
    @action getTime = async () => this.current_time = await new Date();

    @computed get ms(){
        return this.current_time ? this.current_time.getMilliseconds() : 'not set';
    }
}

export default TimeStore.getinstance();