import debug from 'debug';
import * as fs from 'fs';

export function getLogger(namespace: string) {
  const logger = debug(namespace);

  return (msg: string) => {
    logger(msg); // still logs to console
    fs.appendFileSync('test-log.txt', `[${new Date().toISOString()}] [${namespace}] ${msg}\n`);
  };
}