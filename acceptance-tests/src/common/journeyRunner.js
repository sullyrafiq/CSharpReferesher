/* eslint-disable no-console */
import fetch from 'node-fetch';
import {diff} from 'deep-object-diff';

import CookieManager from './cookieManager';
import AccountManager from './accountManager';
import SessionManager from './sessionManager';
import UserTypeJourneyManager, {
  TYPE_A_REGISTER,
  TYPE_A_REGISTER_INLINE,
  TYPE_A_SIGN_IN,
  TYPE_A_SIGN_IN_INLINE,
  TYPE_A_SIGN_IN_INLINE_UPFRONT,
  TYPE_A_SIGN_IN_INLINE_FORGOTTEN_PASSWORD_UPFRONT,
  TYPE_B_ALT,
  TYPE_B_ALT_REGISTER,
  TYPE_B_ALT_SIGN_IN,
  TYPE_B_SIGN_IN,
  TYPE_MOBILE_APP_COOKIE
} from './userTypeJourneyManager';

const NINETY_DAYS_IN_SECONDS = 90 * 24 * 60 * 60;
const TWO_HOURS_IN_SECONDS = 2 * 60 * 60;

const E2E_ENVS = ['local', 'pr-builder', 'local-ios-xcode', 'local-grid', 'chrome', 'safari', 'sit1'];

const ENQUIRY_FIELDS_TO_IGNORE = ['receiptId', 'quickEstimate', 'policyHolder.email', 'policyHolder.isExtendedSession'];

const deleteObjectPath = (obj, path) => {
  path.split('.').reduce((accum, key, i, keys) => {
    if (i === keys.length - 1) {
      delete accum[key];
    }

    return accum[key];
  }, obj);
};

const filteredEnquiry = (originalEnquiry) => {
  const enquiry = JSON.parse(JSON.stringify(originalEnquiry));

  ENQUIRY_FIELDS_TO_IGNORE.forEach(field => deleteObjectPath(enquiry, field));

  return enquiry;
};

export default {
  runWith(client, profile) {
    client.page.yourCarPage()
      .navigateAndWait()
      .fetchSpy();

    this.completeWith(client, profile);

    return this;
  },

  runExperimentWith(client, profile, variation) {
    const experimentUrl = `${client.page.yourCarPage().url()}?optimizely_x=${variation}&optimizely_token=PUBLIC`;

    console.log('Experiment URL: ', experimentUrl);

    client
      .url(experimentUrl)
      .page.yourCarPage().waitForElementVisible('@main', 60000)
      .fetchSpy();

    this.completeWith(client, profile);

    return this;
  },
  completeWith(client, profile) {
    if (client.globals.journeyType === TYPE_A_SIGN_IN_INLINE_UPFRONT ||
        client.globals.journeyType === TYPE_A_SIGN_IN_INLINE_FORGOTTEN_PASSWORD_UPFRONT) {
      UserTypeJourneyManager.accountAction(client);
    }

    client.page.yourCarPage()
      .completePageWithAndNavigateTo(profile.yourCar, 'your-details');

    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(profile.yourDetails, 'your-policy');

    client.page.yourPolicyPage()
      .completePageWith(profile.yourPolicy);

    if (client.globals.journeyType !== TYPE_A_SIGN_IN_INLINE_UPFRONT &&
        client.globals.journeyType !== TYPE_A_SIGN_IN_INLINE_FORGOTTEN_PASSWORD_UPFRONT) {
      UserTypeJourneyManager.accountAction(client);
    }

    client.page.yourPolicyPage()
      .proceed();

    return this;
  },

  assertUIWith(client, profile) {
    client.page.yourCarPage()
      .assertUIWith(profile.yourCar)
      .navigateTo('your-details');

    client.page.yourDetailsPage()
      .assertUIWith(profile.yourDetails)
      .navigateTo('your-policy');

    client.page.yourPolicyPage()
      .assertUIWith(profile.yourPolicy);

    return this;
  },

  assertComplete(client, profile, assertEnquiry = true) {
    client.page.resultsPage()
      .waitForUrlToContain('results');

    if (assertEnquiry) {
      this.assertEnquiry(client, profile);
    }

    return this;
  },

  assertEnquiry(client, profile) {
    client.execute(() => window.location.search.split('enquiryId=')[1], [], ({value: enquiryId}) => {
      const isE2EEnv = E2E_ENVS.includes(client.globals.env);
      const aggResponse = profile.aggResponse;

      console.log(`\x1b[32m ✔ \x1b[0mEnquiry ID ${enquiryId}`);

      if (client.globals.enquiry_check_enabled && isE2EEnv && aggResponse) {
        console.log('Running: \x1b[32m When I check agg response against profile \x1b[0m');
        client.perform((done) => {
          this.compareEnquiry(client, aggResponse, enquiryId).then(done);
        });
      }
    });
  },

  compareEnquiry(client, {payload: expectedPayload, isAuthenticated, clientId}, enquiryId) {
    const enquiryUrl = `${client.globals.services_url}/gb/aggregation/v2/car-insurance/enquiries/${enquiryId}`;
    const {journeyType, accountCredentials, altAccountCredentials} = client.globals;
    const {email} = journeyType.indexOf(TYPE_B_ALT) > -1 ? altAccountCredentials : accountCredentials;
    return CookieManager.getSessionId(client)
      .then((sessionId) => {
        client.globals.sessionId = sessionId;
      })
      .then(() => SessionManager.getSession(client))
      .then(({authenticationSlidingExpiryPeriod, accountId}) => {
        client.globals.accountId = accountId;
        switch (journeyType) {
          case TYPE_A_REGISTER:
          case TYPE_A_REGISTER_INLINE:
          case TYPE_A_SIGN_IN:
          case TYPE_A_SIGN_IN_INLINE:
          case TYPE_A_SIGN_IN_INLINE_UPFRONT:
          case TYPE_B_SIGN_IN:
          case TYPE_B_ALT_REGISTER:
          case TYPE_B_ALT_SIGN_IN:
          case TYPE_MOBILE_APP_COOKIE:
            return client.assert.equal(authenticationSlidingExpiryPeriod, NINETY_DAYS_IN_SECONDS, `Comparing Authentication Sliding Expiry Period (${authenticationSlidingExpiryPeriod} === ${NINETY_DAYS_IN_SECONDS})`);

          default:
            return client.assert.equal(authenticationSlidingExpiryPeriod, TWO_HOURS_IN_SECONDS, `Comparing Authentication Sliding Expiry Period (${authenticationSlidingExpiryPeriod} === ${TWO_HOURS_IN_SECONDS})`);
        }

      })
      .then(() => fetch(enquiryUrl))
      .then(response => response.json())
      .then((data) => {
        const {clientId: payloadIsClientId, accountId, sessionId, sourceCode, visitorId, isAuthenticated: payloadIsAuthenticated, payload} = data;

        client.assert.equal(payloadIsClientId, clientId, `Comparing Client ID (${payloadIsClientId} === ${clientId})`);
        client.assert.equal(accountId, client.globals.accountId, `Comparing Account ID (${accountId} === ${client.globals.accountId})`);
        client.assert.equal(sessionId, client.globals.sessionId, `Comparing Session ID (${sessionId} === ${client.globals.sessionId})`);
        client.assert.equal(sourceCode, client.globals.sourceCookieValue, `Comparing Source Cookie (${sourceCode} === ${client.globals.sourceCookieValue})`);
        client.assert.equal(visitorId, client.globals.userIdCookieValue, `Comparing User ID (${visitorId} === ${client.globals.userIdCookieValue})`);
        client.assert.equal(payload.policyHolder.email, email, `Comparing Email (${payload.policyHolder.email} === ${email})`);
        client.assert.equal(payloadIsAuthenticated, isAuthenticated, `Comparing isAuthenticated (${payloadIsAuthenticated} === ${isAuthenticated})`);

        const filteredPayload = filteredEnquiry(payload);
        const filteredExpectedPayload = filteredEnquiry(expectedPayload);

        client.assert.deepStrictEqual(filteredPayload, filteredExpectedPayload);

        const enquiryDiff = diff(filteredPayload, filteredExpectedPayload);

        if (Object.keys(enquiryDiff).length) {
          console.log('\x1b[31m ✖ \x1b[0mAgg response check failed, diff:');
          console.log('Expected:', diff(filteredPayload, filteredExpectedPayload));
          console.log('Got:', diff(filteredExpectedPayload, filteredPayload));
        }
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  },

  assertRepop(client, profile) {
    // Then I am taken to the your car page with an enquiry ID
    client
      .waitForUrlToContain('your-car')
      .url((result) => {
        const uuid = /[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}/;
        const pattern = `your-car?enquiryId=${result.value.match(uuid)[0]}`;

        client.page.yourCarPage().waitForUrlToContain(pattern);
      });

    client.pause(client.globals.commandDelay);
    // Assert UI
    this.assertUIWith(client, profile);

    client.page.yourPolicyPage().navigateTo('results');

    return this;
  },

  authenticateUser(client) {
    return Promise.resolve(AccountManager.getAccountId(client, client.globals.accountCredentials))
      .then(accountId => SessionManager.createSession(client, accountId, true))
      .then(sessionId => CookieManager.setSessionIdCookie(client, sessionId));
  }
};
