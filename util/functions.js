const { MessageEmbed } = require("discord.js");
const { blue, green, yellow, red, purple } = require('../colors.json')

module.exports = async (client, Discord) => {

    client.errorMessage = async (message, errMessage, cmd) => {
        const embed = new MessageEmbed()
                    .setTitle(`Erreur`)
                    .setColor(`${red}`)
                    if(cmd){
                        embed.setDescription(`:x: ${errMessage}
                        Usage: \`${cmd.help.usage}\``)
                    } else {
                        embed.setDescription(`:x: ${errMessage}`)
                    }
            message.channel.send({embeds: [embed]});
    }

    client.start = async () => {
        const { loadCommands, loadEvents } = require("./loader");

        ["commands", "cooldowns"].forEach((x) => (client[x] = new Discord.Collection()));

        loadCommands(client);
        loadEvents(client);

    }

}