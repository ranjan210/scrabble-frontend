import React from "react"
import {  BrowserRouter as Router,  Routes,  Route } from "react-router-dom";
import Home from "./views/Home"
import Lobby from "./views/Lobby"
import './App.css';
import Room from "./views/Room";
class App extends React.Component {
 render(){
   return(
     <Router>
       <div id="main">
       <Routes>
         <Route path="/" element={<Home/>}>
         </Route>
         <Route path="/lobby" element={<Lobby/>}>
         </Route>
         <Route path="/room" element={<Room/>}>
         </Route>
       </Routes>
       </div>
     
     </Router>
   )
 }
}

export default App;
