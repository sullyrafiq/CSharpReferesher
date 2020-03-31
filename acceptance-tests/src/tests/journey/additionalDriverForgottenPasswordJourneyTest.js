import additionalDriversProfile from '../../profiles/additionalDrivers';
import { TYPE_B_FORGOTTEN_PASSWORD } from '../../common/userTypeJourneyManager';

const additionalDriverEdits = {
  additionalDriverFirstName: 'Penelope',
  additionalDriverLastName: 'Cruz',
  dateOfBirth: { day: '10', month: '04', year: '1990' },
  gender: 2 // Female
};

module.exports = {
  'tags': ['journey', 'forgotten-password-additional-driver', TYPE_B_FORGOTTEN_PASSWORD],

  'Given I am in forgotten password flow': (client) => {
    client.page.yourCarPage()
      .navigateAndWait()
      .completePageWithAndNavigateTo(additionalDriversProfile.yourCar, 'your-details');

    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(additionalDriversProfile.yourDetails, 'your-policy');

    client.page.yourPolicyPage()
      .completePageWith(additionalDriversProfile.yourPolicy)
      .forgottenPassword({
        email: client.globals.accountCredentials.email
      });
  },

  'And I edit additional driver and press the browser back button': (client) => {
    client.page.yourPolicyPage()
      .click('#additionalDriverQuestion .selection-preview__edit-item');

    client.page.additionalDriverPage()
      .completePageWith(additionalDriverEdits)
      .back();
  },


  'Then I should still be in forgotten password mode': (client) => {
    client.page.yourPolicyPage()
      .waitForElementVisible('@forgottenPasswordNotification');

    client.end();
  }
};