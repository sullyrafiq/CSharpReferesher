import standardProfile from '../../profiles/standard';
import VALIDATION_MESSAGES from '../../common/validationMessages';

module.exports = {
  'tags': ['your-policy', 'validation', 'type-a-sign-in'],

  'Given I navigate to your policy page': (client) => {
    client.page.yourCarPage()
      .navigateAndWait()
      .completePageWithAndNavigateTo(standardProfile.yourCar, 'your-details');

    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(standardProfile.yourDetails, 'your-policy');
  },

  'When I enter a recognised email address with an invalid password and attempt to proceed': (client) => {
    client.page.yourPolicyPage().signInInline({
      email: client.globals.accountCredentials.email,
      password: 'incorrect-password'
    }, true);
  },

  'Then I see an incorrect password validation message': (client) => {
    client.page.yourPolicyPage()
      .assertValidation('@passwordValidationMessage', VALIDATION_MESSAGES.incorrectPassword);

    client.end();
  }
};