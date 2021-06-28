const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../../colors.json')

module.exports = async (Discord, client, member) => {
    const settings = await client.getGuild(member.guild);
    var today = new Date();
    month = today.toLocaleString('fr-FR', { month: 'long' })
    var date = today.getDate()+' '+month+' '+ today.getFullYear()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // AutoRole
    for(i = 0; i< settings.welcomeRole.length; i++){
        let WelcomeRole = member.guild.roles.cache.find(role => role.id == settings.welcomeRole[i]);
        member.roles.add(WelcomeRole)    
    }
    
    
    // Join Message
    const channel = client.channels.cache.get(settings.welcomeChannel);
    let msg = settings.welcomeMessage;
    if (msg.includes("{{USER}}")) msg = await msg.replace("{{USER}}", member);
    if (msg.includes("{{SERVER_NAME}}")) msg = await msg.replace("{{SERVER_NAME}}", member.guild);
    const embed = new MessageEmbed()
        .setTitle('Heyy !!')
        .setDescription(msg)
        .setImage(member.user.displayAvatarURL({ dynamic : true}))
        .setColor(`${blue}`)
        .setFooter(date)
    try {
    channel.send(embed)
    } catch (error) {
        console.log(error)
    }

    // Init money system
    const newProfile = {
        userID: member.id,
        userName: member.displayName,
        serverID: member.guild.id,
        coins: 100,
        bank: 0
    }
    if (client.getProfile(member)) return console.log(`${member.displayName} à rejoint mais il à déja un profile.`)
    await client.createProfile(newProfile);
 
}