const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')

module.exports.run = (client, message, args) => {
    if(!message.author.id == "380811740751069185") return
    message.channel.send('Restarting...')
        .then(msg => {
            console.log('Bot is disconnected')
            client.destroy()
        })
        .then(async () => {
            await client.login(process.env.TOKEN)
            message.channel.send("Connected !")
            console.log('Bot is connected')

        });

};

module.exports.help = {
    name: "restart",
    description: "restart the bot",
    usage: "restart",
    aliases: ["reset"],
    category: 'admin'
}