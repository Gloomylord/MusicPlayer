import React, {Component} from 'react';
import './MusicTamplate.css';
import {inject, observer} from "mobx-react";


const body = <div className='divm stophover'>
    <div className='divstop1'></div>
    <div className='divstop2'></div>
    <div className='divstop1'></div>
</div>


class MusicTamplate extends Component {
    mainElem = React.createRef();
    state = {
        isProsses: false,
        music: this.props.some,
        isAdd: false
    };


    render() {
        let {some} = this.props;
        return <div
            ref={this.mainElem}
            key={some.id}
            className={'flexelement row musicList borderList ' + ((this.props.selectedMusic === some.id) ? 'btndown' : 'btnup')}
            onClick={this.mainOnclick}
        >

            <div className='flexelement mar'>
                <div className='divcenter namber'>{this.props.index+1}</div>
                {(this.props.list == 'PlayList') ? <i className="im im-x-mark-circle-o divcenter deletefont pointer accentuation"
                                                      onClick={this.musicdel}
                ></i>:(
                    !(some.isAdd) ? (<button
                    className={'btn pointer accentuation ' + ((this.props.selectedMusic === some.id) ? 'btndown' : 'btnup')}
                    key={some.id}
                    onClick={this.musicaddit}
                > &#10010;</button>): <i className="im im-check-mark deletefont divcenter "></i>   )}

            </div>
            <div className='flexelement'>
                <button className={'btn pointer accentuation ' + ((this.props.selectedMusic === some.id) ? 'btndown' : 'btnup')}
                        key={some.id}
                        onClick={this.handleOnclick}
                >
                    {(this.props.isProsses && (this.props.selectedMusic === some.id)) ? body : "➤"}
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
                <button className={'btn btn-menu ' + ((this.props.selectedMusic === some.id) ? 'btndown' : 'btnup')}
                >&#9776;</button>
            </div>
        </div>
    }

    musicaddit = () => {
        this.props.mainStore.musicadd(this.props.some.id);
        this.props.musicadd(this.state.music);
    };
    musicdel = () => {
        this.props.mainStore.musicdel(this.props.some.id);
        this.props.musicdel(this.state.music);
    }
    handleOnclick = (event) => {
        this.props.mainStore.footerShowtrue();
        event.target.blur()
        this.props.footerDisplay();
        this.props.changeInfo(this.props.some);
        if (!(this.props.selectedMusic === this.props.some.id)) {
            this.props.playerRef.current.pause();
            this.props.playerRef.current.src = this.props.some.url;
            if (!this.props.isProsses) {
                this.props.handleOnclick();
            }
            this.props.changeMusic(this.props.some.id);
            this.props.playerRef.current.play();
            this.setState({
                isProsses: true
            })
        } else {
            this.props.handleOnclick();
        }

    }

}

export default inject("mainStore")(observer(MusicTamplate));
