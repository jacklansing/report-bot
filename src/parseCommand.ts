import { Message } from 'discord.js';
import report from './commands/report';

export default (message: Message) => {
  const messageContent = message.content;
  const msgArray = messageContent.split(' ');

  // Command should be first value when splitting apart message
  const command = msgArray[0];

  switch (command) {
    case '!report':
      report(message, msgArray);
      break;
    default:
      console.log('Commands were parsed but no commands were run');
  }
};
