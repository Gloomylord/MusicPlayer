import React, {Component} from 'react';
import "./style.css";
import Playlist from "./Playlist";
import {inject, observer} from "mobx-react";



class LeftBlock extends Component {
    render() {
        return (
            <div className="leftblock flexelement column toppadding widthleftdlock">
                <div className="title text">PLAYLIST &#10010;</div>
                <Playlist some={this.props.some}
                          playSome={this.props.playSome}
                />
            </div>
        )
    }
}

export default inject("mainStore")(observer(LeftBlock));