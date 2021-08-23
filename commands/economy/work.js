const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports.run = (client, message, args, settings, profileData) => {

    const randomNumber = Math.floor(Math.random() * (settings.ecoMax - settings.ecoMin + 1) + settings.ecoMin);

    total = parseInt(profileData.coins) + parseInt(randomNumber);

    client.updateProfile(message.member, { coins: total }, message.guild.id)

    const embed = new MessageEmbed()
        .setDescription(`Tu as travaillé et tu as gagné ${randomNumber}`)
        .setColor(`${blue}`)
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
    message.channel.send({embed: embed});
};

module.exports.help = {
    name: "work",
    description: "Travaille pour gagner de l'argent",
    usage: "work",
    cooldown: 5,
    category: 'economy'
}