import { Message } from 'discord.js';
import report from './commands/report';
import reportYoutube from './commands/report-youtube';
import reportHero from './commands/report-hero';
import info from './commands/info';
import infoHero from './commands/info-hero';

export default (message: Message) => {
  const messageContent = message.content;
  const msgArray = messageContent.split(' ');

  // Command should be first value when splitting apart message
  const command = msgArray[0];

  switch (command) {
    case '_report':
      report(message, msgArray);
      break;
    case '_report-youtube':
      reportYoutube(message, msgArray);
      break;
    case '_report-hero':
      reportHero(message, msgArray);
      break;
    case '_info':
      info(message, msgArray);
      break;
    case '_info-hero':
      infoHero(message, msgArray);
      break;
    default:
      console.log('Commands were parsed but no commands were run');
  }
};
