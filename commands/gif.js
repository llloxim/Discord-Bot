const axios = require('axios');
module.exports = async function (msg, tokens){
    let keywords = 'coding train';
            if(tokens.length > 0){
                keywords = tokens.join(" ");
            }
            
            let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR}`
            const res = await axios.get(url);
            console.log(res)
            const index = Math.floor(Math.random() * res.data.results.length);
            msg.channel.send(res.data.results[index].url);
}