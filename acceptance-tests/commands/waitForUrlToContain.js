const RETRY_TIMEOUT = 400;

const assertUrlContains = (client, urlFragment) => {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const waitForUrl = () => {
      client.url(({value: url}) => {
        if (url.indexOf(urlFragment) > -1) {
          return resolve();
        } else if ((Date.now() - start) >= client.globals.waitForConditionTimeout) {
          return reject();
        }

        setTimeout(waitForUrl, RETRY_TIMEOUT);
      });
    };

    waitForUrl();
  });
};

exports.command = function (urlFragment) {
  const message = `Asserting url contains "${urlFragment}"`;

  return this
    .perform((done) => {
      assertUrlContains(this, urlFragment)
        .then(() => this.assert.equal(true, true, message))
        .catch(() => this.assert.equal(false, true, message))
        .finally(done);
    });
};