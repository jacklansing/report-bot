import { Message } from 'discord.js';
import report from './commands/report';
import reportYoutube from './commands/report-youtube';
import reportHero from './commands/report-hero';
import info from './commands/info';
import infoHero from './commands/info-hero';
import { COMMAND_PRFEIX, FLAG_PREFIX } from './config';

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
    type: msgArray[0].slice(COMMAND_PRFEIX.length),
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
        // Spaces are joined by underscores when usin a flag
        argument: msgArray[++cursor].split('_').join(' '),
      });
    }
    cursor++;
    continue;
  }

  switch (command.type) {
    case 'report':
      report(command);
      break;
    case 'report-youtube':
      reportYoutube(command);
      break;
    case 'report-hero':
      reportHero(command);
      break;
    case 'info':
      info(command);
      break;
    case 'info-hero':
      infoHero(command);
      break;
    default:
      console.log('Commands were parsed but no commands were run');
  }
};
