const Discord = require('discord.js');
const client = new Discord.Client({ 
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ] 
});
client.commands = new Discord.Collection();

require('./util/functions')(client, Discord);
require('dotenv').config();

client.start()
client.login(process.env.TOKEN);