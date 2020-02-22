import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import './style.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';

class AddForm extends Component {
    state = {
        input1color: false,
        input3color: false
    };
    maimElem = React.createRef();
    formElem = async (e) => {
        e.preventDefault();

        let result;
        let body = new FormData(document.getElementById('formElem'))
        if (document.getElementById('input1').value) {
            let response = await fetch('/api/addMusic/', {
                method: 'POST',
                body: body
            });
            try {
                let result = await response.json();
                if(result.message) {
                    toast.info(result.message, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                } else {
                    toast.error(result.a, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            } catch (err) {
                if (err.name == 'SyntaxError' || err.name == 'TypeError') {
                    toast.error('Тип файла не подходит, попробуйте mp3', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            }
        } else {

        }


    };
    hideModal = (e) => {
        if (e.target.id == 'modalBackground') {
            this.props.mainStore.showModal();
        }
        ;
    };
    close = () => {
        this.props.mainStore.showModal();
    }

    render() {
        return <div id='modalBackground' className='modal'
                    onClick={this.hideModal}>
            <form id="formElem"
                  ref={this.mainElem}
                  className='flexelement column modalValue divcenter'
                  onSubmit={this.formElem}
            >
                <div className='flexelement close'>
                    <i className="im im-x-mark-circle closeBtn pointer" onClick={this.close}></i>
                </div>
                <div className='txt divcenter ml1'>Add Music:</div>
                <div className='divcenter flet flexelement divInput'>
                    <div className='divcenter inputTitle'>Music Name:</div>
                    <input id='input1' className='inputText inputAll divcenter' type="text" name="musicName"
                           placeholder="MusicName" required="required"/>
                </div>
                <div className='divcenter flet flexelement divInput'>
                    <div className='divcenter inputTitle'>Author Name:</div>
                    <input id='input2' className='inputAll inputText divcenter' type="text" name="authorName"
                           placeholder="AuthorName"/>
                </div>
                <div className='flexelement row divcenter flet1 divInput'>
                    <div className='divcenter inputTitle'>Select Playlist:</div>
                        <select className='divcenter inputAll selectModal'>
                            <option value='Popular'>Popular</option>
                            <option value='myList'>My List</option>
                        </select>
                </div>
                <div className='divcenter flet flexelement divInput'>
                    <div className='divcenter inputTitle'>Select Music:</div>
                    <input id='input3' className='inputAll inputText inputFile divcenter' type="file" name="music"/>
                </div>
                <div className='divcenter flet1 flexelement divInput'>
                    <input className='inputBtn inputAll divcenter pointer' type="submit" value='send'
                           required="required"/>
                </div>
            </form>
            <ToastContainer/>
        </div>
    }
    ;

}

export default inject("mainStore")(observer(AddForm));
