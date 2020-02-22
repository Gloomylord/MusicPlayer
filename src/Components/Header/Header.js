import React, {Component,Fragment} from 'react';
import './style.css';
import {inject, observer} from "mobx-react";
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.css';
import '../iconmonstr-iconic-font-1.3.0/css/iconmonstr-iconic-font.min.css';

class Header extends Component {
    state = {
        selectedMusic: null
    };

    render() {
        return <div className='flexelement column header'>
            <div className='flexelement headerpos'>
                <div className='flexelement row headerPadandMar'>
                    <div className='headercircle circle1'></div>
                    <div className='headercircle circle2'></div>
                    <div className='headercircle circle3'></div>
                </div>

                <div className='flexelement divcenter addMusic pointer' onClick={this.props.mainStore.showModal}>
                    <div className='textstyle divcenter'>Add Music</div>
                    <i className="im im-plus headerPlus divcenter"></i>
                </div>
            </div>
            <div className='line'></div>
        </div>
    }
}

export default inject("mainStore")(observer(Header));