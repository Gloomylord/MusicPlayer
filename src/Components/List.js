import React, {Component} from 'react';
import MusicTamplate from './MusicTamplate/MusicTamplate';
import {inject, observer} from "mobx-react";

class List extends Component {
    componentDidMount() {
        this.props.mainStore.changeList('Popular');
    }
    render() {
        let finalList;
        if (!(this.props.mainStore.list.length === 0) && this.props.mainStore.list !== 'x') {
            finalList = this.props.mainStore.list.map((some, index) => <MusicTamplate
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
                message={this.props.message}
            />);
        } else {
            if (this.props.mainStore.list == 'x') {
                return <div key={this.props.list} className='flexelement row musicList borderList borderRadius jc-c minHeigth'>
                    <div className='flexelement divcenter '>
                        <div className="loader "/>
                    </div>
                </div>
            }
            finalList = <div key={this.props.list} className='flexelement row musicList borderList '>
                <div className='flexelement divcenter'>
                    Плейлист пока пуст
                </div>
            </div>
        }


        return <div className='borderRadius scroll'>
            {finalList}
        </div>
    }
}

export default inject("mainStore")(observer(List));
