import { Message } from 'discord.js';
import Discord from 'discord.js';
import PlayerModel from '../models/player';
import { IPlayerDocument, IPlayerReport } from '../types/player.types';

const report = async (originalMessage: Message, msgArray: string[]) => {
  const [, targetUser] = msgArray;
  const targetDescription = getDescription(msgArray);
  const author = originalMessage.author;

  const embed = getReportEmbed(originalMessage, targetUser, targetDescription);

  let report: IPlayerReport = {
    targetDescription,
    createdAt: new Date(),
    reportedBy: {
      id: author.id,
      username: author.username,
      avatarURL: author.avatarURL(),
    },
  };

  try {
    const userExists: IPlayerDocument | null = await PlayerModel.findOne({
      username: targetUser,
    });
    if (userExists) {
      userExists.reports.push(report);
      await userExists.save();
    } else {
      await new PlayerModel({
        username: targetUser,
        reports: [report],
        createdAt: new Date(),
        updatedAt: new Date(),
      }).save();
    }
  } catch (e) {
    console.log('error saving report', e);
  }

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
