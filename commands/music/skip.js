module.exports = async function (msg, serverQueue) {
    if(!msg.teammember.voice.channel){
        return msg.channel.send("You have to be in a voice channel to skip the music!");
    }
    if (!serverQueue){
        return msg.channel.send("There is no song that I could skip, baka!");
    }
    serverQueue.connection.dispatcher.end();
}