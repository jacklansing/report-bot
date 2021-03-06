import Discord, { Message } from 'discord.js';
import { IPlayerHeroReport } from '../types/player.types';
import formatHeroName from '../utils/formatHeroName';
import PlayerModel from '../models/player';
import ReportHeroSchema from '../utils/validation/reportHeroSchema';
import { ICommand } from '../parseCommand';

export default async (command: ICommand) => {
  const { originalMessage, msgArray } = command;
  const [, targetPlayer, heroName, ...desc] = msgArray;

  const heroDescription = desc.join(' ');

  const formattedHeroName = formatHeroName(heroName);

  try {
    await ReportHeroSchema.validate(
      { targetPlayer, heroName, heroDescription },
      { abortEarly: false },
    );
  } catch (e) {
    return originalMessage.channel.send(
      `There was an error with your report: \n  > ${e.errors.join(' \n > ')}`,
    );
  }

  const author = originalMessage.author;

  let report: IPlayerHeroReport = {
    heroDescription,
    reportedBy: {
      discord_id: author.id,
      username: author.username,
      avatarURL: author.avatarURL(),
      guildName: originalMessage.guild!.name,
    },
  };

  try {
    const playerExists = await PlayerModel.findOne({ username: targetPlayer });
    const hero = playerExists?.heroReports.get(formattedHeroName);

    // If the hero is already in the map, then we just add to it's reports array.
    // If the hero is not in the map, we add it to the map with it's first report.
    // Else, the player has not ever been reported we add the player with it's first report.
    if (hero) {
      hero.reports.push(report);
      await playerExists?.save();
    } else if (playerExists && !hero) {
      playerExists.heroReports.set(formattedHeroName, { reports: [report] });
      await playerExists.save();
    } else {
      await new PlayerModel({
        username: targetPlayer,
        heroReports: new Map().set(formattedHeroName, { reports: [report] }),
      }).save();
    }
  } catch (e) {
    console.log(e);
  }

  const embed = getHeroReportEmbed(
    originalMessage,
    targetPlayer,
    formattedHeroName,
    heroDescription,
  );

  return originalMessage.channel.send(embed);
};

const getHeroReportEmbed = (
  originalMessage: Message,
  target: string,
  heroName: string,
  heroDescription: string,
) => {
  const avatarURL = originalMessage.author.avatarURL() || undefined;
  return new Discord.MessageEmbed()
    .setColor('#ff2211')
    .setTitle(`New Hero Report Added for ${target}'s ${heroName}`)
    .setDescription(heroDescription)
    .setURL('https://www.google.com')
    .setAuthor(originalMessage.author.username, avatarURL)
    .setFooter('Thanks for the report!');
};
