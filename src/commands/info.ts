import Discord, { Message } from 'discord.js';
import PlayerModel from '../models/player';

const info = async (originalMessage: Message, msgArray: string[]) => {
  const [, targetPlayer] = msgArray;
  const targetPlayerData = await PlayerModel.findOne({
    username: targetPlayer,
  });

  if (!targetPlayerData) {
    return originalMessage.channel.send(
      `Could not find a report for **${targetPlayer}**. `,
    );
  }

  const mostRecent =
    targetPlayerData?.reports[targetPlayerData.reports.length - 1];

  if (!mostRecent) {
    return originalMessage.channel.send(
      `Could not find a recent report for **${targetPlayer}**`,
    );
  }

  const embed = new Discord.MessageEmbed()
    .setColor('#ff2211')
    .setTitle(`Most recent report for ${targetPlayer}`)
    .setDescription(mostRecent?.targetDescription)
    .setURL('https://www.google.com')
    .setAuthor(
      mostRecent?.reportedBy.username,
      mostRecent?.reportedBy.avatarURL ||
        'https://discord.com/assets/322c936a8c8be1b803cd94861bdfa868.png',
    )
    .setFooter(`Hope it's a good one!`);

  return originalMessage.channel.send(embed);
};

export default info;
