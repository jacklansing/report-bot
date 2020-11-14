import { Guild } from 'discord.js';
const ALLOWED_GUILDS = ['Razor Hill'];

export default (guild: Guild) => {
  if (ALLOWED_GUILDS.findIndex((name) => name === guild.name) === -1) {
    guild.leave();
  }
};
