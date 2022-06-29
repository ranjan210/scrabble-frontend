import {io} from "socket.io-client";
const config = require("../config")

const ENDPOINT = config.IO_URL
export default io(ENDPOINT);