import standardProfile from '../../profiles/standard';

module.exports = {
  'tags': ['journey', 'reverse-journey'],

  'Given I am on your car page': (client) => {
    client.page.yourCarPage().navigateAndWait();
  },

  'When I navigate to your policy page': (client) => {
    client.page.yourCarPage()
      .completePageWithAndNavigateTo(standardProfile.yourCar, 'your-details');
    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(standardProfile.yourDetails, 'your-policy');
  },

  'When I click back to previous page on your policy page': (client) => {
    client.page.yourPolicyPage().back();
  },

  'Then I should be taken to your details page': (client) => {
    client.page.yourDetailsPage().waitForUrlToContain('your-details');
  },

  'And I click back to previous page on your details page': (client) => {
    client.page.yourDetailsPage().back();
  },

  'Then I should be taken to your car page': (client) => {
    client.page.yourCarPage().waitForUrlToContain('your-car');

    client.end();
  }
};