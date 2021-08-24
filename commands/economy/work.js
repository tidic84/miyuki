const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const client = require("../../index");
const cooldowns = new Map();

module.exports.run = async (client, message, args, settings, profileData, cmd, Discord) => {
    const currency = settings.currency

    //
    // COOLDOWN
    //
    if(!cooldowns.has("work")){
        await cooldowns.set("work", new Discord.Collection());
    }
    const current_time = Date.now();
    const time_stamps = cooldowns.get("work");
    const cooldown_amount = (settings.workCooldown) * 1000;
    if(time_stamps.has(`${message.author.id}:${message.guild.id}`)){
        const expiration_time = time_stamps.get(`${message.author.id}:${message.guild.id}`) + cooldown_amount;
        if(current_time < expiration_time){
            const time_left = (expiration_time - current_time) / 1000;
            const embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true })).setColor(`${red}`).setDescription(`:stopwatch: Attendez encore ${time_left.toFixed(1)}s, pour utiliser la commande work`)
            return message.channel.send(embed);
        }
    }
    time_stamps.set(`${message.author.id}:${message.guild.id}`, current_time);
    setTimeout(() => time_stamps.delete(`${message.author.id}:${message.guild.id}`), cooldown_amount);

    //
    // WORK
    //
    const randomNumber = Math.floor(Math.random() * (settings.ecoMax - settings.ecoMin + 1) + settings.ecoMin);

    total = parseInt(profileData.coins) + parseInt(randomNumber);

    client.updateProfile(message.member, { coins: total }, message.guild.id)

    const embed = new MessageEmbed()
        .setDescription(`Tu as travaillé et tu as gagné ${currency} ${randomNumber}`)
        .setColor(`${blue}`)
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
    message.channel.send({embed: embed});
};

module.exports.help = {
    name: "work",
    description: "Travaille pour gagner de l'argent",
    usage: "work",
    category: 'economy'
}