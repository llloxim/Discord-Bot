const ytdl = require('ytdl-core');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');

module.exports = async function playSong(msg, song, queue) {
    const guild = msg.guild;
    const serverQueue = queue.get(guild.id);
    const voiceChannel = msg.member.voice.channel;
    
    if (!song) {
      queue.delete(guild.id);
      return;
    }
    try {
      const stream = ytdl(song.url, { filter: 'audioonly' });
      const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true });
      resource.volume.setVolume(serverQueue.volume);
      const player = createAudioPlayer();
      serverQueue.connection.subscribe(player);
      serverQueue.audioPlayer = player;
    

      player.play(resource);
      msg.channel.send(
        `playing ${serverQueue.songs[0].title}`
      );
      player.on(AudioPlayerStatus.Idle, () => {
        serverQueue.songs.shift();
      playSong(msg, serverQueue.songs[0], queue);
      });
      } 
      catch (err){
        console.log(err);
        queue.delete(msg.guild.id);
        return msg.channel.send(err);
      }
    
  }