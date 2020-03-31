import winston, {format} from 'winston';

import UserTypeJourneyManager from './src/common/userTypeJourneyManager';

const DEFAULT_TIMEOUT = 20000;
const COMMAND_DELAY = 1000;

const logger = winston.createLogger({
  format: format.combine(
    format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({filename: 'reports/console.log'})
  ]
});

console.log = (...args) => logger.info(args);
console.info = (...args) => logger.info(args);
console.warn = (...args) => logger.warn(args);
console.error = (...args) => logger.error(args);
console.debug = (...args) => logger.debug(args);

module.exports = {
  waitForConditionTimeout: DEFAULT_TIMEOUT,
  asyncHookTimeout: DEFAULT_TIMEOUT + 1000,
  commandDelay: COMMAND_DELAY,
  beforeEach(client, done) {
    client.globals.startTime = Date.now();
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    client.url(`${client.launch_url}${client.globals.context_path}/service-worker.js`);
    UserTypeJourneyManager.initialize(client, done);
  },
  afterEach(client, done) {
    console.log(`Test complete in ${Date.now() - client.globals.startTime} milliseconds.`);

    if (client.globals.env === 'prod1') {
      done();
    } else {
      UserTypeJourneyManager.teardown(client, done);
    }
  }
};
