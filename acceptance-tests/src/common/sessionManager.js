const fetch = require('node-fetch');

const createSession = (browser, accountId, isAuthenticated = true) => {
  const url = `${browser.globals.services_url}/gb/session/v2/sessions`;
  const requestBody = {
    session: {
      organisationId: 1,
      sessionTypeVersion: '1.0.0',
      authenticationSlidingExpiryPeriod: 7200,
      accountId,
      isAuthenticated
    }
  };
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Client-ID': 22
  };

  return fetch(url, {body: JSON.stringify(requestBody), method: 'POST', headers})
    .then(response => response.json())
    .then(response => response.session.id)
    .catch((error) => {
      throw error;
    });
};

const getSession = (browser) => {
  const url = `${browser.globals.services_url}/gb/session/v2/sessions/${browser.globals.sessionId}`;

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Client-ID': 22
  };

  return fetch(url, {headers, method: 'GET'})
    .then(response => response.json())
    .then(({session}) => session)
    .catch((error) => {
      throw error;
    });
};

const signOut = (browser) => {
  const url = `${browser.globals.services_url}/gb/session/v2/sessions/${browser.globals.sessionId}`;

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/merge-patch+json',
    'Client-ID': 'AEM'
  };

  const payload = {
    session: {
      isAuthenticated: false,
      authenticatedUntil: '2018-02-18T15:33:03.648Z'
    }
  };

  return fetch(url, {body: JSON.stringify(payload), headers, method: 'PATCH'})
    .then(response => browser.assert.equal(response.status, 204, `Successfully unauthenticated session ${browser.globals.sessionId}`))
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  createSession,
  getSession,
  signOut
};
