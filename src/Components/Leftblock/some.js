import React, {Component} from 'react';
import {inject, observer} from "mobx-react";


class Some extends Component {
    state = {
        namber: this.props.some.namber
    };
    playsome = () => {
        this.props.playsome(this.state.namber);
    };

    render() {
        return <div key={this.props.some.id}
                    className='text list pointer accentuation'
                    onClick={this.playsome}>{this.props.some.musicName}</div>
    }
}

export default inject("mainStore")(observer(Some));