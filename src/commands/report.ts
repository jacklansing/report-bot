import { Message } from 'discord.js';
import Discord from 'discord.js';
import PlayerModel from '../models/player';
import { IPlayerDocument, IPlayerReport } from '../types/player.types';
import { ICommand } from 'src/parseCommand';

const report = async (command: ICommand) => {
  const { originalMessage, msgArray } = command;
  const [, targetPlayer] = msgArray;
  const targetDescription = getDescription(msgArray);
  const author = originalMessage.author;

  let report: IPlayerReport = {
    targetDescription,
    reportedBy: {
      id: author.id,
      username: author.username,
      avatarURL: author.avatarURL(),
      guildName: originalMessage.guild!.name,
    },
  };

  // If player has been reported before, add to their existing reports.
  // Otherwise we'll add them with the current report as their first.
  try {
    const playerExists: IPlayerDocument | null = await PlayerModel.findOne({
      username: targetPlayer,
    });
    if (playerExists) {
      playerExists.reports.push(report);
      await playerExists.save();
    } else {
      await new PlayerModel({
        username: targetPlayer,
        reports: [report],
      }).save();
    }
  } catch (e) {
    console.log('error saving report', e);
  }

  // Create embed message for reply
  const embed = getReportEmbed(
    originalMessage,
    targetPlayer,
    targetDescription,
  );
  originalMessage.channel.send(embed);
};

const getDescription = (msgArray: string[]) => {
  const spliced = msgArray.splice(2);
  return spliced.join(' ');
};

const getReportEmbed = (
  originalMessage: Message,
  target: string,
  description: string,
) => {
  const avatarURL = originalMessage.author.avatarURL() || undefined;
  return new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`New Player Report Created for ${target}`)
    .setURL('https://discord.js.org/')
    .setAuthor(originalMessage.author.username, avatarURL)
    .setDescription(description)
    .setFooter('Thanks for the report!');
};

export default report;
