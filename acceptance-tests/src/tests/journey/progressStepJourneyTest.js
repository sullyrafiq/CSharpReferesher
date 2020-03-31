import elements from '../../common/elements';
import standardProfile from '../../profiles/standard';

module.exports = {
  'tags': ['progress-steps'],

  'Given I am on your car page': (client) => {
    client.page.yourCarPage().navigateAndWait();
  },

  'Given I am on the your details page': (client) => {
    client.page.yourCarPage()
      .completePageWithAndNavigateTo(standardProfile.yourCar, 'your-details');
  },

  'When I click your car progress step from your details page': (client) => {
    client.page.yourDetailsPage().click(elements.yourCarProgressStepLink);
  },

  'Then I should go to your car page': (client) => {
    client.page.yourCarPage().waitForUrlToContain('your-car');
  },

  'Given I am on the your Policy page': (client) => {
    client.page.yourCarPage().proceed();
    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(standardProfile.yourDetails, 'your-policy');
  },

  'When I click your car progress step from your Policy page': (client) => {
    client.page.yourPolicyPage().click(elements.yourCarProgressStepLink);
  },

  'Then I should go to your car page from your Policy page': (client) => {
    client.page.yourCarPage().waitForUrlToContain('your-car');
  },

  'When I click your details progress step from your Policy page': (client) => {
    client.page.yourCarPage().proceed();
    client.page.yourDetailsPage().proceed();
    client.page.yourPolicyPage().click(elements.yourDetailsProgressStepLink);
  },

  'Then I should go to your details page from your Policy page': (client) => {
    client.page.yourDetailsPage().waitForUrlToContain('your-details');

    client.end();
  }
};