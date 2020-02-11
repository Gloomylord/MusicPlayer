import React, {Component} from 'react';
import './Style.css'
import LeftPartFooter from "./LeftPartFooter";
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import CenterPartFooter from "./CenterPartFooter";
import {inject, observer} from "mobx-react";


let stop = <div className='divm divcenter'>
    <div className='divstop'></div>
    <div className='divstop2'></div>
    <div className='divstop'></div>
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
    }
    soundRef = React.createRef();

    render() {
        let sondon = <i
            className="im im-volume divcenter pointer footermedia soundmedia"
            onClick={this.props.soundclick}></i>;
        let soundoff = <i
            className="im im-volume-off divcenter pointer footermedia soundmedia"
            onClick={this.props.soundclick}
        ></i>

        return < div id='footer'
                     className={'footer footerflex column ' + (!(this.props.mainState.musicDisplay) ? 'none ' : "flexelement ")}
                     style={{bottom: this.props.mainStore.footerShow ? '0px' : "-60px"}}
        >
            <div id='slider' className='progres pointer' onClick={this.props.changeProgress}>

                <div id='progress' className='musicprogres divcenter '
                     style={{width: '0%'}}
                >
                    <div id='progrescircle' className='progrescircle'></div>
                </div>
            </div>
            <div className='flexelement footerflex footermain'>
                <LeftPartFooter some={this.props.mainState.musicInfo}/>
                <div className='flexelement footerflex width1'>
                    <CenterPartFooter
                        next={this.props.next}
                        handleOnclick={this.props.handleOnclick}
                        isProsses={this.props.mainState.isProsses}
                        loop={this.props.loop}
                        isLoop={this.props.mainState.loop}
                        previous={this.props.previous}
                        imrandom={this.props.imrandom}
                    />
                    <div className='divcenter footerrigth flexelement row'>
                        <div className='divcenter footerrigth flexelement row'>
                            {this.props.mainState.musicInfo ? this.props.mainState.time : ''}
                        </div>
                        <div className='divcenter footerrigth flexelement row'>
                            {this.props.mainState.musicInfo ? this.time() : ''}
                        </div>
                        {this.props.mainState.sound ? sondon : soundoff}
                        <div id='sound'
                             ref={this.soundRef}
                             className='sound divcenter pointer rel'
                             onClick={this.props.changeSoundVolume}
                        >
                            <div id='soundnam' className='soundnam'>
                                {Math.round(this.props.mainState.soundvolume * 100)+'%'}
                            </div>
                            <div id='soundvolume' className='soundvelue divcenter soundveluepos'
                                 style={(!this.props.mainState.sound) ? {display: 'none'} : {
                                     display: 'flex',
                                     width: this.props.mainState.soundvolume * 100 + '%'
                                 }}
                            >
                                <div id='soundCircle' className='soundCircle divcenter'
                                     style={{left: this.props.mainState.soundvolume * 60 - 6 + 'px'}}
                                ></div>
                            </div>
                        </div>
                        <i className="im im-care-down divcenter pointer footermedia soundmedia ml2"
                           onClick={this.props.mainStore.footerShowfalse}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default inject("mainStore")(observer(Footer));