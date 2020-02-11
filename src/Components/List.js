import React, {Component} from 'react';
import MusicTamplate from './MusicTamplate/MusicTamplate';
import musicList from "./musicList";
import myMusic from "./myMusic";
import {inject, observer} from "mobx-react";

class List extends Component {

    render() {
        let finalList;
        if (!(this.props.mainStore.list.length === 0)) {
            finalList = this.props.mainStore.list.map((some,index) => <MusicTamplate
                key={some.id}
                index={index}
                selectedMusic={this.props.selectedMusic}
                changeMusic={this.props.changeMusic}
                handleOnclick={this.props.handleOnclick}
                some={some}
                isProsses={this.props.state.isProsses}
                playerRef={this.props.playerRef}
                musicInfo={this.props.state.musicInfo}
                list={this.props.state.list}
                changeInfo={this.props.changeInfo}
                footerDisplay={this.props.footerDisplay}
                musicadd={this.props.musicadd}
                musicdel={this.props.musicdel}
            />);
        } else {
            finalList = <div key={this.props.list} className='flexelement row musicList borderList'>
                <div className='flexelement divcenter'>
                    Плейлист пока пуст
                </div>
            </div>
        }


        return <div  className='borderRadius'>
            {finalList}
        </div>
    }
}

export default inject("mainStore")(observer(List));
