import React, {Component, PureComponent} from 'react';
import {inject, observer} from "mobx-react";
import Some from "./some";


class Playlist extends PureComponent {
    render() {
        const finalList = this.props.some.map(some => (<Some key={some.id} some={some}
                                                             playsome={this.props.playsome}
        />));
        return <div>
            {finalList}
        </div>
    }
}

export default inject("mainStore")(observer(Playlist));