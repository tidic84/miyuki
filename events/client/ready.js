const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = async (Discord, client) => {
  console.log("Bot Connected !")
  client.user.setActivity('connecting...');
  await delay(1000)
  client.user.setActivity('connected !', { type: 'WATCHING'});
  await delay(3500)
  client.user.setActivity('m!help', { type: 'WATCHING'});
}