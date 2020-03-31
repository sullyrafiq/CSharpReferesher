import standardProfile from '../../profiles/standard';
import VALIDATION_MESSAGES from '../../common/validationMessages';

module.exports = {
  'tags': ['your-details', 'validation'],

  'Given I navigate to Your Policy page': (client) => {
    client.page.yourCarPage()
      .navigateAndWait()
      .completePageWithAndNavigateTo(standardProfile.yourCar, 'your-details');

    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(standardProfile.yourDetails, 'your-policy');
  },

  'And then return to Your Details page by using the browser back button': (client) => {
    client.back();
  },

  'And I edit the dateOfBirth value to a new valid value': (client) => {
    client.page.yourDetailsPage()
      .waitForElementVisible('@dateOfBirthYear')
      .clearAndSetValue('input[name="dateOfBirth-YYYY"]', '1990')
      .assert.value('@dateOfBirthYear', '1990');
  },

  'And proceed back to Your Policy page by using the browser forward button': (client) => {
    client.forward();
  },

  'Then I should validate on the isUkResidentFromBirth question': (client) => {
    client.page.yourDetailsPage().assertValidation('@isUkResidentFromBirthValidationMessage', VALIDATION_MESSAGES.isNotUkResidentFromBirth);

    client.end();
  }
};