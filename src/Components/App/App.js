import './App.css';
import '../MusicTamplate/MusicTamplate';
import React, {Component} from 'react';
import List from "../List";
import Leftblock from "../Leftblock/Leftblock";
import Footer from "../Footer/Footer";
import Header from "../header/Header";
import MusicTamplate from "../MusicTamplate/MusicTamplate";
import {inject, observer} from "mobx-react";

let playlist = new Set();

class App extends Component {
    playerRef = React.createRef();
    footerRef = React.createRef();
    state = {
        isProsses: false,
        musicInfo: null,
        sound: true,
        soundvolume: 0.5,
        list: 'Popular',
        loop: false,
        time: '',
        selectedMusic: null,
        isHandle: false,
        mouseDown: false,
        musicDisplay: false,
        length: 0
    };
    changeMusic = (id) => {
        this.setState({selectedMusic: id});
    };
    musicadd = (some) => {
        some.id = some.id
        playlist.add(some);
        this.setState({
            length: this.length + 1
        })
    };
    musicdel = (some) => {
        playlist.delete(some);
        this.props.mainStore.changeList(Array.from(playlist));
        this.setState({
            length: this.length - 1
        })
    }
    changeInfo = async (info) => {
        await this.setState({
            musicInfo: info
        });
    };
    popularList = async (list) => {
        await this.props.mainStore.changeList('Popular');
        this.setState({
            list: 'Popular'
        })
    };
    playList = async (list) => {
        this.props.mainStore.changeList(Array.from(playlist));
        await this.setState({
            list: 'PlayList'
        })
    };
    changeSoundVolumeClick = (e) => {
        if (!(e.target.id == 'soundCircle')) {
            let a = (e.clientX - e.target.getBoundingClientRect().x - 1) / 60;
            if (a < 0) {
                a = 0
            } else if (a > 1) {
                a = 1;
            }
            if (a == 0) {
                this.setState({
                    sound: false
                })
            } else {
                this.setState({
                    sound: true
                })
            }
            this.playerRef.current.volume = a;
            this.setState({
                soundvolume: a
            })
        }
    };
    myList = async (list) => {
        this.props.mainStore.changeList('myList');
        await this.setState({
            list: 'myList'
        })
    };
    sound = () => {
        if (this.state.sound) {
            this.playerRef.current.volume = 0;
        } else {
            this.playerRef.current.volume = this.state.soundvolume;
        }
        if (!(this.state.soundvolume == 0)) {
            this.setState({
                sound: !this.state.sound
            })
        }
    };
    handleOnclick = () => {
        this.playerRef.current.value = this.state.soundvolume;
        this.progresshandle();
        if (this.state.isProsses) {
            this.playerRef.current.pause();
            this.setState({
                isProsses: !this.state.isProsses
            })
        } else {
            this.playerRef.current.play();
            this.setState({
                isProsses: !this.state.isProsses
            })
        }
    };
    footerDisplay = () => {
        this.setState({
            musicDisplay: true
        })
    };
    imrandom = () => {
        if (this.state.musicInfo) {
            let namber = Math.round((this.props.mainStore.list.length) * Math.random() - 1 / 2);
            let some = this.props.mainStore.list[namber];
            if (some) {
                if (!(this.selectedMusic === some.id)) {
                    this.playerRef.current.pause();
                    this.playerRef.current.src = some.url;
                    if (!this.isProsses) {
                        this.handleOnclick();
                    }
                    this.changeMusic(some.id);
                    this.playerRef.current.play();
                    this.setState({
                        isProsses: true
                    })
                } else {
                    this.handleOnclick();
                }
            }
        }
    };
    loop = () => {
        this.setState({
            loop: !this.state.loop
        });
        this.playerRef.current.loop = !this.playerRef.current.loop;
    };
    progresshandle = () => {
        let player = this.playerRef.current;
        if (!this.state.isHandle) {
            this.setState({
                isHandle: true
            });
            let progrescircle = document.getElementById('progrescircle');
            let progress = document.getElementById('progress');
            this.playerRef.current.addEventListener('timeupdate', () => {
                let a = player.currentTime / player.duration;
                progrescircle.style.left = 100 * (a - 5 / document.documentElement.clientWidth) + '%';
                progress.style.width = 100 * a + '%';
                let sec = Math.floor(player.currentTime % 3600 % 60);
                let min = Math.floor(player.currentTime % 3600 / 60);
                sec = (sec < 10) ? '0' + sec : sec;
                min = (min < 10) ? '0' + min : min;
                let hour;
                if (Math.floor(player.currentTime % 3600 / 60) > 1) {
                    hour = Math.floor(player.currentTime / 3600)
                }
                if (hour) {
                    this.setState({
                        time: hour + ':' + min + ':' + sec
                    })
                } else {
                    this.setState({
                        time: min + ':' + sec
                    })
                }
            }, true);
            this.playerRef.current.addEventListener('ended', () => {
                if (!this.state.loop) {
                    this.next()
                }
            }, true);

            let thumb = document.getElementById('progrescircle');
            let slider = document.getElementById('slider');
            let ple = document.getElementById('player');
            thumb.onmousedown = (event) => {
                let p = ple.paused;
                ple.pause();
                event.preventDefault();
                let playerpos = event.clientX / document.documentElement.clientWidth;
                let shiftX = event.clientX - thumb.getBoundingClientRect().left;


                let onMouseMove = (event) => {
                    let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;
                    if (newLeft < 0) {
                        newLeft = 0;
                    }
                    let rightEdge = slider.offsetWidth - thumb.offsetWidth;
                    if (newLeft > rightEdge) {
                        newLeft = rightEdge;
                    }

                    thumb.style.left = newLeft - 5 + 'px';

                    playerpos = event.clientX / document.documentElement.clientWidth;

                    progress.style.width = event.clientX / document.documentElement.clientWidth * 100 + '%';
                };


                let onMouseUp = () => {
                    ple.currentTime = playerpos * ple.duration;
                    document.removeEventListener('mouseup', onMouseUp);
                    document.removeEventListener('mousemove', onMouseMove);
                    if (!p) {
                        ple.play();
                    }
                };
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);

            };

            thumb.ondragstart = () => {
                return false;
            };

            let soundCircle = document.getElementById('soundCircle');
            let sound = document.getElementById('sound');
            let soundvolume = document.getElementById('soundvolume');
            let soundnam = document.getElementById('soundnam');
            soundCircle.onmousedown = (event) => {
                event.preventDefault();

                let shiftX = event.clientX - soundCircle.getBoundingClientRect().left;

                let onMouseMove1 = (event) => {
                    soundnam.style.display = 'block';
                    let newLeft = event.clientX - shiftX - sound.getBoundingClientRect().left ;

                    if (newLeft < 0) {
                        newLeft = 0;
                    }

                    let rightEdge = sound.offsetWidth - soundCircle.offsetWidth;
                    if (newLeft > 60) {
                        newLeft = 60;
                    }
                    ple.volume = newLeft / 60;
                    this.setState({
                        soundvolume: ple.volume
                    });
                    if (this.state.soundvolume == 0) {
                        this.setState({
                            sound: false
                        })
                    } else {
                        this.setState({
                            sound: true
                        })
                    }
                    soundvolume.style.width = ple.volume * 100 + '%';
                    soundnam.style.left = (newLeft - soundnam.offsetWidth/2) + 'px';
                    soundCircle.style.left = (newLeft - 5) + 'px';
                };

                let onMouseUp1 = () => {
                    document.removeEventListener('mouseup', onMouseUp1);
                    document.removeEventListener('mousemove', onMouseMove1);
                    soundnam.style.display = 'none';
                };
                document.addEventListener('mousemove', onMouseMove1);
                document.addEventListener('mouseup', onMouseUp1);

            };
            sound.ondragstart = () => {
                return false;
            };
            document.addEventListener('keydown', (event) => {
                if (event.code == 'Space') {
                    if (this.state.isProsses) {
                        this.playerRef.current.pause();
                        this.setState({
                            isProsses: !this.state.isProsses
                        })
                    } else {
                        this.playerRef.current.play();
                        this.setState({
                            isProsses: !this.state.isProsses
                        })
                    }
                }
            })
        }
    };
    changeProgress = (event) => {
        this.playerRef.current.currentTime = this.playerRef.current.duration * event.clientX / document.documentElement.clientWidth;
        document.getElementById('progress').style.width = event.clientX / document.documentElement.clientWidth * 100 + '%';
        document.getElementById('progrescircle').style.left = event.clientX / document.documentElement.clientWidth * 100 + '%';
    };
    next = () => {
        if (this.state.musicInfo) {
            let some;
            let namber;
            this.props.mainStore.list.forEach((value, index) => {
                if (this.state.selectedMusic == value.id) {
                    namber = index;
                }
                if (namber == index - 1) {
                    some = value;
                }
            });
            if (some) {
                this.setState({
                    musicInfo: some
                });
                if (!(this.selectedMusic === some.id)) {
                    this.playerRef.current.pause();
                    this.playerRef.current.src = some.url;
                    this.setState({
                        selectedMusic: some.id
                    });
                    if (!this.isProsses) {
                        this.handleOnclick();
                    }
                    this.changeMusic(some.id);
                    this.playerRef.current.play();
                    this.setState({
                        isProsses: true
                    })
                } else {
                    this.handleOnclick();
                }
            }
        }
    };
    previous = () => {
        if (this.state.musicInfo) {
            let some;
            let namber;
            this.props.mainStore.list.forEach((value, index) => {
                if (this.state.selectedMusic == value.id) {
                    namber = index;
                }
            });
            some = this.props.mainStore.list[namber - 1];
            if (some) {
                if (!(this.selectedMusic === some.id)) {
                    this.playerRef.current.pause();
                    this.playerRef.current.src = some.url;
                    if (!this.isProsses) {
                        this.handleOnclick();
                    }
                    this.changeMusic(some.id);
                    this.playerRef.current.play();
                    this.setState({
                        isProsses: true
                    })
                } else {
                    this.handleOnclick();
                }
            }
        }
    };
    playsome = (id) => {
        this.props.mainStore.footerShowtrue();
        this.footerDisplay();

        
            let some;
            playlist.forEach((value, valueAgain, set) => {
                if (value.id == id) {
                    this.setState({
                        musicInfo: value
                    });
                    some = value;
                }
            });
            if (some) {
                if (!(this.selectedMusic === some.id)) {
                    this.playerRef.current.pause();
                    this.playerRef.current.src = some.url;
                    if (!this.isProsses) {
                        this.handleOnclick();
                    }
                    this.changeMusic(some.id);
                    this.playerRef.current.play();
                    this.setState({
                        isProsses: true
                    })
                } else {
                    this.handleOnclick();
                }
            }

    };

    render() {
        return <div>
            <Header/>
            <div className="flexelement row">
                <Leftblock some={Array.from(playlist)}
                           playsome={this.playsome}
                />
                <div className="App main">
                    <div className="App-header">
                        <div className='childrad'>
                            <button
                                className={'button ' + ((this.state.list === 'PlayList') ? 'btndown' : 'btnup')}
                                onClick={this.playList}
                            >PlayList
                            </button>
                            <button
                                className={'button ' + ((this.state.list === 'Popular') ? 'btndown' : 'btnup')}
                                onClick={this.popularList}
                            >Popular
                            </button>
                            <button
                                className={'button ' + ((this.state.list === 'myList') ? 'btndown' : 'btnup')}
                                onClick={this.myList}
                            >My list
                            </button>
                        </div>
                        <List playerRef={this.playerRef}
                              selectedMusic={this.state.selectedMusic}
                              changeMusic={this.changeMusic}
                              handleOnclick={this.handleOnclick}
                              isProsses={this.state.isProsses}
                              musicInfo={this.state.musicInfo}
                              changeInfo={this.changeInfo}
                              footerDisplay={this.footerDisplay}
                              list={this.props.mainStore.list}
                              chooselist={this.state.list}
                              state={this.state}
                              some={Array.from(playlist)}
                              musicadd={this.musicadd}
                              musicdel={this.musicdel}
                        />
                        <audio ref={this.playerRef} id="player" src="/music/taylor-swift-love-story.mp3"
                               type="audio/mp3"></audio>
                    </div>
                </div>
            </div>
            <div className='flexelement btnfooter'
                 style={{bottom: !this.props.mainStore.footerShow ? '0px' : "-60px"}}
            >
                <i className="im im-care-up divcenter pointer"
                   onClick={this.props.mainStore.footerShowtrue}></i>
            </div>
            <Footer ref={this.footerRef}
                    mainState={this.state}
                    handleOnclick={this.handleOnclick}
                    soundclick={this.sound}
                    loop={this.loop}
                    playerRef={this.playerRef}
                    changeProgress={this.changeProgress}
                    changeSoundVolume={this.changeSoundVolumeClick}
                    next={this.next}
                    previous={this.previous}
                    imrandom={this.imrandom}
            />

        </div>
    }
}

export default inject("mainStore")(observer(App));