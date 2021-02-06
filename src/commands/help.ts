import { Command } from 'app-env';
import { Message } from 'discord.js';

export default class HelpCommand implements Command {
  readonly name = 'help';
  readonly description = 'Returns a list of commands';
  readonly format = '?topic';

  async exec(message: Message) {}
}
