const { MessageEmbed, MessageAttachment } = require('discord.js');
const { blue, green, yellow, red } = require(`../../colors.json`)
const img = new MessageAttachment('./assets/img/oups.gif');

require('dotenv').config();

const cooldowns = new Map();

module.exports = async (Discord, client, message) => {

    const settings = await client.getGuild(message.guild);
    let profileData = "";
    if (message.member.user.bot){
        return
    }else {
        profileData = await client.getProfile(message.member)
    };

    if(!message.content.startsWith(settings.prefix) || message.author.bot) return;

    const args = message.content.slice(settings.prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = await client.commands.get(cmd) || client.commands.find(a => a.help.aliases && a.help.aliases.includes(cmd));

    if(!command) return;

    // Cooldown
    if(!cooldowns.has(command.name)){
        await cooldowns.set(command.name, new Discord.Collection());
    }
    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.help.cooldown) * 1000;
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
             command.run(client, message, args, settings, profileData, cmd, Discord);
         } catch (error) {
            console.error(error);
            client.errorMessage(message, error)
        }
    }
}