module.exports = async (Discord, client, guild) => {

    const newGuild = {
        guildID: guild.id,
        guildName: guild.name
    };

    await client.createGuild(newGuild);
};