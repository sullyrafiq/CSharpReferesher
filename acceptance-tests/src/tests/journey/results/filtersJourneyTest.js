import profile from '../../../profiles/live';
import JourneyRunner from '../../../common/journeyRunner';
import SessionManager from '../../../common/sessionManager';

module.exports = {
  'tags': ['journey', 'results', 'filters-journey', 'lower-environments-only'],

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

  'And I filter my results': (client) => {
    client.page.resultsPage()
      .triggerFilters()
      .expandFilters();

    client.page.resultsPage()
      .completePageWith({
        paymentPreference: 2,
        policyType: 2,
        voluntaryExcess: 500
      })
      .updateResults();
  },

  'Then sign in form should appear which would allow me to sign in again': (client) => {
    client.page.resultsPage()
      .waitForElementVisible('@signInForm')
      .signIn(client.globals.accountCredentials);
  },

  'Then I should see new my filtered results': (client) => {
    client.page.resultsPage()
      .waitForElementVisible('@donk')
      .waitForResultsComplete();
  },

  'And a new enquiry is created with the new filter values': (client) => {
    const updatedProfile = JSON.parse(JSON.stringify(profile));
    updatedProfile.aggResponse.payload.policy = Object.assign(
      {},
      updatedProfile.aggResponse.payload.policy,
      {
        paymentTypeId: 1,
        paymentTypeIdForPrices: 2,
        policyTypeId: 2,
        voluntaryExcess: 500
      }
    );

    JourneyRunner.assertEnquiry(client, updatedProfile);

    client.end();
  }
};
