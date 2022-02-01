const axios = require('axios');
const play = require("./play.js");
module.exports = async function (msg, tokens, serverQueue, queue){
    let keywords = 'coding train';
            if(tokens.length > 0){
                keywords = tokens.join(" ");
            } else {
                return msg.channel.send(
                    "please add a link or use a keyword to search for a video!"
                  );
            }
            
            let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${keywords}&type=video&key=${process.env.YOUTUBE}`
            const res = await axios.get(url);
            //console.log(res.data.items[0].id.videoId);
            videoUrl = "https://www.youtube.com/watch?v=" + res.data.items[0].id.videoId;
            play(msg, videoUrl, serverQueue, queue);
}