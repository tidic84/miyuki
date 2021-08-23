const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports.run = async (client, message, args, settings, profileData) => {
    var amount = args[1];
    var amountAuthor = "";
    var amountTarget = "";

    // Si il n'y a pas de mention
    if(!message.mentions.users.size){
        const embed = new MessageEmbed()
                .setTitle('Erreur')
                .setDescription(` Veuillez mentionner un membre`)
                .setColor(`${red}`)
            return message.channel.send(embed);
        }
    // Si le membre mentionné est un bot
    if(message.mentions.users.first().bot){
        const embed = new MessageEmbed()
            .setTitle('Erreur')
            .setDescription(` **${args[0]}** est un bot`)
            .setColor(`${red}`)
        return message.channel.send(embed);
    }

        var profileDataMention = await client.getProfile(message.mentions.users.first(), message.member.guild.id)


        // Si l'argument n'est pas un chiffre valide
        if(isNaN(parseInt(amount)) && amount != 'all'){
            const embed = new MessageEmbed()
                .setTitle('Erreur')
                .setDescription(` **'${args[1]}'** n'est pas un nombre valide`)
                .setColor(`${red}`)
            return message.channel.send(embed);
        }


        // Si l'argument est all
        if (amount == "all") { 
            if(profileData.coins <= 0) {
                const embed = new MessageEmbed()
                    .setTitle('Erreur')
                    .setDescription(` Vous n'avez pas assez d'argent dans votre porte feuille !`)
                    .setColor(`${red}`)
                return message.channel.send(embed);
            }
            amountAuthor = 0
            amountTarget = parseInt(profileDataMention.coins) + parseInt(profileData.coins)

            const embed = new MessageEmbed()
                .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
                .setDescription(`${settings.currency} ${profileData.coins} ont été payés avec succès.`)
                .setColor(`${green}`)
            message.channel.send(embed);
            
            client.updateProfile(message.author, { coins: amountAuthor}, message.member.guild.id)
            return client.updateProfile(message.mentions.users.first(), { coins: amountTarget}, message.member.guild.id)

            // Si il n'y a pas assez d'argent
        } else if (amount > profileData.coins) {
                const embed = new MessageEmbed()
                    .setTitle('Erreur')
                    .setDescription(` Vous n'avez pas assez d'argent dans votre porte feuille !`)
                    .setColor(`${red}`)
                return message.channel.send(embed);
        }

        amountAuthor = parseInt(profileData.coins) - parseInt(amount)
        amountTarget = parseInt(profileDataMention.coins) + parseInt(amount)
        client.updateProfile(message.author, { coins: amountAuthor}, message.member.guild.id)
        client.updateProfile(message.mentions.users.first(), { coins: amountTarget}, message.member.guild.id)

        const embed = new MessageEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
            .setDescription(` ${settings.currency} ${args[1]} on été ajouté au porte feuille de ${message.mentions.users.first().username}.`)
            .setColor(`${green}`)
        message.channel.send(embed);
};

module.exports.help = {
    name: "pay",
    description: "Paye de l'argent à un membre choisi",
    usage: "give <@membre> <montant>",
    aliases: ["give"],
    category: 'economy'
}