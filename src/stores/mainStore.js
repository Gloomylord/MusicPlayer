import {action, observable, decorate} from 'mobx';

let musicL = [];
let inquiry = async () => {
    let response = await fetch('/api/article', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({list: 'Popular'})
    });
    let start = await response.json();
    if (start.mass) {
        musicL = start.mass;
    }
    console.log('start:', start.mass);
};

inquiry().then(result => console.log('resalt:', result));

class MainStore {
    show = false;
    footerShow = true;
    list = musicL;
    listName = 'Popular';
    modal = false;
    playlist = [];
    toggleLeftPanel = () => {
        this.show = !this.show;
    };
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
        console.log('start:', start.mass);
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
        console.log('start:', start.isAdd);
    }
    deleteMusic = async (id) => {
        this.list.forEach((value, index) => {
            if (value.id == id) {
                this.list.splice(index,1);
            }
        });
        let response = await fetch('/api/isAdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: id, isAdd: false})
        });
        let start = await response.json();
        console.log('start:', start.isAdd);
    }
};

decorate(MainStore, {
    show: observable,
    footerShow: observable,
    list: observable,
    modal: observable,
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