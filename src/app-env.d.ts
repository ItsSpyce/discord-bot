/// <reference types="node" />

import { Message } from 'discord.js';

export type CommandArgs<T = any> = {
  message: Message;
  params: T;
};

export interface Command {
  name: string;
  description: string;
  format?: string;
  exec(message: Message): Promise<void>;
}
