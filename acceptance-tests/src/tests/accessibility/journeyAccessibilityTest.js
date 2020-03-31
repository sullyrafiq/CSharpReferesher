import profile from '../../profiles/live';

module.exports = {
  'tags': ['journey', 'accessibility'],

  'Given I navigate to your car page': (client) => {
    client.page.yourCarPage().navigateAndWait();
  },

  'And run accessibility check on your car page': (client) => {
    client.page.yourCarPage().assertAccessibility();
  },

  'Given I navigate to your details page': (client) => {
    client.page.yourCarPage()
      .completePageWithAndNavigateTo(profile.yourCar, 'your-details');
  },

  'And run accessibility check on your details page': (client) => {
    client.page.yourDetailsPage().assertAccessibility();
  },

  'Given I navigate to your policy page': (client) => {
    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(profile.yourDetails, 'your-policy');
  },

  'And run accessibility check on your policy page': (client) => {
    client.page.yourPolicyPage().assertAccessibility();
  },

  'Given I navigate to the results page': (client) => {
    client.page.yourPolicyPage()
      .completePageWithAndNavigateTo(profile.yourPolicy, 'results');
  },

  'And run accessibility check on the results page': (client) => {
    client.page.resultsPage()
      .waitForResultsComplete()
      .assertAccessibility();

    client.end();
  }
};