import 'dotenv/config';
import Discord from 'discord.js';
import parseCommand from './parseCommand';
import verifyGuild from './utils/verifyGuild';
import createDbConnection from './utils/createDbConnection';

async function main() {
  const client = new Discord.Client();

  await createDbConnection();

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('guildCreate', (guild) => {
    /* If guild is not in the list of allowed discord guilds, the
    bot will automatically leave the guild if they somehow received an
    invite link and used it. */
    verifyGuild(guild);
  });

  client.on('message', (message) => {
    // All commands will start with an exclamation point.
    // If the message does not start with !, we will not process it any further.
    if (message.content[0] !== '_') return;
    parseCommand(message);
  });

  client.login(process.env.BOT_TOKEN);
}

main();
