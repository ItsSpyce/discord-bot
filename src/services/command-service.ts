import chalk from 'chalk';
import { Command } from 'app-env';
import _ from 'lodash';

type FormatParam = {
  name: string;
  optional: boolean;
};

const registeredCommands = new Map<string, Command>();
const commandFormats = new Map<string, FormatParam[]>();
const formatParamRegex = /\??[a-z_-]/gi;

export function registerCommand(command: Command) {
  if (registeredCommands.has(command.name)) {
    console.error(
      chalk`{bgRedBright.black ERROR} ${command.name} is already registered`
    );
    return;
  }
  registeredCommands.set(command.name, command);
  const format = command.format || '';
  try {
    const formatMap = buildFormatMap(format);
    commandFormats.set(command.name, formatMap);
    console.log(
      chalk`{bgGreenBright.black SUCCESS} Command ${command.name} registered`
    );
  } catch (err) {
    console.log(
      chalk`{bgRedBright.black ERROR} Failed to register ${command.name} - ${err.message}`
    );
  }
}

function buildFormatMap(format: string) {
  const order: FormatParam[] = [];
  if (format.length === 0) return order;
  const doesParamExist = (param: string) =>
    !_.every(
      order,
      (formatParam) => formatParam.name.toLowerCase() !== param.toLowerCase()
    );
  let isReadingOptional = false;

  const params = format.split(' ');
  for (let param of params) {
    if (!formatParamRegex.test(param)) {
      throw new Error(`Invalid format param: ${param}`);
    }
    const isOptional = param.startsWith('?');
    const name = isOptional ? param.substr(1) : param;
    if (doesParamExist(name)) {
      throw new Error(`Duplicate param found: ${name}`);
    }
    if (!isOptional) {
      if (isReadingOptional) {
        throw new Error('Cannot have a required argument after an optional');
      }
      order.push({ name, optional: false });
    } else {
      isReadingOptional = true;
      order.push({ name, optional: true });
    }
  }
  return order;
}

function parseFormattedArgs(message: string) {
  // pull variables out
  const args = message.split(' ');
  const name = message[0].substr(1);
}

export async function runCommand(name: string) {}

export async function findCommand(message: string) {}

export function getCommands() {
  return registeredCommands.keys();
}
