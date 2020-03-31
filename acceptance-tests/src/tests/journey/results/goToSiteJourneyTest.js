import profile from '../../../profiles/live';
import JourneyRunner from '../../../common/journeyRunner';


module.exports = {
  'tags': ['journey', 'results', 'go-to-site-journey', 'lower-environments-only'],

  'Given I am on the results page': (client) => {
    JourneyRunner
      .runWith(client, profile)
      .assertComplete(client, profile);
  },

  'Then I should see results': (client) => {
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
      .goToSite();
  },

  'Then I should be forwarded to the providers site': (client) => {
    client.windowHandles((result) => {
      client.assert.equal(result.value.length, 2, 'Provider site opened');
    });

    client.end();
  }
};
