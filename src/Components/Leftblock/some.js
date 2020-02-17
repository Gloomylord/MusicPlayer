import React, {Component} from 'react';
import {inject, observer} from "mobx-react";


class Some extends Component {
    state ={
        id: this.props.some.id
    };
    playSome = () => {
        this.props.playSome(this.state.id);
    };

    render() {
        return <div key={this.props.some.id}
                    className='text list pointer accentuation'
                    onClick={this.playSome}>{this.props.some.musicName}</div>
    }
}

export default inject("mainStore")(observer(Some));