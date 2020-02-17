import React, {Component, PureComponent} from 'react';
import {inject, observer} from "mobx-react";
import Some from "./some";


class Playlist extends PureComponent {

    componentDidMount() {
        this.props.mainStore.newPlaylist();
    }

    render() {
        let finalList;
        if(this.props.mainStore.playlist.length === 0) {
            return (
                <div className="loader"/>
            );
        }

        if (this.props.some.length!==0) {
            finalList = this.props.some.map(some => (<Some key={some.id} some={some}
                                                           playSome={this.props.playSome}
            />));
        } else {
            finalList = this.state.list.map(some => (<Some key={some.id} some={some}
                                                           playSome={this.props.playSome}
            />));
        }
        return <div>
            {finalList}
        </div>
    }
}

export default inject("mainStore")(observer(Playlist));