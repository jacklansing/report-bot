const ALLOWED_GUILDS = ['Razor Hill'];

module.exports = (guild) => {
  if (ALLOWED_GUILDS.findIndex((name) => name === guild.name) === -1) {
    guild.leave();
  }
};
