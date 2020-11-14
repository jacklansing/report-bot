import { Guild } from 'discord.js';
import config from './guildsConfig';

export default (guild: Guild) => {
  if (config.allowedGuilds.findIndex((name) => name === guild.name) === -1) {
    guild.leave();
  }
};
