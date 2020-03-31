import omit from 'lodash.omit';

import profile from '../../../profiles/complex';
import JourneyRunner from '../../../common/journeyRunner';
import VALIDATION_MESSAGES from '../../../common/validationMessages';
import AccountManager from '../../../common/accountManager';

module.exports = {
  'tags': ['journey', 'forward-journey', 'pre-population-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, profile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, profile);
  },

  'When I go back to the first page': (client) => {
    client.execute(() => window.location.search.split('enquiryId=')[1], [], ({value: enquiryId}) => {
      AccountManager.postHistory(client, {enquiryId: enquiryId, accountId: client.globals.accountId});
    });
    client.pause(5000);
    client.page.yourCarPage().navigateAndWait();
  },

  'Then Your Car page should be fully pre-populated and I am able to proceed': (client) => {
    client.page.yourCarPage()
      .waitForElementVisible('@selectedVehiclePreview')
      .assertUIWith(profile.yourCar)
      .completePageWithAndNavigateTo({}, 'your-details');
  },

  'And Your Details page should be fully pre-populated except for driving offences': (client) => {
    const { hasDrivingOffences, drivingOffences } = profile.yourDetails;

    client.page.yourDetailsPage()
      .assertUIWith(omit(profile.yourDetails, ['hasDrivingOffences', 'drivingOffences']))
      .proceed()
      .assertValidation('@hasDrivingOffencesValidationMessage', VALIDATION_MESSAGES.noHasDrivingOffences)
      .completePageWithAndNavigateTo({ hasDrivingOffences, drivingOffences }, 'your-policy');
  },

  'And Your Policy page should be fully pre-populated except for additional driver and policy start date': (client) => {
    const { hasAdditionalDriver, additionalDrivers, mainDriver, policyStartDate } = profile.yourPolicy;

    client.page.yourPolicyPage()
      .assertUIWith(omit(profile.yourPolicy, ['hasAdditionalDriver', 'additionalDrivers', 'mainDriver', 'policyStartDate']))
      .proceed()
      .assertValidation('@hasAdditionalDriverValidationMessage', VALIDATION_MESSAGES.noHasAdditionalDriver)
      .assertValidation('@policyStartDateValidationMessage', VALIDATION_MESSAGES.noPolicyStartDate)
      .completePageWith({ hasAdditionalDriver, additionalDrivers, mainDriver, policyStartDate });
  },

  'When I complete rest of the form and submit it': (client) => {
    client.page.yourPolicyPage().proceed();
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, profile);

    client.end();
  }
};
