import React from "react"
import "./home_styles.css"
import logo from "../assets/logo-redesign.png"
import { Link } from "react-router-dom"


class Home extends React.Component {

    constructor(props) {
        super(props)
        this.showButtons = this.showButtons.bind(this)
        this.setLobby = this.setLobby.bind(this)
        this.switchOverlay = this.switchOverlay.bind(this)
        this.state = {
            visibleButtons: false,
            isOverlay:false
        }
    }

    switchOverlay(){
        const currVal = this.state.isOverlay;
        this.setState({
            isOverlay:!currVal
        })
    }

    showButtons(e) {
        e.preventDefault()

        this.setState({
            visibleButtons: true
        })
    }
    setLobby(val) {
        window.createRoom = val;
    }

    render() {
        return (
            <div className="center">
                <button className="about" onClick={this.switchOverlay}>i</button>
                {this.state.isOverlay && <div className="overlay">
                    <div className="overlay-list">
                        <div className="heading">  Info <br></br> </div>
                        <ul>
                            <li>Players are supposed to enter letters one by one to form a word. </li>
                            <li>Score recieved in each round is the sum of max scores of words from both row and column. </li>
                            <li>Validity of words is based on the official Scrabble dictionary. </li>
                        </ul>
                        Developed by <a href="https://ranjan210.github.io/" className="link" target="_blank">Ranjan</a>
                    </div>
                </div>}
                <div className="row">
                    {/*<img src={logo} className="center-logo">
                    </img> -->*/}
                    <div className="center-text">
                        <div className="center-logo">S</div>
                        <div>CRABBLE</div>
                    </div>


                </div>
                <div className="sub-heading">
                    The classic word game.

                </div>
                <div className="form">

                    {this.state.visibleButtons && <div className="form-content margin-right" onClick={() => this.setLobby(true)}>
                        <Link to="/lobby"> Create Room </Link> </div>}

                    {!this.state.visibleButtons && <div className="form-content" onClick={this.showButtons}>
                        PLAY !
                    </div>}
                    {this.state.visibleButtons && <div className="form-content margin-left" onClick={() => this.setLobby(false)}>
                        <Link to="/lobby"> Join Room </Link> </div>}


                </div>
            </div>
        )
    }

}

export default Home;