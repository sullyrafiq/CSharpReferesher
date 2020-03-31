import STANDARD_VALIDATION_MESSAGES from '../common/validationMessages';
import ADDITIONAL_DRIVER_VALIDATION_MESSAGES from '../common/additionalDriverValidationMessages';
import profile from '../profiles/live';
import additionalDrivers from '../profiles/sections/your-details/additionalDrivers';
import {TYPE_A_REGISTER} from '../common/userTypeJourneyManager';
import JourneyRunner from '../common/journeyRunner';

const updatedProfile = JSON.parse(JSON.stringify(profile));
delete updatedProfile.yourCar.personalMilesPerYearEstimated;

const today = new Date();
const monthCarBought = today.getMonth() + 1;
const yearCarBought = today.getFullYear();
const personalMilesPerYear = 5000;
const profileUpdates = {monthCarBought, yearCarBought, personalMilesPerYear};

updatedProfile.yourCar = Object.assign(updatedProfile.yourCar, profileUpdates);
updatedProfile.aggResponse.payload.vehicle = Object.assign(updatedProfile.aggResponse.payload.vehicle, profileUpdates);

module.exports = {
  'tags': ['live-monitoring', TYPE_A_REGISTER],

  'Given I navigate to your car page and attempt to proceed': (client) => {
    client.page.yourCarPage()
      .navigateAndWait()
      .proceed();
  },

  'Then it triggers validation errors on your-car page': (client) => {
    client.page.yourCarPage()
      .assertValidation('@vehicleValidationMessage', STANDARD_VALIDATION_MESSAGES.noVehicle)
      .assertValidation('@carBoughtValidationMessage', STANDARD_VALIDATION_MESSAGES.noCarBought)
      .assertValidation('@registeredOwnerAndKeeperValidationMessage', STANDARD_VALIDATION_MESSAGES.noRegisteredOwnerAndKeeper)
      .assertValidation('@usageTypeValidationMessage', STANDARD_VALIDATION_MESSAGES.noUsageType)
      .assertValidation('@personalMilesPerYearValidationMessage', STANDARD_VALIDATION_MESSAGES.noPersonalMilesPerYear)
      .assertValidation('@daytimeStorageLocationValidationMessage', STANDARD_VALIDATION_MESSAGES.noDaytimeStorageLocation)
      .assertValidation('@overnightStorageLocationValidationMessage', STANDARD_VALIDATION_MESSAGES.noOvernightStorageLocation)
      .assertValidation('@anyOtherCarsValidationMessage', STANDARD_VALIDATION_MESSAGES.noAnyOtherCars);
  },

  'When I fill in correct details and navigate to your details page and attempt to proceed': (client) => {
    client.page.yourCarPage()
      .completePageWithAndNavigateTo(updatedProfile.yourCar, 'your-details');

    client.page.yourDetailsPage()
      .proceed();
  },

  'Then it triggers validation errors on your-details page': (client) => {
    client.page.yourDetailsPage()
      .assertValidation('@firstNameValidationMessage', STANDARD_VALIDATION_MESSAGES.noFirstName)
      .assertValidation('@lastNameValidationMessage', STANDARD_VALIDATION_MESSAGES.noLastName)
      .assertValidation('@genderValidationMessage', STANDARD_VALIDATION_MESSAGES.noGender)
      .assertValidation('@dateOfBirthValidationMessage', STANDARD_VALIDATION_MESSAGES.noDateOfBirth)
      .assertValidation('@postcodeValidationMessage', STANDARD_VALIDATION_MESSAGES.noAddress)
      .assertValidation('@isHomeOwnerValidationMessage', STANDARD_VALIDATION_MESSAGES.noIsHomeOwner)
      .assertValidation('@numberOfChildrenUnder16QuestionValidationMessage', STANDARD_VALIDATION_MESSAGES.noNumberOfChildrenUnder16)
      .assertValidation('@maritalStatusIdValidationMessage', STANDARD_VALIDATION_MESSAGES.noMaritalStatusId)
      .assertValidation('@employmentStatusValidationMessage', STANDARD_VALIDATION_MESSAGES.noEmploymentStatus)
      .assertValidation('@numberOfCarsInHouseholdValidationMessage', STANDARD_VALIDATION_MESSAGES.noNumberOfCarsInHousehold)
      .assertValidation('@licenceTypeValidationMessage', STANDARD_VALIDATION_MESSAGES.noLicenceType)
      .assertValidation('@hasMedicalConditionValidationMessage', STANDARD_VALIDATION_MESSAGES.noHasMedicalCondition)
      .assertValidation('@hasLicenceNumberValidationMessage', STANDARD_VALIDATION_MESSAGES.noHasLicenceNumber)
      .assertValidation('@numberOfYearsLicenceHeldValidationMessage', STANDARD_VALIDATION_MESSAGES.noNumberOfYearsLicenceHeld)
      .assertValidation('@hasClaimsValidationMessage', STANDARD_VALIDATION_MESSAGES.noHasClaims)
      .assertValidation('@hasDrivingOffencesValidationMessage', STANDARD_VALIDATION_MESSAGES.noHasDrivingOffences)
      .assertValidation('@hasNonMotoringConvictionsValidationMessage', STANDARD_VALIDATION_MESSAGES.noHasNonMotoringConvictions);
  },

  'When I fill in correct details and navigate to your policy page': (client) => {
    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(updatedProfile.yourDetails, 'your-policy');
  },

  'And I navigate to additional driver page and attempt to add additional driver': (client) => {
    client.page.yourPolicyPage()
      .completePageWith({hasAdditionalDriver: true})
      .addAdditionalDriver();
  },

  'Then it triggers validation errors on additional driver page': (client) => {
    client.page.additionalDriverPage()
      .proceed()
      .assertValidation('@firstNameValidationMessage', ADDITIONAL_DRIVER_VALIDATION_MESSAGES.noFirstName)
      .assertValidation('@lastNameValidationMessage', ADDITIONAL_DRIVER_VALIDATION_MESSAGES.noLastName)
      .assertValidation('@dateOfBirthValidationMessage', ADDITIONAL_DRIVER_VALIDATION_MESSAGES.noDateOfBirth)
      .assertValidation('@genderValidationMessage', ADDITIONAL_DRIVER_VALIDATION_MESSAGES.noGender)
      .assertValidation('@relationshipIdValidationMessage', ADDITIONAL_DRIVER_VALIDATION_MESSAGES.noRelationshipId)
      .assertValidation('@employmentStatusValidationMessage', ADDITIONAL_DRIVER_VALIDATION_MESSAGES.noEmploymentStatus)
      .assertValidation('@licenceTypeValidationMessage', ADDITIONAL_DRIVER_VALIDATION_MESSAGES.noLicenceType)
      .assertValidation('@hasLicenceNumberValidationMessage', ADDITIONAL_DRIVER_VALIDATION_MESSAGES.noHasLicenceNumber)
      .assertValidation('@numberOfYearsLicenceHeldValidationMessage', ADDITIONAL_DRIVER_VALIDATION_MESSAGES.noNumberOfYearsLicenceHeld)
      .assertValidation('@hasClaimsValidationMessage', ADDITIONAL_DRIVER_VALIDATION_MESSAGES.noHasClaims)
      .assertValidation('@hasDrivingOffencesValidationMessage', ADDITIONAL_DRIVER_VALIDATION_MESSAGES.noHasDrivingOffences)
      .assertValidation('@hasNonMotoringConvictionsValidationMessage', ADDITIONAL_DRIVER_VALIDATION_MESSAGES.noHasNonMotoringConvictions);
  },

  'When I fill in correct details for additional driver and save them ': (client) => {
    client.page.additionalDriverPage()
      .completePageWithAndNavigateTo(additionalDrivers[0], 'your-policy');
  },

  'Then I should be back on your policy page': (client) => {
    client.page.yourPolicyPage()
      .waitForUrlToContain('shop/car-insurance/questionset/your-policy');
  },

  'When I leave all questions unanswered on your policy page and attempt to proceed': (client) => {
    client.page.yourPolicyPage()
      .proceed();
  },

  'Then it triggers validation errors on your policy page': (client) => {
    client.page.yourPolicyPage()
      .proceed()
      .assertValidation('@insuranceDeclinedValidationMessage', STANDARD_VALIDATION_MESSAGES.noInsuranceDeclined)
      .assertValidation('@numberOfYearsNoClaimsValidationMessage', STANDARD_VALIDATION_MESSAGES.noNumberOfYearsNoClaims)
      .assertValidation('@policyStartDateValidationMessage', STANDARD_VALIDATION_MESSAGES.noPolicyStartDate)
      .assertValidation('@paymentPreferenceValidationMessage', STANDARD_VALIDATION_MESSAGES.noPaymentPreference)
      .assertValidation('@policyTypeIdValidationMessage', STANDARD_VALIDATION_MESSAGES.noPolicyTypeId)
      .assertValidation('@legalCoverValidationMessage', STANDARD_VALIDATION_MESSAGES.noLegalCover)
      .assertValidation('@personalInjuryValidationMessage', STANDARD_VALIDATION_MESSAGES.noPersonalInjury)
      .assertValidation('@breakdownCoverValidationMessage', STANDARD_VALIDATION_MESSAGES.noBreakdownCover)
      .assertValidation('@courtesyCarValidationMessage', STANDARD_VALIDATION_MESSAGES.noCourtesyCar);
  },

  'When I complete rest of the your policy page': (client) => {
    client.page.yourPolicyPage()
      .completePageWith(Object.assign(updatedProfile.yourPolicy));
  },

  'And I create new account and submit the form': (client) => {
    client.page.yourPolicyPage()
      .registerInline(client.globals.accountCredentials)
      .proceed();
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, updatedProfile);
  },

  'When I end up on the results page': (client) => {
    client.page.resultsPage()
      .waitForUrlToContain('shop/car-insurance/results')
      .waitForResultsComplete();
  },

  'And I check the first result that is returned': (client) => {
    client.page.resultsPage()
      .click('@providerImageGoToSite')
      .waitForElementVisible('@policySlider')
      .waitForElementVisible('@goToSite');

    client.end();
  }
};
