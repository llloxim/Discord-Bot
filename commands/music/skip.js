const playSong = require("./playSong.js");

module.exports = async function (msg, serverQueue, queue) {

    if(!msg.member.voice.channel){
        return msg.channel.send("You have to be in a voice channel to skip the music!");
    }
    if (!serverQueue){
        return msg.channel.send("There is no song that I could skip, baka!");
    }
    serverQueue.audioPlayer.stop();

    serverQueue.songs.shift();
    playSong(msg, serverQueue.songs[0], queue);
}