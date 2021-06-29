const { MessageEmbed, MessageAttachment } = require('discord.js');
const { blue, green, yellow, red } = require(`../colors.json`)
module.exports = async (client) => {

    client.errorMessage = async (message, errMessage) => {
        const embed = new MessageEmbed()
                    .setTitle(`Erreur`)
                    .setColor(`${red}`)
                    .setDescription(`:x: ${errMessage}`)
                    //.attachFiles(img)
                    .setImage('https://media.discordapp.net/attachments/855018848897466381/859479979641274398/oups.gif')
            message.channel.send(embed);
    }

    client.upFirst = async a =>{
        //console.log(a[0].toUpperCase() + a.substring(1))
        return a[0].toUpperCase() + a.substring(1)
    }

    console.log(`${client.upFirst('teeesstt').toString()}`);
}