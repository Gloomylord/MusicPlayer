import React, {Component} from 'react';
import './headerstyle.css';
import {inject, observer} from "mobx-react";


class Header extends Component {
    state = {
        selectedMusic: null
    };

    render() {
        return <div className='flexelement column header'>
            <div className='flexelement row headerPadandMar'>
                <div className='headercircle circle1'></div>
                <div className='headercircle circle2'></div>
                <div className='headercircle circle3'></div>
            </div>
            <div className='line'></div>
        </div>
    }
}

export default inject("mainStore")(observer(Header));