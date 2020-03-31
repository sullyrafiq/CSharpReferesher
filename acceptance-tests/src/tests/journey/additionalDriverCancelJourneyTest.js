import additionalDriversProfile from '../../profiles/additionalDrivers';
import JourneyRunner from '../../common/journeyRunner';

const additionalDriverEdits = {
  additionalDriverFirstName: 'Penelope',
  additionalDriverLastName: 'Cruz',
  dateOfBirth: { day: '10', month: '04', year: '1990' },
  gender: 2 // Female
};

const { additionalDriverFirstName, additionalDriverLastName } = additionalDriversProfile.yourPolicy.additionalDrivers[0];

module.exports = {
  'tags': ['journey', 'additional-driver', 'edit-cancel-additional-driver'],

  'When I navigate to your policy page': (client) => {
    client.page.yourCarPage()
      .navigateAndWait()
      .completePageWithAndNavigateTo(additionalDriversProfile.yourCar, 'your-details');

    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(additionalDriversProfile.yourDetails, 'your-policy');

    client.page.yourPolicyPage()
      .completePageWith(additionalDriversProfile.yourPolicy);
  },

  'When I edit an additional driver and click cancel': (client) => {
    client.page.yourPolicyPage()
      .click('#additionalDriverQuestion .selection-preview__edit-item');

    client.page.additionalDriverPage()
      .completePageWith(additionalDriverEdits)
      .back();
  },

  'Then I see the additional driver has not changed': (client) => {
    client.assert.containsText('#additionalDriverQuestion .selection-preview__title', `${additionalDriverFirstName} ${additionalDriverLastName}`);
  },

  'When I edit an additional driver and click back in the browser': (client) => {
    client.page.yourPolicyPage()
      .click('#additionalDriverQuestion .selection-preview__edit-item');

    client.page.additionalDriverPage()
      .completePageWith(additionalDriverEdits)
      .api.back();
  },

  'Then I see the additional driver has still not changed': (client) => {
    client.assert.containsText('#additionalDriverQuestion .selection-preview__title', `${additionalDriverFirstName} ${additionalDriverLastName}`);
  },

  'When I proceed': (client) => {
    client.page.yourPolicyPage()
      .proceed();
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, additionalDriversProfile);
  },

  'When I click the browser back button': (client) => {
    client.back();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, additionalDriversProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, additionalDriversProfile);

    client.end();
  }
};