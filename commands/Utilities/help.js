const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const { readdirSync } = require('fs');
const categoryList = readdirSync('./commands')

module.exports.run = async (client, message, args) => {
    
    if(!args.length){
    
    
    const embed = new MessageEmbed()
            .setColor(`${purple}`)
            .setTitle("Liste des commandes")
            .setFooter('Pour plus de détails sur une commande: help <commande>')

    for (const category of categoryList) {
        let catName = "";
        await client.upFirst(`${category}`).then(result => {catName = result})
        embed.addField(
            `__${catName}__`,
            `${client.commands.filter(cat => cat.help.category === category.toLocaleLowerCase()).map(cmd => `\`${cmd.help.name}\``).join(', ')}`
        )
    }
    message.channel.send(embed)
    
    } else {

        const command = await client.commands.get(args[0]) || client.commands.find(a => a.help.aliases && a.help.aliases.includes(args[0]));
        if(!command) return  client.errorMessage(message, "Cette commande n'existe pas")
        
        let cmdName = "";
        await client.upFirst(`${command.help.name}`).then(result => {cmdName = result})
        let alias = "";
        if(command.help.aliases){
            alias = `${command.help.name}, ${command.help.aliases.join(", ")} `
        } else {
            alias = `${command.help.name}`
        }
        const embed = new MessageEmbed()
            .setColor(`${purple}`)
            .setTitle(`${cmdName}`)
            .setDescription(`\`${command.help.usage || command.help.name}\``)
            .addField("Description", `${command.help.description} `)
            .addField("Aliases", `${alias}`)
            .setFooter('Pour plus de détails sur une commande: help <commande>')
        message.channel.send(embed)
    }
};

module.exports.help = {
    name: 'help',
    description: 'Affiche la liste des commandes',
    category: 'utilities',
    cooldown:5,
}