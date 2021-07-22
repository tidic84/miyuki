module.exports = (Discord, client) => {
    console.log('Miyuki is connected');
    client.user.setActivity('m!help', { type: 'WATCHING'});

    client.loadMessagesReact(client);
    
}