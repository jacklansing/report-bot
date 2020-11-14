require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const parseCommand = require('./parseCommand');
const verifyGuild = require('./utils/verifyGuild');

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
