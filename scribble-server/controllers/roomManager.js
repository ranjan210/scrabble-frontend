const { globalAgent } = require("http");
const config = require("../config");


exports.newRoom = (req, res) => {
    let result = {};
    let status = 200;
    console.log(req.body);
    const username = req.body.username;
    const id_room = generateRoomId();
    while (global.roomIds.includes(id_room)) {
        id_room = generateRoomId();
    }
    global.roomIds.push(id_room);

    let thisPlayer = [];
    let newGrid = new Array(81).fill("");
    const newSubmitGrid = new Array(81).fill(false)
    thisPlayer.push({ name: username, score: 0 });
    const room = { roomId: id_room, players: thisPlayer, grid: newGrid, turn: 0, usedWords: [],submitGrid:newSubmitGrid };
    result = room;
    result.creator = username;
    global[id_room] = room;
    
    console.log(global.id_room)
    res.status(status).send(result);

}

exports.joinRoom = (req, res) => {

    let result = {};
    let status = 200;
    const username = req.body.username;
    const id_room = req.body.roomId;
    if (global.roomIds.includes(id_room)) {
        const thisPlayer = { name: username, score: 0 };
        global[id_room].players.push(thisPlayer);
        result.message = "Joined room successfully";
        result.room = global.id_room;
        result.username = username;
        res.status(status).send(result);
    }
    else {
        status = 300;
        result.error = "Room not found";
        res.status(status).send(result);
    }

}


exports.sendBoard = (req, res) => {

    let result = {};
    let status = 200;
    const roomId = req.body.roomId;
    result = global[roomId];
    res.status(status).send(result);
    
}





function generateRoomId() {
    let id = "";
    for (let i = 0; i < 4; i++) {
        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        id += randLetter;
    }

    return id;
}