import {action, observable, decorate} from 'mobx';

class MainStore {
    footerShow = true;
    list = null;
    listName = 'Popular';
    modal = false;
    playlist = null;

    newPlaylist = async () => {
        let response = await fetch('/api/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({list: 'playlist'})
        });
        let start = await response.json();
        if (start.musics) {
            this.playlist = start.musics;
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
        if (start.musics) {
            this.list = start.musics;
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