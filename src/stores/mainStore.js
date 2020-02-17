import {action, observable, decorate} from 'mobx';

class MainStore {
    show = false;
    footerShow = true;
    list = 'x';
    listName = 'Popular';
    modal = false;
    playlist = [];
    toggleLeftPanel = () => {
        this.show = !this.show;
    };
    newPlaylist = async () => {
        let response = await fetch('/api/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({list: 'playlist'})
        });
        let start = await response.json();
        if (start.mass) {
            this.playlist = start.mass;
        }
    }
    showModal = () => {
        this.modal = !this.modal;
    }
    footerShowTrue = () => {
        this.footerShow = true;
    };
    footerShowFalse = () => {
        this.footerShow = false;
    };
    changeList = async (str) => {
        let response = await fetch('/api/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({list: str})
        });
        let start = await response.json();
        if (start.mass) {
            this.list = start.mass;
            this.listName = str;
        }
    };

    addMusic = async (id) => {
        this.list.forEach((value, index) => {
            if (value.id == id) {
                this.list[index].isAdd = true;
            }
        })
        let response = await fetch('/api/isAdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: id, isAdd: true})
        });
        let start = await response.json();
        this.newPlaylist();

    }
    deleteMusic = async (id) => {
        let response = await fetch('/api/isAdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: id, isAdd: false})
        });
        let start = await response.json();
        this.list.forEach((value, index) => {
            if (value.id == id) {
                this.list.splice(index,1);
                this.playlist=this.list;
            }
        });

    }

};

decorate(MainStore, {
    show: observable,
    footerShow: observable,
    list: observable,
    modal: observable,
    playlist: observable,
    showModal: action,
    toggleLeftPanel: action,
    footerShowFalse: action,
    footerShowTrue: action,
    changeList: action,
    deleteMusic: action,
    addMusic: action,
});

const mainStore = new MainStore();

export default mainStore;
export {MainStore};