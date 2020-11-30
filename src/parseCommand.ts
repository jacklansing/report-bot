import { Message } from 'discord.js';
import report from './commands/report';
import reportYoutube from './commands/report-youtube';
import reportHero from './commands/report-hero';
import info from './commands/info';
import infoHero from './commands/info-hero';
import { FLAG_PREFIX } from './config';

export interface ICommand {
  type: string;
  flags: ICommandFlag[];
  originalMessage: Message;
  msgArray: string[];
}

export interface ICommandFlag {
  flag: string;
  argument: string;
}

export default (message: Message) => {
  const messageContent = message.content;
  const msgArray = messageContent.split(' ');

  // Command should be first value when splitting apart message
  const command: ICommand = {
    type: msgArray[0],
    flags: [],
    originalMessage: message,
    msgArray,
  };

  let cursor = 1;

  while (cursor < msgArray.length - 1) {
    let currentMsg = msgArray[cursor];
    if (currentMsg.startsWith(FLAG_PREFIX)) {
      command.flags.push({
        flag: currentMsg.slice(FLAG_PREFIX.length),
        argument: msgArray[++cursor],
      });
    }
    cursor++;
    continue;
  }

  switch (command.type) {
    case '_report':
      report(command);
      break;
    case '_report-youtube':
      reportYoutube(command);
      break;
    case '_report-hero':
      reportHero(command);
      break;
    case '_info':
      info(command);
      break;
    case '_info-hero':
      infoHero(command);
      break;
    default:
      console.log('Commands were parsed but no commands were run');
  }
};
