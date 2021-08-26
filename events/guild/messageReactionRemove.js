module.exports = async (Discord, client, reaction, user) => {
    const settings = await client.getGuild(reaction.message.guild);

    // Remove Role for /add reactions
    for(const emojis of Object.keys(settings.messageReact.get(reaction.message.id))) {
        let msgR = settings.messageReact
        let emojisRole = msgR.get(reaction.message.id)

        if(emojis.substring(0, 1) === "&") {
            if(reaction._emoji.id == emojis) {
                let role = reaction.message.guild.roles.cache.find(role => role.id == emojisRole[emojis]);
                await reaction.message.guild.members.cache.get(user.id).roles.add(role.id)
    
            } else if (reaction._emoji.name == emojis.substring(2)){
                let role = reaction.message.guild.roles.cache.find(role => role.id == emojisRole[emojis]);
                await reaction.message.guild.members.cache.get(user.id).roles.add(role.id)
            }
        } 

        else if(emojis.substring(0, 1) !== "&") {
            if(reaction._emoji.id == emojis) {
                let role = reaction.message.guild.roles.cache.find(role => role.id == emojisRole[emojis]);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(role.id)
    
            } else if (reaction._emoji.name == emojis.substring(1)){
                let role = reaction.message.guild.roles.cache.find(role => role.id == emojisRole[emojis]);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(role.id)
            }
        }

        // if(reaction._emoji.id == emojis) {
        //     let role = reaction.message.guild.roles.cache.find(role => role.id == emojisRole[emojis]);
        //     await reaction.message.guild.members.cache.get(user.id).roles.remove(role.id)

        // } else if (reaction._emoji.name == emojis.substring(1)){
        //     let role = reaction.message.guild.roles.cache.find(role => role.id == emojisRole[emojis]);
        //     await reaction.message.guild.members.cache.get(user.id).roles.remove(role.id)
        // }
    }
}