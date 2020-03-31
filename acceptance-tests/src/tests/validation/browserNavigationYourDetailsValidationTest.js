import standardProfile from '../../profiles/standard';
import VALIDATION_MESSAGES from '../../common/validationMessages';

module.exports = {
  'tags': ['your-details', 'validation'],

  'Given I navigate to your policy page': (client) => {
    client.page.yourCarPage()
      .navigateAndWait()
      .completePageWithAndNavigateTo(standardProfile.yourCar, 'your-details');

    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(standardProfile.yourDetails, 'your-policy');
  },

  'And then return to Your Details page by using the browser back button': (client) => {
    client.back();
  },

  'And I edit the firstName value to an invalid one': (client) => {
    client.page.yourDetailsPage()
      .waitForElementVisible('@firstName')
      .clearAndSetValue('input[name="firstName"]', 'Peter- Smith')
      .assert.value('@firstName', 'Peter- Smith');
  },

  'And proceed back to Your Policy page by using the browser forward button': (client) => {
    client.forward();
  },

  'Then I should validate on the firstName question': (client) => {
    client.page.yourDetailsPage().assertValidation('@firstNameValidationMessage', VALIDATION_MESSAGES.invalidFirstName);

    client.end();
  }
};