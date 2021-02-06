import { Client, Message } from 'discord.js';
import { config } from 'dotenv';
import chalk from 'chalk';
import { HelpCommand, PingCommand } from './commands';
import { registerCommand } from './services/command-service';

config();

const bot = new Client();

function setup() {
  registerCommand(new HelpCommand());
  registerCommand(new PingCommand());
}

bot.on('ready', () => {
  setup();
  console.log(chalk`{bgBlueBright.black INFO} Bot ready`);
});

bot.on('message', (message: Message) => {
  if (!message.content.startsWith('!')) return;
  console.log('Command found');
});

bot.login(process.env.BOT_TOKEN);
