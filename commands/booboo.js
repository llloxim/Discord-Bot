const replies = ['BEAR', 'BOO', 'gabagoool', '༼ つ ◕_◕ ༽つ'];
module.exports = function (msg, args){
    const index = Math.floor(Math.random() * replies.length);
    msg.channel.send(replies[index]);
}