import React from "react"
import logo from "../assets/logo-redesign.png"
import "./room_styles.css"
import socket from "../services/socketService"
import roomManager from "../services/roomCreationHandler"


class Room extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            grid: new Array(81).fill(""),
            submitGrid: new Array(81).fill(false),
            inputDis: true,
            chats: [],
            currentMessage: "",
            players: null
        }

        this.updateInput = this.updateInput.bind(this)
        this.configureSocket = this.configureSocket.bind(this)
        this.sendInput = this.sendInput.bind(this)
        this.startGame = this.startGame.bind(this)
        this.checkInput = this.checkInput.bind(this)
        this.updateMessage = this.updateMessage.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        this.configureSocket()
        roomManager.fetchBoard().then((res) => {
            if (res != "") {
                console.log(res)
                this.setState(
                    {
                        grid: res.grid,
                        players: res.players,
                        submitGrid: res.submitGrid
                    }
                )
            }

        })

    }

    configureSocket() {
        console.log(window.roomId)
        socket.on("updategrid", (pos, val, user, score) => {
            console.log("received input")

            let newArr = this.state.grid;
            let copyArr = this.state.submitGrid;
            let newPlayers = this.state.players;
            for (let player of newPlayers) {
                if (player.name == user) {

                    player.score += score;
                }
                console.log(player)
            }

            console.log(newPlayers)
            newArr[pos] = val;
            copyArr[pos] = true;

            this.setState({
                grid: newArr,
                submitGrid: copyArr,
                players: newPlayers
            })
        })

        socket.on("recieveMessage", (user, message) => {
            let msgItem = {
                username: user,
                message: message
            }
            let newChats = this.state.chats
            newChats.push(msgItem)

            this.setState({
                chats: newChats
            })
        })

        socket.on("turn_enable", () => {
            this.setState({
                inputDis: false
            })
        })

        socket.on("addPlayer", username => {
            const playerItem = { name: username, score: 0 }
            let copyArr = this.state.players
            copyArr.push(playerItem)
            this.setState({
                players: copyArr
            })
        })
    }

    startGame() {
        this.setState({
            inputDis: false
        }, () => {
            window.firstPlayer = false
        })
    }

    checkInput(e) {
        let newArr = this.state.submitGrid
        if (newArr[e.target.id]) {
            e.target.disabled = true;
        }
    }


    updateInput(e) {
        e.preventDefault();


        let newArr = this.state.grid;
        console.log("entering")

        newArr[e.target.id] = e.target.value;
        this.setState({
            grid: newArr
        })


    }



    sendInput(e) {
        if (e.keyCode == "13") {
            e.preventDefault();
            socket.emit("updateGrid", window.roomId, e.target.value, e.target.id)
            let newArr = this.state.submitGrid
            newArr[e.target.id] = true
            this.setState({
                inputDis: true,
                submitGrid: newArr
            })
        }

    }


    sendMessage(e) {
        if (e.keyCode == "13") {
            e.preventDefault()
            let newMessage = this.state.currentMessage;
            socket.emit("sendMessage", newMessage, window.roomId)
            const chatItem = { username: window.username, message: newMessage }
            let newChats = this.state.chats;
            newChats.push(chatItem)
            this.setState({
                chats: newChats,
                currentMessage: ""
            })
        }


    }

    updateMessage(e) {
        e.preventDefault();
        let messageValue = e.target.value;
        this.setState({
            currentMessage: messageValue
        })

    }




    render() {
        let chats, scores;

        const grid = this.state.grid.map((elem, index) => {
            return (
                <input className="room-cell"
                    maxLength={1} value={elem} id={index} onChange={this.updateInput}
                    onKeyDown={this.sendInput} disabled={this.state.inputDis}
                    onFocus={this.checkInput}
                >

                </input>
            )
        })

        if (this.state.chats != null) {
            chats = this.state.chats.map((elem, index) => {
                return (
                    <div className="single-chat">
                        <div className="usertext">{elem.username} : </div>
                        <div className="text"> {elem.message} </div>
                    </div>
                )
            })
        }


        if (this.state.players != null) {
            scores = this.state.players.map((elem, index) => {
                return (
                    <div className="single-player">
                        <div className="score-username">{elem.name}</div>
                        <div className="score-score">{elem.score}</div>

                    </div>

                )
            })
        }

        return (
            <div className="room-center">
                <div className="room-header">
                    <div className="logo">Scrabble</div>
                    <div className="turn">Room Code : {window.roomId}</div>
                </div>
                <div className="room-content">
                    <div className="room-score">
                        <div className="score-panel">

                            {scores}
                        </div>

                    </div>
                    <div className="room-board">
                        <div className="board">
                            {grid}
                        </div>
                        {window.firstPlayer && <div className="startGame"><button onClick={this.startGame}>Start Game</button></div>}
                    </div>
                    <div className="room-chat">
                        <div className="chats-container">
                            {chats}
                        </div>
                        <div className="message-box">
                            <input className="text-area" onChange={this.updateMessage} onKeyDown={this.sendMessage} placeholder="Press Enter to Send" value={this.state.currentMessage}></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default Room;