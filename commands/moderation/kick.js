const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red } = require('../../colors.json')

module.exports.run = async (client, message, settings, args) => {
    
    
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            const embed = new MessageEmbed()
                .setTitle(`Erreur`)
                .setColor(`${red}`)
                .setDescription(`:x: Vous n'avez pas la permission d'utiliser cette commande !`)
        return message.channel.send(embed);
        }
        const member = message.mentions.members.first()

        if (!member) {
            const embed = new MessageEmbed()
                .setTitle(`Erreur`)
                .setColor(`${red}`)
                .setDescription(`:x: Vous ne pouvez pas expulser Casper !`)
        return message.channel.send(embed);
        }

        if (member.id === message.guild.ownerID) {
            const embed = new MessageEmbed()
                .setTitle(`Erreur`)
                .setColor(`${red}`)
                .setDescription(`:x: Vous ne pouvez pas expulser le propriétaire du serveur !`)
        return message.channel.send(embed);
        }

        const reason = args.slice(1).join(' ') || "Aucune raison fournie";

        try {
        await member.kick(reason)
        } catch (error) {
            if (error == 'DiscordAPIError: Missing Permissions'){
                const embed = new MessageEmbed()
                .setTitle(`Erreur`)
                .setColor(`${red}`)
                .setDescription(`:x: Tu n'as pas les permission pour expulser ce membre`)
            return message.channel.send(embed);
            }
            const embed = new MessageEmbed()
                .setTitle(`Erreur`)
                .setColor(`${red}`)
                .setDescription(`:x: Une erreur est survenue`)
                .setFooter(error)
            return message.channel.send(embed);
        }

            
        const embed = new MessageEmbed()
                .setTitle(`Kick`)
                .setColor(`${green}`)
                .setDescription(`:white_check_mark: ${member.user.tag} a été exclu !`)
        message.channel.send(embed);
        
};

module.exports.help = {
    name: 'kick',
    description: 'Sert a expulser des joueurs du serveur',
    usage: "kick <@membre> <raison>",
    category: "moderation"
}