const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')

module.exports.run = async (client, message, args) => {

    // const embed = new MessageEmbed()
    //     .setTitle(`${message.member.displayName}`)
    //     .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
    //     .setColor(`${purple}`)
    //     .setImage(`${message.author.displayAvatarURL({ dynamic : true })}`)
    //     .setTimestamp()
    // message.channel.send(embed);
    
            function clean(text) {
                if (typeof text === "string") 
                  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                return text;
              }
             
              if (message.author.id == "380811740751069185") {
              const code = args.join(" ");
              const evaled = eval(code);
              const cleanCode = await clean(evaled);
              message.channel.send(cleanCode, { code: "js" });
              } else {
                return `Chutt !! Cette commande n'existe pas`
              }

};

module.exports.help = {
    name: "eval",
    description: "Cette commande n'existe pas",
    category: 'admin'
}