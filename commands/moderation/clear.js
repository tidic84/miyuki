const { MessageEmbed } = require("discord.js");
const { blue, green, yellow, red, purple } = require('../../colors.json')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports.run = async (client, message, args) => {

  const ammount = parseInt(args[0]);

  if (isNaN(ammount)) {
      return message.reply("ce n'est pas un nombre valide !");
  }
  else if (ammount < 1 || ammount > 100) {
      return message.reply("Le nombre doit être superieur a **0** et inferieur ou égal a **100**")
  } 
  const fetched = await message.channel.messages.fetch({ limit:ammount + 1 }, true);
  
  message.channel.bulkDelete(fetched, true)

  .then(async messages => {
      if(messages.size <=1) {

      } else {

      const embed = new MessageEmbed()
          .setTitle(`${messages.size -1} messages ont été supprimés.`)
          .setColor(`${blue}`)
      embedSent = await message.channel.send({embeds: [embed]});

      await delay(3000) 

      embedSent.delete();
      }
      
  });
};

module.exports.help = {
  name: "clear",
  aliases: ["clear"],
  category: "moderation",
  description:"Purge un nombre de message spécifié",
  cooldown: 1,
  usage: "clear <nbr_messages>",
  isUserAdmin: false,
};
