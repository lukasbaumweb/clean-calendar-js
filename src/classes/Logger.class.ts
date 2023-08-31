export class Logger {
  static showDebugLog = false;
  static log(message: string) {
    if (this.showDebugLog) console.debug(`${generateTimeString()}->${message}`);
  }
}

function generateTimeString() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}
