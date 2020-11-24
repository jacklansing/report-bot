import Discord, { Message } from 'discord.js';
import formatHeroName from '../utils/formatHeroName';
import PlayerModel from '../models/player';

export default async (originalMessage: Message, msgArray: string[]) => {
  const [, targetPlayer, targetHero] = msgArray;
  const targetPlayerData = await PlayerModel.findOne({
    username: targetPlayer,
  });

  if (!targetPlayerData) {
    return originalMessage.channel.send(
      `Could not find a report for **${targetPlayer}**. `,
    );
  }

  const formattedHeroName = formatHeroName(targetHero);

  const heroData = targetPlayerData?.heroReports.get(formattedHeroName);

  const mostRecent = heroData?.reports[heroData.reports.length - 1];

  if (!heroData) {
    return originalMessage.channel.send(
      `Could not find a recent report for **${targetPlayer}'s ${formattedHeroName}**`,
    );
  }

  const embed = new Discord.MessageEmbed()
    .setColor('#ff2211')
    .setTitle(`Most recent report for ${targetPlayer}'s ${formattedHeroName}`)
    .setDescription(mostRecent?.heroDescription)
    .setURL('https://www.google.com')
    .setAuthor(
      mostRecent?.reportedBy.username,
      mostRecent?.reportedBy.avatarURL ||
        'https://discord.com/assets/322c936a8c8be1b803cd94861bdfa868.png',
    )
    .setFooter(`Hope it's a good one!`);

  return originalMessage.channel.send(embed);
};
