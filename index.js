const Discord = require('discord.js');
const client = new Discord.Client();
const { readdirSync } = require('fs')
client.commands = new Discord.Collection();

require('dotenv').config();

require('discord-buttons')(client) ;

const dir = "commands/"  
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
        for (const file of commands) {
            const commandFile = require(`${dir}/${dirs}/${file}`);
            client.commands.set(commandFile.help.name, commandFile);
            console.log(`Commande chargé --> ${commandFile.help.name}`);
        }
    })


['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})


client.login(process.env.TOKEN);