import {action, observable, decorate} from 'mobx';
import myMusic from "../Components/myMusic";
import musicList from "../Components/musicList";

let my = myMusic;
let musicL = musicList;

class MainStore {
    show = false;
    footerShow = true;
    list = musicL;
    listname = 'Popular';
    toggleLeftPanel = () => {
        this.show = !this.show;
    };
    footerShowtrue = () => {
        this.footerShow = true;
    };
    footerShowfalse = () => {
        this.footerShow = false;
    };
    changeList = (str) => {
        if (str == 'Popular') {
            this.list = musicL;
            this.listname = 'Popular';
        } else {
            if (str == 'myList') {
                this.listname = 'myList';
                this.list = my;
            } else {
                this.listname = 'PlayList';
                this.list = str;
            }
        }
    };

    musicadd = (id) => {
        let some;
        this.list.forEach((value, index) => {
            if (value.id == id) {
                some = index;
                this.list[index].isAdd = true
            }
        });
        if (this.listname == "Popular") {
            musicL[some].isAdd = true;
        }
        if (this.listname == "myList") {
            my[some].isAdd = true;
        }
    }
    musicdel = (id) =>{
        console.log('start');
        let some;
        musicL.forEach((value, index) => {
            if (value.id == id) {
                musicL[index].isAdd = false
            }

        });
        my.forEach((value, index) => {
            if (value.id == id) {
                my[index].isAdd = false
            }
        });
    }
};

decorate(MainStore, {
    show: observable,
    footerShow: observable,
    list: observable,
    toggleLeftPanel: action,
    footerShowfalse: action,
    footerShowtrue: action,
    changeList: action,

});

const mainStore = new MainStore();

export default mainStore;
export {MainStore};