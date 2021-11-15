const ytdl = require('ytdl-core');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');

const playSong = require("./playSong.js");

module.exports = async function (msg, tokens, serverQueue, queue) {
  
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel)
      return msg.channel.send(
        "You need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return msg.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }
    const songInfo = await ytdl.getInfo(tokens[0]);
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };
    if (!serverQueue) {
        const queueContruct = {
          textChannel: msg.channel,
          voiceChannel: voiceChannel,
          connection: null,
          audioPlayer: null,
          songs: [],
          volume: 0.5,
          playing: true
        };
    
        queue.set(msg.guild.id, queueContruct);
    
        queueContruct.songs.push(song);
    
        try {
          var connection = await joinVoiceChannel({
						channelId: voiceChannel.id,
						guildId: voiceChannel.guild.id,
						adapterCreator: voiceChannel.guild.voiceAdapterCreator,
					});
          queueContruct.connection = connection;
          playSong(msg, queueContruct.songs[0], queue);
        }
        catch (err) {
          console.log(err);
          queue.delete(msg.guild.id);
          return msg.channel.send(err);
        }
      }
      else {
        serverQueue.songs.push(song);
        return msg.channel.send(`${song.title} has been added to the queue!`);
      }
}

