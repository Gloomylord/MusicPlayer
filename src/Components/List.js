import React, {Component} from 'react';
import MusicTemplate from './MusicTemplate/MusicTemplate';
import {inject, observer} from "mobx-react";

class List extends Component {
    componentDidMount() {
        this.props.mainStore.changeList('Popular');
    }
    render() {
        let list;
        if (this.props.mainStore.list  && this.props.mainStore.list.length !== 0 ) {
            list = this.props.mainStore.list.map((some, index) => <MusicTemplate
                key={some.id}
                index={index}
                selectedMusic={this.props.selectedMusic}
                changeMusic={this.props.changeMusic}
                handleOnclick={this.props.handleOnclick}
                some={some}
                isProcess={this.props.state.isProcess}
                playerRef={this.props.playerRef}
                musicInfo={this.props.state.musicInfo}
                list={this.props.state.list}
                changeInfo={this.props.changeInfo}
                footerDisplay={this.props.footerDisplay}
                message={this.props.message}
            />);
        } else {
            if (!this.props.mainStore.list) {
                return <div key={this.props.list} className='flexelement row musicList borderList borderRadius jc-c minHeigth'>
                    <div className='flexelement divcenter '>
                        <div className="loader "/>
                    </div>
                </div>
            }
            list = <div key={this.props.list} className='flexelement row musicList borderList jc-c minHeigth'>
                <div className='flexelement divcenter ml-10'>
                        <div>Плейлист пока пуст</div>
                </div>
            </div>
        }


        return <div className='borderRadius scroll'>
            {list}
        </div>
    }
}

export default inject("mainStore")(observer(List));
