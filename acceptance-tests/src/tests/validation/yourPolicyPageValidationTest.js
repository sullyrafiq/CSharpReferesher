import youngDriver from '../../profiles/youngDriver';
import VALIDATION_MESSAGES from '../../common/validationMessages';
import {TYPE_A_SIGN_IN} from '../../common/userTypeJourneyManager';

const date = new Date();
const today = date.toISOString().slice(0, 10);
date.setDate(date.getDate() + 1);
const tomorrow = date.toISOString().slice(0, 10);

module.exports = {

  'tags': ['your-policy', 'validation', TYPE_A_SIGN_IN],

  'Given I navigate to your policy page': (client) => {
    client.page.yourCarPage()
      .navigateAndWait()
      .completePageWithAndNavigateTo(youngDriver.yourCar, 'your-details');

    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(youngDriver.yourDetails, 'your-policy');
  },

  'When I leave all questions unanswered and attempt to proceed': (client) => {
    client.page.yourPolicyPage()
      .proceed()
      .assertValidation('@hasAdditionalDriverValidationMessage', VALIDATION_MESSAGES.noHasAdditionalDriver)
      .assertValidation('@insuranceDeclinedValidationMessage', VALIDATION_MESSAGES.noInsuranceDeclined)
      .assertValidation('@numberOfYearsNoClaimsValidationMessage', VALIDATION_MESSAGES.noNumberOfYearsNoClaims)
      .assertValidation('@policyStartDateValidationMessage', VALIDATION_MESSAGES.noPolicyStartDate)
      .assertValidation('@paymentPreferenceValidationMessage', VALIDATION_MESSAGES.noPaymentPreference)
      .assertValidation('@policyTypeIdValidationMessage', VALIDATION_MESSAGES.noPolicyTypeId)
      .assertValidation('@legalCoverValidationMessage', VALIDATION_MESSAGES.noLegalCover)
      .assertValidation('@personalInjuryValidationMessage', VALIDATION_MESSAGES.noPersonalInjury)
      .assertValidation('@breakdownCoverValidationMessage', VALIDATION_MESSAGES.noBreakdownCover)
      .assertValidation('@courtesyCarValidationMessage', VALIDATION_MESSAGES.noCourtesyCar);
  },

  'When I enter a recognised email address with an invalid password and attempt to proceed': (client) => {
    client.page.yourPolicyPage()
      .signIn({
        email: client.globals.accountCredentials.email,
        password: 'incorrect-password'
      })
      .proceed()
      .assertValidation('@passwordValidationMessage', VALIDATION_MESSAGES.incorrectPassword);
  },

  'When I enter an invalid number of no claims and attempt to proceed': (client) => {
    client.page.yourPolicyPage()
      .completePageWith({numberOfYearsNoClaims: '17'})
      .proceed()
      .assertValidation('@numberOfYearsNoClaimsValidationMessage', VALIDATION_MESSAGES.invalidNumberOfYearsNoClaims);

  },

  'When I enter a policy start date and attempt to proceed': (client) => {
    client.page.yourPolicyPage()
      .completePageWith({policyStartDate: today})
      .proceed()
      .assertValidation('@policyStartDateValidationMessage', VALIDATION_MESSAGES.driverInvalidPolicyStartDate);
  },

  'When I enter a policy start date and attempt to proceed with a new date': (client) => {
    client.page.yourPolicyPage()
      .completePageWith({hasAdditionalDriver: true})
      .addAdditionalDriver();

    client.page.additionalDriverPage()
      .completePageWith(youngDriver.yourPolicy.additionalDrivers[0])
      .proceed();

    client.page.yourPolicyPage()
      .completePageWith({policyStartDate: tomorrow})
      .proceed()
      .assertValidation('@policyStartDateValidationMessage', VALIDATION_MESSAGES.additionalDriverInvalidPolicyStartDate);

    client.end();
  }
};
