import profile from '../../../profiles/live';
import JourneyRunner from '../../../common/journeyRunner';
import SessionManager from '../../../common/sessionManager';

module.exports = {
  'tags': ['journey', 'results', 'go-to-site-logged-out-journey', 'lower-environments-only'],

  'Given I am on the results page': (client) => {
    JourneyRunner
      .runWith(client, profile)
      .assertComplete(client, profile);
  },

  'Then I should see results': (client) => {
    client.page.resultsPage()
      .waitForResultsComplete();
  },

  'When my session expires': (client) => {
    SessionManager.signOut(client);
    client.pause(1000);
  },

  'And I reload the page': (client) => {
    client.refresh();
  },

  'Then sign in form should appear which would allow me to sign in again': (client) => {
    client.page.resultsPage()
      .waitForElementVisible('@signInForm')
      .signIn(client.globals.accountCredentials);
  },

  'And I should see results again': (client) => {
    client.page.resultsPage()
      .waitForResultsComplete();
  },

  'When I click a provider image': (client) => {
    client.page.resultsPage()
      .click('@providerImageGoToSite');
  },

  'Then I should see the policy slider': (client) => {
    client.page.resultsPage()
      .waitForElementVisible('@policySlider');
  },

  'When I click "Go to Site"': (client) => {
    client.page.resultsPage()
      .click('@goToSite');
  },

  'And I should be forwarded to the providers site': (client) => {
    client.windowHandles((result) => {
      client.assert.equal(result.value.length, 2, 'Provider site opened');
    });

    client.end();
  }
};
