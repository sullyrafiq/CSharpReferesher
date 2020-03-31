import profile from '../../../profiles/live';
import JourneyRunner from '../../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'results', 'monthly-and-annually-prices-journey', 'lower-environments-only'],

  'Given I am on the results page with annually selected': (client) => {
    JourneyRunner
      .runWith(client, profile)
      .assertComplete(client, profile);
  },

  'Then I should see results': (client) => {
    client.page.resultsPage()
      .waitForResultsComplete();
  },

  'And I should see the total annual price breakdown': (client) => {
    client.page.resultsPage()
      .waitForElementVisible('@annualPriceHeader')
      .waitForElementVisible('@annualPriceEntry');
  },

  'When I change the view to monthly': (client) => {
    client.page.resultsPage()
      .triggerFilters()
      .expandFilters();

    client.page.resultsPage()
      .completePageWith({
        paymentPreference: 2
      })
      .updateResults();
  },

  'Then I should see the total monthly price breakdown': (client) => {
    client.page.resultsPage()
      .waitForElementVisible('@monthlyPriceHeader')
      .waitForElementVisible('@monthlyTotalPriceEntry');

    client.end();
  }
};
