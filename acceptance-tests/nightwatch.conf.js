require('@babel/polyfill');
require('@babel/register')();
const argv = require('yargs').argv;

module.exports = (function(settings) {
  settings.test_workers = false;
  settings.test_settings.default.test_workers.workers = parseInt(process.env.NIGHTWATCH_TEST_WORKERS) || 4
  if (process.env.RUN_ON_BSTACK == 'true') {
    settings.test_settings.default.selenium_host = 'hub.browserstack.com';
    settings.test_settings.default.desiredCapabilities['browserstack.local'] = true;
    settings.test_settings.default.desiredCapabilities['browserstack.safari.enablePopups'] = true;
    settings.test_settings.default.desiredCapabilities['browserstack.networkLogs'] = true;
    settings.test_settings.default.desiredCapabilities['browserstack.localIdentifier'] = `mcqueen-${process.env.MSMID_ENV}`;
    settings.test_settings.default.desiredCapabilities['browserstack.user'] = argv.bsuser || process.env.BROWSERSTACK_USERNAME;
    settings.test_settings.default.desiredCapabilities['browserstack.key'] = argv.bskey || process.env.BROWSERSTACK_ACCESS_KEY;
    settings.test_settings.default.desiredCapabilities['browserstack.console'] = "errors";
  }
  return settings;
})(require('./nightwatch.json'));
