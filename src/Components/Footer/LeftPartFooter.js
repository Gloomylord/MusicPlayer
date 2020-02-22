import React from "react";
import './style.css';
import {inject, observer} from "mobx-react";

function LeftPartFooter(props) {
    let dataMusic= props.some;
    return <div className='flexelement row footerleft divcenter leftwidth'>
        <div className='imgfooter'><img src="" className="imgfooter" alt="&#9746;"></img></div>
        <div className='flexelement column mal '>
            <span className='mat'>{dataMusic ? dataMusic.authorName:''}</span>
            <span>{dataMusic ? dataMusic.musicName:''}</span>
        </div>
    </div>
}


export default inject("mainStore")(observer(LeftPartFooter));