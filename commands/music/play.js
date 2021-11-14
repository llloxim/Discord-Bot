const ytdl = require('ytdl-core');
const { joinVoiceChannel } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');
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
          songs: [],
          volume: 5,
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
          play(msg.guild, queueContruct.songs[0],queue);
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

function play(guild, song, queue) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
    const connection = getVoiceConnection(guild.id);
    console.log(connection);
    const dispatcher = connection.subscribe(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0], queue);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  }