const DB = require("../../res/db.json")

module.exports = async (Discord, client, reaction, user) => {

    // Remove Role for /add reactions
    for(const emojis of Object.keys(DB[reaction.message.guild.id]["messageReactEventAdd"][reaction.message.id])) {

        if(reaction._emoji.id == emojis) {
            let role = reaction.message.guild.roles.cache.find(role => role.id == DB[reaction.message.guild.id]['messageReactEventAdd'][reaction.message.id][emojis]);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(role.id)

        } else if (reaction._emoji.name == emojis.substring(1)){
            let role = reaction.message.guild.roles.cache.find(role => role.id == DB[reaction.message.guild.id]['messageReactEventAdd'][reaction.message.id][emojis]);
            await reaction.message.guild.members.cache.get(user.id).roles.remove(role.id)
        }
    }


}