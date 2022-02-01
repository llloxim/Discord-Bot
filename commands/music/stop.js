module.exports = async function (msg, serverQueue) {
    if(!msg.member.voice.channel){
        return msg.channel.send("You have to be in a voice channel to stop the music!");
    }
    if (!serverQueue){
        return msg.channel.send("There is no song that I could stop, baka!");
    }
    serverQueue.songs = [];
    serverQueue.audioPlayer.stop();
    serverQueue.playing = false
}