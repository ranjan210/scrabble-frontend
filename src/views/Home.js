import React from "react"
import "./home_styles.css"
import logo from "../assets/logo-redesign.png"
import { Link } from "react-router-dom"


class Home extends React.Component {

    constructor(props) {
        super(props)
        this.showButtons = this.showButtons.bind(this)
        this.setLobby = this.setLobby.bind(this)
        this.state = {
            visibleButtons: false
        }
    }

    showButtons(e) {
        e.preventDefault()
        this.setState({
            visibleButtons: true
        })
    }
    setLobby(val){
        window.createRoom = val;
    }

    render() {
        return (
            <div className="center">
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

                  { this.state.visibleButtons && <div className="form-content margin-right" onClick = {()=>this.setLobby(true)}>
                       <Link to="/lobby"> Create Room </Link> </div>}
                
                  { !this.state.visibleButtons && <div className="form-content" onClick={this.showButtons}>
                        PLAY !
                </div>}
                    {this.state.visibleButtons && <div className="form-content margin-left"  onClick = {()=>this.setLobby(false)}>
                    <Link to="/lobby"> Join Room </Link> </div>}


                </div>
            </div>
        )
    }

}

export default Home;