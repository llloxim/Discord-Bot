const gif = require("./commands/gif.js");
const booboo = require("./commands/booboo.js");
const test = require("./commands/test.js");
const music = require("./commands/music/music.js");
const commands = {booboo, gif, test};


const ytdl = require('ytdl-core');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');

const axios = require('axios');
const cherrio = require('cheerio');


module.exports = async function (msg){
    if(msg.channel.id == process.env.CHANNEL){
        let tokens = msg.content.split(" ");
        let command = tokens.shift();

        // gif command prefix !
        if(command.charAt(0) == '!'){
            command = command.substring(1);
            commands[command](msg, tokens);
            
        }
        // music command prefix $
        else if(command.charAt(0) == '$'){
            command = command.substring(1);
            music(msg, command, tokens);

        }
        // music player testing command prefix %
        else if(command.charAt(0) == '%'){
            
            voiceChannel = msg.member.voice.channel;
            guild = msg.member.guild;
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
            });
            
            const stream = ytdl('https://www.youtube.com/watch?v=6NYeMlyBP4M', { filter: 'audioonly' });
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            const player = createAudioPlayer();
            
            player.play(resource);
            connection.subscribe(player);
            
            console.log(player);
            player.on(AudioPlayerStatus.Idle, () => connection.destroy());
        }
        // arknights command prefix *
        // webscraper that pulls up image of character searched (need to figure out how to use url search index)
        else if (command.charAt(0) == '*'){
            /* const page_url = 'https://gamepress.gg/arknights/operator/skadi-corrupting-heart';
            const {data} = await axios.get(page_url);
            const $ = cherrio.load(data);
            const image = $('.operator-image.current-tab').find('a').attr('href');
            msg.channel.send(image); */
        }
    }
}
