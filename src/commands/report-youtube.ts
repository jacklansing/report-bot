import Discord, { Message } from 'discord.js';
import ReportYoutubeSchema from '../utils/validation/reportYoutubeSchema';
import PlayerModel from '../models/player';
import { IPlayerYoutubeReport } from '../types/player.types';

export default async (originalMessage: Message, msgArray: string[]) => {
  const [, targetPlayer, youtubeURL] = msgArray;

  try {
    await ReportYoutubeSchema.validate(
      { targetPlayer, youtubeURL },
      { abortEarly: false },
    );
  } catch (e) {
    originalMessage.channel.send(
      `There was an error with your report: \n  > ${e.errors.join(' \n > ')}`,
    );
  }

  const author = originalMessage.author;
  let report: IPlayerYoutubeReport = {
    youtubeURL,
    reportedBy: {
      username: author.username,
      avatarURL: author.avatarURL(),
      guildName: originalMessage.guild!.name,
    },
  };

  try {
    const playerExists = await PlayerModel.findOne({ username: targetPlayer });
    if (playerExists) {
      playerExists.youtubeReports.push(report);
      await playerExists.save();
    } else {
      await new PlayerModel({
        username: targetPlayer,
        youtubeReports: [report],
      }).save();
    }
  } catch (e) {
    console.log(e);
  }

  const embed = getYoutubeReportEmbed(
    originalMessage,
    targetPlayer,
    youtubeURL,
  );
  originalMessage.channel.send(embed);
};

const getYoutubeReportEmbed = (
  originalMessage: Message,
  target: string,
  youtubeURL: string,
) => {
  const avatarURL = originalMessage.author.avatarURL() || undefined;
  return new Discord.MessageEmbed()
    .setColor('#ff2211')
    .setTitle(`New Youtube Report Added for ${target}`)
    .setURL(youtubeURL)
    .setAuthor(originalMessage.author.username, avatarURL)
    .setFooter('Thanks for the report!');
};