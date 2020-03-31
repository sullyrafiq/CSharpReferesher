const fetch = require('node-fetch');

const initConsent = (browser, emailAddress = browser.globals.accountCredentials.email) => {
  const url = `${browser.globals.services_url}/gb/consent/v1/user`;
  const requestBody = {
    user: {
      emailAddress,
      brandId: 1
    },
    optIn: {
      campaignChannels: [],
      campaignCategories: []
    },
    acceptedLegalDocuments: [
      {
        typeId: 1,
        version: 2
      },
      {
        typeId: 1,
        version: 2
      }
    ]
  };

  /* eslint-disable */
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Organisation-ID': 1,
    'Channel-ID': 201,
    'Client-ID': 22,
    'Activity-Type-ID': 1,
    'Source-Code': 'TIV',
    'Visitor-ID': '3Ab8TEQtomcTCUVuJxID'
  };

  return fetch(url, {method: 'PUT', body: JSON.stringify(requestBody), headers})
    .then(response => browser.assert.equal(response.status, 201, `Successfully created consent for ${emailAddress}`))
    .catch((error) => {
      throw error;
    });
  /* eslint-enable */
};

module.exports = {
  initConsent
};