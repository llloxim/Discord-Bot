const play = require("./play.js");
const skip = require("./skip.js");
const stop = require("./stop.js");


const muse = {play, skip, stop};
const queue = new Map();

module.exports = function (msg, command, tokens){
    const serverQueue = queue.get(msg.guild.id);

    if(command == "play")
    {
        play(msg, tokens, serverQueue, queue);
    }
    else if(command == "skip")
    {
        skip(msg, serverQueue, queue);
    }
    else if(command == "stop")
    {
        stop(msg, serverQueue);
    }
    else if(command == "pause"){
        serverQueue.audioPlayer.pause();
    }
    else if(command == "unpause"){
        serverQueue.audioPlayer.unpause();
    }
    
}