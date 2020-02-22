import React, {Component, PureComponent} from 'react';
import './style.css';
import {inject, observer} from "mobx-react";
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';

const body = <div className='divm stophover'>
    <div className='divstop1'/>
    <div className='divstop2'/>
    <div className='divstop1'/>
</div>;


class MusicTemplate extends PureComponent {
    mainElem = React.createRef();
    state = {
        isProcess: false,
        music: this.props.some,
        isAdd: false
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.isAdd !== this.state.isAdd) this.setState({isAdd: nextProps.isAdd});
    }

    render() {
        let {some} = this.props;
        return <div
            ref={this.mainElem}
            key={some.id}
            className={'flexelement row musicList borderList ' + ((this.props.selectedMusic === some.id) ? 'btndown' : 'btnup')}
        >
            <div className='flexelement mar'>
                <div className='divcenter number'>{this.props.index + 1}</div>
            </div>
            <div className='flexelement'>
                <button
                    className={'btn pointer accentuation ' + ((this.props.selectedMusic === some.id) ? 'btndown' : 'btnup')}
                    key={some.id}
                    onClick={this.handleOnclick}
                >
                    {(this.props.isProcess && (this.props.selectedMusic === some.id)) ? body : "➤"}
                </button>
            </div>
            <div className='mal'>
                <div className='musicName'>{some.musicName}</div>
                <div className='name'>{some.authorName}</div>
            </div>
            <div className='flexelement l'>
                <div className='time divcenter'>{some.time}</div>
            </div>
            <div className='flexelement mal'>
                {(this.props.list == 'playlist') ?
                    <i className="im im-x-mark-circle-o divcenter deletefont pointer accentuation"
                       onClick={this.deleteMusic}
                    /> : (
                        !(some.isAdd) ? (<button
                            className={'btn pointer accentuation ' + ((this.props.selectedMusic === some.id) ? 'btndown' : 'btnup')}
                            key={some.id}
                            onClick={this.addMusic}
                        > &#10010;</button>) : <i className="im im-check-mark deletefont divcenter "/>)}
            </div>
        </div>
    };

    addMusic = () => {
        this.props.mainStore.addMusic(this.props.some.id);
        this.props.message('Добавлено');
    };
    deleteMusic = () => {
        this.props.mainStore.deleteMusic(this.props.some.id);
        this.props.message('Удалено');
    };
    handleOnclick = (event) => {
        this.props.mainStore.footerShowTrue();
        event.target.blur();
        this.props.footerDisplay();
        this.props.changeInfo(this.props.some);
        if (!(this.props.selectedMusic === this.props.some.id)) {
            this.props.playerRef.current.pause();
            this.props.playerRef.current.src = (this.props.some.url);
            if (!this.props.isProcess) {
                this.props.handleOnclick();
            }
            this.props.changeMusic(this.props.some.id);
            this.props.playerRef.current.play().then(() => {
                console.log('Playing...')
            }).catch((err) => {
                console.log('error...', err)
            });
            this.setState({
                isProcess: true
            })
        } else {
            this.props.handleOnclick();
        }

    };
    time = () => {
        let player = this.props.playerRef.current;
        let time;
        if (player.duration) {
            let player = this.props.playerRef.current;
            let sec = Math.floor(player.duration % 3600 % 60);
            let min = Math.floor(player.duration % 3600 / 60);
            sec = (sec < 10) ? '0' + sec : sec;
            min = (min < 10) ? '0' + min : min;
            let hour;
            if (Math.floor(player.duration % 3600 / 60) > 1) {
                hour = Math.floor(player.duration / 3600)
            }
            if (hour) {
                time = hour + ':' + min + ':' + sec;
            } else {
                time = min + ':' + sec;
            }
        } else {
            time = '00:00';
        }
        return time;
    }

}

export default inject("mainStore")(observer(MusicTemplate));
