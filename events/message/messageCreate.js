const PREFIX = "m!" 
const { Collection, MessageEmbed } = require('discord.js');

module.exports = async (client, message) => {
    if (message.channel.id == "992490685661974578" && !message.author.bot) {
        channel = message.channel;
        msgContent = message.content;

        let lastMessage;
        await channel.messages.fetch({ limit: 2 }).then(messages => {
            lastMessage = messages.last();
        })
        if (isNaN(msgContent)) { 
            message.delete();
            return ;
        };
        
        if (isNaN(lastMessage.content)) {
            lastMessage.delete();
        }

        if (lastMessage == undefined) {
            lastMessage = 0;
        }

        if (lastMessage.author.id == message.author.id) {
            message.delete();
        }

        if (parseInt(msgContent) != parseInt(lastMessage.content) + 1) {
            console.log(parseInt(msgContent) , parseInt(lastMessage.content) + 1)
            if(lastMessage != null) {
                message.delete();
                return ;
            }
        }

    }

    if (message.author.bot) return;
    if (message.channel.type==='DM') return

    if (!message.content.startsWith(PREFIX)) return;
    
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const member = message.mentions.members.first();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return;

    if (command.help.args && !args.length) {
        let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author}!`;
        if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande: \`${PREFIX}${command.help.name} ${command.help.usage}\``;
        return message.channel.send(noArgsReply);
    };

    if(member) if (command.help.isUserAdmin && member.permissions.has('BAN_MEMBERS')) return message.reply("Tu ne peux pas utiliser cette commande sur cet utilisateur.");

    if (!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Collection());
    };

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 5) * 1000;

    if (tStamps.has(message.author.id)) {
        const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

        if (timeNow < cdExpirationTime) {
        timeLeft = (cdExpirationTime - timeNow) / 1000;
        return message.reply(`Merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\`.`);
        }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);

    command.run(client, message, args);
}