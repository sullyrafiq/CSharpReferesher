/* eslint-disable no-console */
import CookieManager from './cookieManager';
import ConsentManager from './consentManager';
import SessionManager from './sessionManager';
import AccountManager from './accountManager';

export const TYPE_A_REGISTER = 'type-a-register';
export const TYPE_A_REGISTER_INLINE = 'type-a-register-in-line';
export const TYPE_A_SIGN_IN = 'type-a-sign-in';
export const TYPE_A_SIGN_IN_INLINE = 'type-a-sign-in-inline';
export const TYPE_A_SIGN_IN_INLINE_UPFRONT = 'type-a-sign-in-inline-upfront';
export const TYPE_A_SIGN_IN_INLINE_FORGOTTEN_PASSWORD_UPFRONT = 'type-a-sign-in-inline-forgotten-password-upfront';
export const TYPE_A_FORGOTTEN_PASSWORD = 'type-a-forgotten-password';

const TYPE_B = 'type-b';
export const TYPE_B_ALT = 'type-b-alt';
export const TYPE_B_SIGN_IN = 'type-b-sign-in';
export const TYPE_B_FORGOTTEN_PASSWORD = 'type-b-forgotten-password';
export const TYPE_B_ALT_REGISTER = 'type-b-alt-register';
export const TYPE_B_ALT_SIGN_IN = 'type-b-alt-sign-in';
export const TYPE_B_ALT_FORGOTTEN_PASSWORD = 'type-b-alt-forgotten-password';
export const TYPE_MOBILE_APP_COOKIE = 'type-mobile-app-cookie';

export const TYPE_C = 'type-c';
export const TYPE_C_EXISTING_ACCOUNT = 'type-c-existing-account';

export const TYPE_TAGS = [
  TYPE_A_REGISTER,
  TYPE_A_REGISTER_INLINE,
  TYPE_A_SIGN_IN,
  TYPE_A_SIGN_IN_INLINE,
  TYPE_A_SIGN_IN_INLINE_UPFRONT,
  TYPE_A_SIGN_IN_INLINE_FORGOTTEN_PASSWORD_UPFRONT,
  TYPE_A_FORGOTTEN_PASSWORD,
  TYPE_B_SIGN_IN,
  TYPE_B_FORGOTTEN_PASSWORD,
  TYPE_B_ALT_REGISTER,
  TYPE_B_ALT_SIGN_IN,
  TYPE_B_ALT_FORGOTTEN_PASSWORD,
  TYPE_C,
  TYPE_C_EXISTING_ACCOUNT,
  TYPE_MOBILE_APP_COOKIE
];

const SMOKE_TEST_MODULE = 'smokeTest';

const initializeJourneyFor = (client, done) => {
  const journeyType = client.globals.journeyType;
  const isAuthenticated = !journeyType.includes(TYPE_B);

  if (client.currentTest.module === SMOKE_TEST_MODULE) {
    client.globals.accountCredentials = AccountManager.generateAccountCredentialsForSmokeTest();
  } else if (client.globals.journeyType === TYPE_A_SIGN_IN_INLINE_UPFRONT ||
      client.globals.journeyType === TYPE_C_EXISTING_ACCOUNT) {
    client.globals.accountCredentials = client.globals.existingAccountCredentials;
  } else {
    client.globals.accountCredentials = AccountManager.generateAccountCredentials();
  }

  if (journeyType.includes(TYPE_B_ALT)) {
    client.globals.altAccountCredentials = AccountManager.generateAccountCredentials();
  }

  switch (journeyType) {
    case TYPE_A_REGISTER:
    case TYPE_A_REGISTER_INLINE:
    case TYPE_A_SIGN_IN_INLINE_UPFRONT:
      return Promise.resolve(CookieManager.setCookies(client))
        .then(done)
        .catch(error => console.log(error));

    case TYPE_A_SIGN_IN_INLINE_FORGOTTEN_PASSWORD_UPFRONT:
      return AccountManager.createAccount(client, client.globals.accountCredentials)
        .then(() => CookieManager.setCookies(client))
        .then(() => ConsentManager.initConsent(client))
        .then(done)
        .catch(error => console.log(error));

    case TYPE_A_SIGN_IN:
    case TYPE_A_SIGN_IN_INLINE:
    case TYPE_A_FORGOTTEN_PASSWORD:
      return AccountManager.createAccount(client, client.globals.accountCredentials)
        .then(() => CookieManager.setCookies(client))
        .then(() => ConsentManager.initConsent(client))
        .then(done)
        .catch(error => console.log(error));

    case TYPE_C_EXISTING_ACCOUNT:
      return AccountManager.getAccountId(client, client.globals.accountCredentials)
        .then(accountId => SessionManager.createSession(client, accountId, isAuthenticated))
        .then(sessionId => CookieManager.setSessionIdCookie(client, sessionId))
        .then(() => CookieManager.setCookies(client))
        .then(done)
        .catch(error => console.log(error));

    case TYPE_MOBILE_APP_COOKIE:
      return AccountManager.createAccount(client, client.globals.accountCredentials)
        .then(() => CookieManager.setCookies(client))
        .then(() => CookieManager.setMobileAppCookie(client))
        .then(() => ConsentManager.initConsent(client))
        .then(done)
        .catch(error => console.log(error));

    case TYPE_B_ALT_SIGN_IN:
    case TYPE_B_ALT_FORGOTTEN_PASSWORD:
      AccountManager.createAccount(client, client.globals.altAccountCredentials);

    // eslint-disable-next-line no-fallthrough
    default:
      return AccountManager.createAccount(client, client.globals.accountCredentials)
        .then(accountId => SessionManager.createSession(client, accountId, isAuthenticated))
        .then(sessionId => CookieManager.setSessionIdCookie(client, sessionId))
        .then(() => CookieManager.setCookies(client))
        .then(() => ConsentManager.initConsent(client))
        .then(done)
        .catch(error => console.log(error));
  }
};

const initialize = (client, done) => {
  const testTags = require(`../tests/${client.currentTest.module}`).tags;
  const testTypeTags = testTags.filter(tag => TYPE_TAGS.includes(tag));

  if (testTypeTags.length > 1) {
    throw new Error('Test tagged with more than one test type');
  }

  client.globals.journeyType = testTypeTags[0] || TYPE_C;
  initializeJourneyFor(client, done);
};

const accountAction = (client) => {
  const {journeyType, accountCredentials, altAccountCredentials} = client.globals;

  const {email, password} = journeyType.indexOf(TYPE_B_ALT) > -1 ? altAccountCredentials : accountCredentials;

  switch (journeyType) {
    case TYPE_A_REGISTER_INLINE:
      return client.page.yourPolicyPage().registerInline({
        email, confirmationEmail: email,
        password, confirmationPassword: password
      });

    case TYPE_A_SIGN_IN_INLINE:
    case TYPE_MOBILE_APP_COOKIE:
      return client.page.yourPolicyPage().signInInline({email, password});

    case TYPE_A_REGISTER:
    case TYPE_B_ALT_REGISTER:
      return client.page.yourPolicyPage().register({
        email, confirmationEmail: email,
        password, confirmationPassword: password
      });

    case TYPE_A_FORGOTTEN_PASSWORD:
      return client.page.yourPolicyPage()
        .forgottenPassword({email});

    case TYPE_B_ALT_FORGOTTEN_PASSWORD:
      return client.page.yourPolicyPage()
        .assert.value('@email', accountCredentials.email)
        .forgottenPassword({email});

    case TYPE_B_FORGOTTEN_PASSWORD:
      return client.page.yourPolicyPage()
        .assert.value('@email', email)
        .click('@forgottenPassword');

    case TYPE_B_SIGN_IN:
      return client.page.yourPolicyPage()
        .assert.value('@email', email)
        .completePageWith({password});

    case TYPE_A_SIGN_IN:
      return client.page.yourPolicyPage().signIn({email, password});

    case TYPE_A_SIGN_IN_INLINE_UPFRONT:
      return client.page.yourCarPage().signInInline({email, password});

    case TYPE_A_SIGN_IN_INLINE_FORGOTTEN_PASSWORD_UPFRONT:
      return client.page.yourCarPage().forgottenPasswordInLine({email});

    case TYPE_B_ALT_SIGN_IN:
      return client.page.yourPolicyPage()
        .assert.value('@email', accountCredentials.email)
        .signIn({email, password});

    default:
      return;
  }
};

const teardown = (client, done) => {
  const {accountCredentials, altAccountCredentials} = client.globals;
  return Promise.all([accountCredentials, altAccountCredentials]
    .filter(account => account && account.delete)
    .map(account => AccountManager.getAccountId(client, account)
      .then(accountId => AccountManager.deleteAccount(client, accountId))
      .catch(error => console.log(error)))
  ).then(done);
};

export default {initialize, accountAction, teardown};
