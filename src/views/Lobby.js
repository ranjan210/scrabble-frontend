import React from "react"
import { Link, Navigate } from "react-router-dom";
import logo from "../assets/logo-redesign.png"
import roomManager from "../services/roomCreationHandler"
import "./lobby_styles.css"
import socket from "../services/socketService"

class Lobby extends React.Component {


    constructor(props) {
        super(props);
        this.getRoom = this.getRoom.bind(this);
        this.setUsername = this.setUsername.bind(this)
        this.setRoomId = this.setRoomId.bind(this)
        this.joinRoom = this.joinRoom.bind(this)
        this.state = {
            createRoom: null,
            username: "",
            roomId: null,
            success: false
        }
    }

    getRoom() {
        roomManager.createRoom(this.state.username).then((res) => {
            if (res.success == true) {
                this.setState({
                    success: true
                }, () => {
                    socket.emit("join-room", window.username, window.roomId)
                    window.firstPlayer = true;
                })
            }
        })
    }

    setUsername(e) {
        e.preventDefault();
        this.setState({
            username: e.target.value
        })
    }


    setRoomId(e) {
        e.preventDefault();
        this.setState({
            roomId: e.target.value
        })
    }

    joinRoom(e) {
        e.preventDefault();
        roomManager.joinRoom(this.state.username, this.state.roomId).then((res) => {
            console.log(window.roomId)
            console.log(window.username)
            if (res.success == true) {
                this.setState({
                    success: true
                }, () => {
                    socket.emit("join-room", window.username, window.roomId)

                })
            }
        })
    }

    componentDidMount() {
        this.setState({ createRoom: window.createRoom })
    }


    render() {
        if (this.state.success == true) {
            return (
                <Navigate to="/room"></Navigate>
            )
        }
        else {
            return (
                <div className="center">
                    <div className="form-lobby">
                        {this.state.createRoom && <div className="lobby-form-small">
                            <div className="row-logo">

                                <div>
                                    Scrabble
                                </div>
                            </div>
                            <div className="lobby-input">
                                <input type="text" placeholder="Enter your Username" className="input-box" onChange={this.setUsername}></input>
                                <button className="join-button" onClick={this.getRoom}>Create Room</button>
                            </div>
                        </div>}
                        {(!this.state.createRoom) && <div className="lobby-form">
                            <div className="row-logo">

                                <div>
                                    Scrabble
                                </div>
                            </div>
                            <div className="lobby-input">
                                <input type="text" placeholder="Enter your Username" className="input-box" onChange={this.setUsername}></input>
                                <input type="text" placeholder="Enter Room Id" className="input-box" onChange={this.setRoomId}></input>
                                <button className="join-button" onClick={this.joinRoom}>Join Room</button>
                            </div>
                        </div>}
                    </div>

                </div>
            )
        }

    }
}

export default Lobby;