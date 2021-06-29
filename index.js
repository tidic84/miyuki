const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

require('./util/functions')(client);

require('dotenv').config();

require('discord-buttons')(client) ;

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})


client.login(process.env.TOKEN);

