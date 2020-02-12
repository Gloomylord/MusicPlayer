import React, {Component} from 'react';
import "./style.css";
import Playlist from "./Playlist";
import {inject, observer} from "mobx-react";



class Leftblock extends Component {
    render() {
        return (
            <div className="leftblock flexelement column toppadding widthleftdlock">
                <div className='choice text' onClick={this.props.mainStore.toggleLeftPanel}>{this.props.mainStore.show ? "What's New" : "Test"}</div>
                <div className='choice text'>Discovery</div>
                <div className='choice text'>Rising</div>
                <div className='choice text'>Videos</div>
                <div className="title text">YOUR MUSIC</div>
                <div className='text list'>Songs</div>
                <div className="title text">PLAYLIST &#10010;</div>
                <Playlist some={this.props.some}
                          playsome={this.props.playsome}
                />
            </div>
        )
    }
}

export default inject("mainStore")(observer(Leftblock));