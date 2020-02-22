import React, {Component, PureComponent} from 'react';
import {inject, observer} from "mobx-react";
import Some from "./Some";


class Playlist extends PureComponent {

    componentDidMount() {
        this.props.mainStore.newPlaylist();
    }

    render() {
        let finalList;
        if (this.props.mainStore.playlist) {
            if(this.props.mainStore.playlist.length !== 0){
                finalList = this.props.some.map(some => (<Some key={some.id} some={some}
                                                               playSome={this.props.playSome}
                />));
            } else {
                finalList=<div className='text list'>Пока ничего нет</div>
            }
        } else {
            if (!this.props.mainStore.playlist) {
                return (
                    <div className="loader"/>
                );
            }
        }
        return <div>
            {finalList}
        </div>
    }
}

export default inject("mainStore")(observer(Playlist));