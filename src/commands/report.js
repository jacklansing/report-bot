const Discord = require('discord.js');
const { createConnection } = require('../utils/createConnection');

module.exports = async (originalMessage, msgArray) => {
  let collection;
  try {
    const dbConnection = await createConnection();
    collection = dbConnection.collection('warReports');
  } catch (e) {
    console.log('error connecting to db', e);
  }

  const [_, targetUser] = msgArray;
  const targetDescription = getDescription(msgArray);
  const author = originalMessage.author;

  const report = {
    user: targetUser,
    targetDescription,
    reportedBy: {
      id: author.id,
      username: author.username,
      avatarURL: author.avatarURL(),
    },
  };

  const embed = getReportEmbed(originalMessage, targetUser, targetDescription);

  try {
    await collection.insertOne(report);
  } catch (e) {
    'error saving report', e;
  }

  originalMessage.channel.send(embed);
};

const getDescription = (msgArray) => {
  const spliced = msgArray.splice(2);
  return spliced.join(' ');
};

const getReportEmbed = (originalMessage, target, description) => {
  return new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`New Player Report Created for ${target}`)
    .setURL('https://discord.js.org/')
    .setAuthor(
      originalMessage.author.username,
      originalMessage.author.avatarURL(),
    )
    .setDescription(description)
    .setFooter('Thanks for the report!');
};
