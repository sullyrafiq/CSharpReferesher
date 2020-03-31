import standardProfile from '../../profiles/standard';

module.exports = {
  'tags': ['journey', 'accessibility', 'validation'],

  'Given I navigate to your car page': (client) => {
    client.page.yourCarPage().navigateAndWait();
  },

  'When I trigger validation on your car page and run accessibility check on your car page': (client) => {
    client.page.yourCarPage()
      .proceed()
      .assertAccessibility();
  },

  'Given I navigate to your details page': (client) => {
    client.page.yourCarPage()
      .completePageWithAndNavigateTo(standardProfile.yourCar, 'your-details');
  },

  'When I trigger validation on your details page and run accessibility check on your details page': (client) => {
    client.page.yourDetailsPage()
      .proceed()
      .assertAccessibility();
  },

  'Given I navigate to your policy page': (client) => {
    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(standardProfile.yourDetails, 'your-policy');
  },

  'When I trigger validation on your policy page and run accessibility check on your policy page': (client) => {
    client.page.yourPolicyPage()
      .proceed()
      .assertAccessibility();

    client.end();
  }
};