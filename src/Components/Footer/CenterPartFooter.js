import React, {Component} from 'react';
import './Style.css'
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';
import {inject, observer} from "mobx-react";

let stop = <div className='divm divcenter'>
    <div className='divstop'></div>
    <div className='divstop2'></div>
    <div className='divstop'></div>
</div>;
let play = <div className='divm divcenter colorneed'>➤</div>;

class CenterPartFooter extends Component {
    render() {
        return <div className='divcenter flexelement row '>
            <div className='divcenter flexelement change-color'><i
                className="im im-random pointer footermedia botmedia divcenter mr2 "
                onClick={this.props.imrandom}
            ></i></div>
            <div className='divcenter flexelement change-color'>
                <i className="im im-previous pointer footermedia botmedia divcenter mr1 "
                    onClick={this.props.previous}
                ></i>
            </div>
            <div id='footerplay' className='circle flexelement footerbtn pointer '
                 onClick={this.props.handleOnclick}>
                {this.props.isProsses ? stop : play}
            </div>
            <div className='divcenter flexelement change-color'>
                <i className="im im-next pointer footermedia botmedia divcenter ml1 "
                onClick={this.props.next}
                ></i>
            </div>
            <div className='divcenter flexelement '>
                <i
                    className="im im-loop pointer footermedia botmedia divcenter ml2 "
                    onClick={this.props.loop}
                    style={this.props.isLoop ? {color: 'red'} : {color: 'darkblue'}}
                ></i>
            </div>
        </div>

    }
}

export default inject("mainStore")(observer(CenterPartFooter));