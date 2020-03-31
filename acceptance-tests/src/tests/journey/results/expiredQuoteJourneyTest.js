import {TYPE_C_EXISTING_ACCOUNT} from '../../../common/userTypeJourneyManager';
import profile from '../../../profiles/live';

module.exports = {
  'tags': ['journey', 'results', 'expired-quote-journey', 'lower-environments-only', TYPE_C_EXISTING_ACCOUNT],

  'Given I am on the results page and load expired quote': (client) => {
    const query = {enquiryId: client.globals.expiredEnquiryId};
    client.page.resultsPage().loadResults(query);
  },

  'Then I should see expired quote donk': (client) => {
    client.page.resultsPage()
      .waitForElementPresent('@expiredQuoteDonk');
  },

  'When I select new policy start date and resubmit enquiry': (client) => {
    client.page.resultsPage()
      .resubmitExpiredQuote(profile.yourPolicy.policyStartDate);
  },

  'Then I should see new results loaded': (client) => {
    client.page.resultsPage()
      .waitForResultsComplete();
  },

  'When I filter my results': (client) => {
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

  'Then I should see new my filtered results': (client) => {
    client.page.resultsPage()
      .waitForElementVisible('@donk')
      .waitForResultsComplete();

    client.end();
  }
};
