import React, {Component, PureComponent} from 'react';
import {inject, observer} from "mobx-react";
import Some from "./some";

let p = [];

class Playlist extends PureComponent {
    state = {
        list: ''
    };

    async componentWillMount() {
        let response = await fetch('/api/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({list: 'playlist'})
        });
        let start = await response.json();
        if (start.mass) {
            p=start.mass;
        }
        console.log('start:', start.mass);
    }

    render() {
        let finalList;
        if (this.props.some.length!==0) {
            finalList = this.props.some.map(some => (<Some key={some.id} some={some}
                                                           playSome={this.props.playSome}
            />));
        } else {
            finalList = p.map(some => (<Some key={some.id} some={some}
                                                           playSome={this.props.playSome}
            />));
        }
        return <div>
            {finalList}
        </div>
    }
}

export default inject("mainStore")(observer(Playlist));