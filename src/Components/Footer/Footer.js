import React, {Component} from 'react';
import './style.css'
import LeftPartFooter from "./LeftPartFooter";
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import CenterPartFooter from "./CenterPartFooter";
import {inject, observer} from "mobx-react";


let stop = <div className='divm divcenter'>
    <div className='divstop'/>
    <div className='divstop2'/>
    <div className='divstop'/>
</div>;
let play = <div className='divm divcenter colorneed'>➤</div>;

class Footer extends Component {
    time = () => {
        let player = this.props.playerRef.current;
        let time;
        if (player.duration) {
            let player = this.props.playerRef.current;
            let sec = Math.floor(player.duration % 3600 % 60);
            let min = Math.floor(player.duration % 3600 / 60);
            sec = (sec < 10) ? '0' + sec : sec
            min = (min < 10) ? '0' + min : min
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
    };

    render() {
        let soundon = <i
            className="im im-volume divcenter pointer footermedia soundmedia"
            onClick={this.props.soundClick}/>;
        let soundoff = <i
            className="im im-volume-off divcenter pointer footermedia soundmedia"
            onClick={this.props.soundClick}
        />;

        return <div  id='footer'
                     className={'footer footerflex column ' + (!(this.props.mainState.musicDisplay) ? 'none ' : "flexelement ")+(this.props.mainStore.modal?'none':'')}
                     style={{bottom: this.props.mainStore.footerShow ? '0px' : "-60px"}}
        >
            <div id='slider' className='progres pointer' onClick={this.props.changeProgress}>

                <div id='progress' className='musicprogres divcenter '
                     style={{width: '0%'}}
                >
                    <div id='progrescircle' className='progrescircle'/>
                </div>
            </div>
            <div className='flexelement footerflex footermain'>
                <LeftPartFooter some={this.props.mainState.musicInfo}/>
                <div className='flexelement footerflex width1'>
                    <CenterPartFooter
                        next={this.props.next}
                        handleOnclick={this.props.handleOnclick}
                        isProcess={this.props.mainState.isProcess}
                        loop={this.props.loop}
                        isLoop={this.props.mainState.loop}
                        previous={this.props.previous}
                        randomMusic={this.props.randomMusic}
                    />
                    <div className='divcenter footerrigth flexelement row'>
                        <div className='divcenter footerrigth flexelement row'>
                            {this.props.mainState.musicInfo ? this.props.mainState.time : ''}
                        </div>
                        <div className='divcenter footerrigth flexelement row'>
                            {this.props.mainState.musicInfo ? this.time() : ''}
                        </div>
                        {this.props.mainState.sound ? soundon : soundoff}
                        <div id='sound'
                             className='sound divcenter pointer rel'
                             onClick={this.props.changeSoundVolume}
                        >
                            <div id='soundnam' className='soundnam'>
                                {Math.round(this.props.mainState.soundVolume * 100)+'%'}
                            </div>
                            <div id='soundvolume' className='soundvelue divcenter soundveluepos'
                                 style={(!this.props.mainState.sound) ? {display: 'none'} : {
                                     display: 'flex',
                                     width: this.props.mainState.soundVolume * 100 + '%'
                                 }}
                            >
                                <div id='soundCircle' className='soundCircle divcenter'
                                     style={{left: this.props.mainState.soundVolume * 60 - 6 + 'px'}}
                                />
                            </div>
                        </div>
                        <i className="im im-care-down divcenter pointer footermedia soundmedia ml2"
                           onClick={this.props.mainStore.footerShowFalse}
                        />
                    </div>
                </div>
            </div>
        </div>
    }
}

export default inject("mainStore")(observer(Footer));