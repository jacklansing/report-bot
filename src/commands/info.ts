import Discord from 'discord.js';
import { ICommand, ICommandFlag } from '../parseCommand';
import PlayerModel from '../models/player';

const info = async (command: ICommand) => {
  const { originalMessage, msgArray, flags } = command;
  const [, targetPlayer] = msgArray;

  const targetPlayerData = await getTargetPlayerData(targetPlayer, flags);

  //TODO: Validate input

  if (!targetPlayerData) {
    return originalMessage.channel.send(
      `Could not find a relevent report for **${targetPlayer}**. `,
    );
  }

  const mostRecent =
    targetPlayerData.reports[targetPlayerData.reports.length - 1];

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

async function getTargetPlayerData(
  targetPlayer: string,
  flags: ICommandFlag[],
) {
  let playerData = await PlayerModel.findOne({ username: targetPlayer });
  if (!playerData) return null;

  const reportedByFlag = flags.find(
    (f) => f.flag.toLowerCase() === 'reportedby',
  );

  // If reporteBby flag exists we'll filter the reports for just that username
  if (reportedByFlag) {
    playerData.reports = playerData?.reports.filter(
      (r) => r.reportedBy.username === reportedByFlag.argument,
    );
  }

  return playerData;
}

export default info;
