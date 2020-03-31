import profile from '../../profiles/live';
import JourneyRunner from '../../common/journeyRunner';
import UserTypeJourneyManager, { TYPE_MOBILE_APP_COOKIE } from '../../common/userTypeJourneyManager';

const clientId = 13;
const updatedProfile = JSON.parse(JSON.stringify(profile));
updatedProfile.aggResponse = Object.assign(updatedProfile.aggResponse, {clientId});

module.exports = {
  'tags': ['journey', 'forward-journey', TYPE_MOBILE_APP_COOKIE],

  'When I navigate to Your Policy page with the mobile app cookie': (client) => {
    client.page.yourCarPage()
      .navigateAndWait()
      .fetchSpy();

    client.page.yourCarPage()
      .completePageWithAndNavigateTo(updatedProfile.yourCar, 'your-details');

    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(updatedProfile.yourDetails, 'your-policy');
  },

  'Then I should not see the header, the contact preferences question and the communication preferences section': (client) => {
    client.page.yourPolicyPage()
      .waitForElementNotPresent('@header')
      .waitForElementNotPresent('@contactByEmail')
      .waitForElementNotPresent('@communicationPreferences');
  },

  'And then I navigate to the Results page': (client) => {
    client.page.yourPolicyPage()
      .completePageWith(updatedProfile.yourPolicy);

    UserTypeJourneyManager.accountAction(client);

    client.page.yourPolicyPage().proceed();

    JourneyRunner.assertComplete(client, updatedProfile);
  },

  'Then I should not see the header and footer': (client) => {
    client.page.resultsPage()
      .waitForUrlToContain('results')
      .waitForElementNotPresent('@header')
      .waitForElementNotPresent('@footer');

    client.end();
  }
};