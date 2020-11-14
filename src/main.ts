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
    verifyGuild(guild);
  });

  client.on('message', (message) => {
    if (message.content[0] !== '!') return;
    parseCommand(message);
  });

  client.login(process.env.BOT_TOKEN);
}

main();
