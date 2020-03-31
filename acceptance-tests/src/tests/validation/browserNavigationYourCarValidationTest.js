import standardProfile from '../../profiles/standard';
import VALIDATION_MESSAGES from '../../common/validationMessages';

module.exports = {
  'tags': ['your-car', 'validation'],

  'Given I navigate to your details page': (client) => {
    client.page.yourCarPage()
      .navigateAndWait()
      .completePageWithAndNavigateTo(standardProfile.yourCar, 'your-details');
  },

  'And then return to Your Car page by using the browser back button': (client) => {
    client.back();
  },

  'And I edit the personalMilesPerYear value to an invalid one': (client) => {
    client.page.yourCarPage()
      .waitForElementVisible('@personalMilesPerYearEstimated')
      .click('@personalMilesPerYearEstimatedEdit')
      .waitForElementVisible('@personalMilesPerYear')
      .clearAndSetValue('input[name="personalMilesPerYear"]', 50)
      .assert.value('@personalMilesPerYear', String(50));
  },

  'And proceed back to Your Details page by using the browser forward button': (client) => {
    client.forward();
  },

  'Then I should validate on the personalMilesPerYear question': (client) => {
    client.page.yourCarPage().assertValidation('@personalMilesPerYearValidationMessage', VALIDATION_MESSAGES.invalidPersonalMilesPerYear);

    client.end();
  }
};