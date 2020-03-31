const util = require('util');

function setCookiePolicyAcceptedCookie(browser) {
  const name = 'cookie-policy-accepted';

  browser.deleteCookie(name);
  browser.setCookie({
    name,
    value: '1',
    path: '/'
  });
}

function setSourceCookie(browser) {
  const name = 'source';
  const value = 'TIV';

  browser.globals.sourceCookieValue = value;
  browser.deleteCookie(name);
  browser.setCookie({
    name,
    value,
    path: '/'
  });
}

function setMobileAppCookie(browser) {
  const name = 'payload';
  const value = '%7B%22platform%22%3A%20%22android%22%7D';

  browser.setCookie({
    name,
    value,
    path: '/'
  });
}

function setSessionIdCookie(browser, sessionId) {
  browser.setCookie({
    name: 'session-id',
    value: sessionId,
    secure: true,
    httpOnly: true,
    expiry: new Date().getTime() + 240000,
    path: '/'
  });
}

function getSessionId(browser) {
  browser.getCookie[util.promisify.custom] =
      cookieName => new Promise(resolve => browser.getCookie(cookieName, resolve));

  return util.promisify(browser.getCookie)('session-id')
    .then(({value}) => value)
    .catch(() => browser.assert.equal(true, false));
}

function setUserIdCookie(browser) {
  const name = 'userid';
  const value = 'e69628dfc21044aca0a5';

  browser.globals.userIdCookieValue = value;

  browser.deleteCookie(name);
  browser.setCookie({
    name,
    value,
    expiry: new Date().getTime() + 240000,
    path: '/'
  });
}

function setCookies(browser) {
  setUserIdCookie(browser);
  setCookiePolicyAcceptedCookie(browser);
  setSourceCookie(browser);
}

module.exports = {
  getSessionId,
  setSessionIdCookie,
  setCookies,
  setMobileAppCookie
};