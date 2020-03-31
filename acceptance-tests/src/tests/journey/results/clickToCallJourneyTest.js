import profile from '../../../profiles/live';
import JourneyRunner from '../../../common/journeyRunner';
import SessionManager from '../../../common/sessionManager';

module.exports = {
  'tags': ['journey', 'results', 'click-to-call-journey', 'lower-environments-only'],

  'Given I am on the results page': (client) => {
    JourneyRunner
      .runWith(client, profile)
      .assertComplete(client, profile);
  },

  'Then I should see results': (client) => {
    client.page.resultsPage()
      .waitForResultsComplete();
  },

  'When I click on more': (client) => {
    client.page.resultsPage()
      .click('@moreButtonClickToCall');
  },

  'Then I should see the policy slider': (client) => {
    client.page.resultsPage()
      .waitForElementVisible('@policySlider');
  },

  'When my session expires': (client) => {
    SessionManager.signOut(client);
    client.pause(1000);
  },

  'And I click "Click to Call"': (client) => {
    client.page.resultsPage()
      .click('@clickToCall');
  },

  'Then sign in form should appear which would allow me to sign in again': (client) => {
    client.page.resultsPage()
      .waitForElementVisible('@signInForm')
      .signIn(client.globals.accountCredentials);
  },

  'Then I should see the provider phone number and reference': (client) => {
    client.page.resultsPage()
      .waitForElementVisible('@clickToCallReference')
      .assert.attributeContains('@clickToCall', 'href', 'tel:');

    client.end();
  }
};
