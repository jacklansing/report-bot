const report = require('./commands/report');

module.exports = (message) => {
  const messageContent = message.content;
  const msgArray = messageContent.split(' ');
  const command = msgArray[0];
  switch (command) {
    case '!report':
      report(message, msgArray);
      break;
    default:
      console.log('Commands were parsed but no commands were run');
  }
};
