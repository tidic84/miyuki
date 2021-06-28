const { MessageEmbed, MessageAttachment } = require('discord.js');
const { blue, green, yellow, red } = require(`../../colors.json`)
require('dotenv').config();
const img = new MessageAttachment('./assets/img/oups.gif');

const cooldowns = new Map();

module.exports = async (Discord, client, message) => {

    if(!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = await client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(!command) return;

    // Cooldown
    if(!cooldowns.has(command.name)){
        await cooldowns.set(command.name, new Discord.Collection());
    }
    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;
    if(time_stamps.has(`${message.author.id}:${message.guild.id}`)){
        const expiration_time = time_stamps.get(`${message.author.id}:${message.guild.id}`) + cooldown_amount;
        if(current_time < expiration_time){
            const time_left = (expiration_time - current_time) / 1000;
            const embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true })).setColor(`${red}`).setDescription(`:stopwatch: Attendez encore ${time_left.toFixed(1)}s, pour utiliser la commande ${command.name}`)
            return message.channel.send(embed);
        }
    }
    time_stamps.set(`${message.author.id}:${message.guild.id}`, current_time);
    setTimeout(() => time_stamps.delete(`${message.author.id}:${message.guild.id}`), cooldown_amount);



    // Execute Command
    if(command) {
         try {
             command.run(client, message, args, cmd, Discord);
         } catch (error) {
            console.error(error);
            const embed = new MessageEmbed()
                    .setTitle(`Erreur`)
                    .setColor(`${red}`)
                    .setDescription(`:x: Oups, la commande n'a pas pu s'exécuter !`)
                    .attachFiles(img)
                    .setImage('attachment://oups.gif')
                    .setFooter(`${error}`)
            message.channel.send(embed);
        }
    }
}