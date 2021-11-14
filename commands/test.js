const axios = require('axios');
module.exports = async function (msg, tokens){
    let keywords = 'coding train';
            if(args.length > 0){
                keywords = tokens.join(" ");
            }
            
            let url = `https://gamepress.gg/arknights/operator/toddifons`
            const res = await axios.get(url);
            console.log(res)
}