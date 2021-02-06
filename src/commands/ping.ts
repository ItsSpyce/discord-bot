import { Command } from 'app-env';
import { Message } from 'discord.js';

export default class PingCommand implements Command {
  readonly name = 'ping';
  readonly description = 'Pong!';

  async exec(message: Message) {}
}
