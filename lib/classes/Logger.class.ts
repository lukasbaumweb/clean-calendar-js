export class Logger {
  static showDebugLog = false;
  static log(message: string) {
    // eslint-disable-next-line no-console
    if (this.showDebugLog) console.debug(`${generateTimeString()}->${message}`);
  }
}

function generateTimeString() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}
