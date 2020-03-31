import profile from '../../../profiles/live';
import JourneyRunner from '../../../common/journeyRunner';
import SessionManager from '../../../common/sessionManager';

module.exports = {
  'tags': ['journey', 'results', 'your-cover-needs-journey', 'lower-environments-only'],

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

  'And I click "Your Cover Needs"': (client) => {
    client.page.resultsPage()
      .triggerYourCoverNeeds();
  },

  'Then sign in form should appear which would allow me to sign in again': (client) => {
    client.page.resultsPage()
      .waitForElementVisible('@signInForm')
      .signIn(client.globals.accountCredentials);
  },

  'And I should see the cover needs slider': (client) => {
    client.page.resultsPage()
      .waitForElementVisible('@coverNeedsSlider');
  },

  'When I click on edit your quote': (client) => {
    client.page.resultsPage()
      .click('@coverNeedsSliderEditQuoteButton');

    client.waitForUrlToContain('questionset');
  },

  'Then I should be taken back to the your-car page': (client) => {
    client.page.yourCarPage()
      .waitForUrlToContain('shop/car-insurance/questionset/your-car');
  },

  'When I click the browser back button': (client) => {
    client.back();
  },

  'Then I should be taken back to the results page': (client) => {
    client.page.resultsPage()
      .waitForUrlToContain('shop/car-insurance/results');

    client.end();
  }
};
