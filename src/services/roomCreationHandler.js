import axios from "axios";
import Room from "../views/Room.js";
const config = require("../config")

class RoomManager{
   async createRoom(username){
       let result = {}
         let res = await axios.post(config.API_URL+"/room",{username:username})
         if(res.data!=null){
            window.roomId= res.data.roomId;
            window.username = username;
            result.success = true;
            return result;
         }
    }


    async joinRoom(username,roomid){
        let result = {}
        let res = await axios.post(config.API_URL+"/joinroom",{username:username,roomId:roomid})

        if(res.status==200){
            window.roomId = roomid;
            window.username = username;
            result.success = true;
            return result;

        }

    }

    async fetchBoard(){
        const roomId = window.roomId;
        let res = await axios.post(config.API_URL+"/getboard",{roomId:roomId})

        if(res.status == 200){
            return res.data;
        }
    }
}

export default new RoomManager();