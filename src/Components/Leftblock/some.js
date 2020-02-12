import React, {Component} from 'react';
import {inject, observer} from "mobx-react";


class Some extends Component {
    state ={
        id: this.props.some.id
    }
    playsome = () => {
        this.props.playsome(this.state.id);
    };

    render() {
        return <div key={this.props.some.id}
                    className='text list pointer accentuation'
                    onClick={this.playsome}>{this.props.some.musicName}</div>
    }
}

export default inject("mainStore")(observer(Some));