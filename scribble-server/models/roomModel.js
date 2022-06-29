const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    roomId:String,
    players:[{name:String,score:Number}],
    grid : [{letter:String,id:String}]
})

module.exports = mongoose.model("room",RoomSchema);