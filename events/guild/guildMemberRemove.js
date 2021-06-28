const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../../colors.json')

module.exports = async (Discord, client, member) => {
    const settings = await client.getGuild(member.guild);
    var today = new Date();
    month = today.toLocaleString('fr-FR', { month: 'long' })
    var date = today.getDate()+' '+month+' '+ today.getFullYear()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // Leave Message
    const channel = client.channels.cache.get(settings.welcomeChannel);
    let msg = settings.leaveMessage;
    if (msg.includes("{{USER}}")) msg = await msg.replace("{{USER}}", member.displayName);
    if (msg.includes("{{SERVER_NAME}}")) msg = await msg.replace("{{SERVER_NAME}}", member.guild);
    const embed = new MessageEmbed()
        .setTitle('Bye...')
        .setDescription(msg)
        .setImage(member.user.displayAvatarURL({ dynamic : true}))
        .setColor(`${red}`)
        .setFooter(date)
    try {
    channel.send(embed)
    } catch (error) {
        console.log(error)
    }
 

}