
console.log('Beep Beep');
const Discord = require('discord.js');

const { Client, Intents } = require('discord.js');
const { json } = require('stream/consumers');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

require('dotenv').config();
client.login(process.env.TOKEN);


client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('boto is starting up');
}

const commandHandler = require("./command");

client.on('messageCreate', commandHandler);

