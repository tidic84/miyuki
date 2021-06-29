const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')

module.exports.run = async (client, message) => {
    
    const embed = new MessageEmbed()
            .setTitle(`Ping`)
            .setDescription(`Latence du bot: \`---ms\`
            Latence de l'API: \`---ms\``)
            .setColor(`${yellow}`)
        const msg = await message.channel.send(embed)

        const embed2 = new MessageEmbed()
            .setTitle(`Ping`)
            .setDescription(`Latence du bot: \`${msg.createdTimestamp - message.createdTimestamp}ms\`
            Latence de l'API: \`${Math.round(client.ws.ping)}ms\``)
            .setColor(`${purple}`)

        msg.edit({embed: embed2}).catch(error => {
            console.log(error)
        })
};

module.exports.help = {
    name: 'help',
    description: 'Affiche la liste des commandes',
    category: 'utilities',
    cooldown:5,
}