import standardProfile from '../../profiles/standard';
import VALIDATION_MESSAGES from '../../common/validationMessages';

module.exports = {
  'tags': ['your-details', 'validation'],

  'Given I navigate to your details page': (client) => {
    client.page.yourCarPage()
      .navigateAndWait()
      .completePageWithAndNavigateTo(standardProfile.yourCar, 'your-details');
  },

  'When I leave all questions unanswered and attempt to proceed': (client) => {
    client.page.yourDetailsPage()
      .proceed()
      .assertValidation('@firstNameValidationMessage', VALIDATION_MESSAGES.noFirstName)
      .assertValidation('@lastNameValidationMessage', VALIDATION_MESSAGES.noLastName)
      .assertValidation('@genderValidationMessage', VALIDATION_MESSAGES.noGender)
      .assertValidation('@dateOfBirthValidationMessage', VALIDATION_MESSAGES.noDateOfBirth)
      .assertValidation('@postcodeValidationMessage', VALIDATION_MESSAGES.noAddress)
      .assertValidation('@isHomeOwnerValidationMessage', VALIDATION_MESSAGES.noIsHomeOwner)
      .assertValidation('@numberOfChildrenUnder16QuestionValidationMessage', VALIDATION_MESSAGES.noNumberOfChildrenUnder16)
      .assertValidation('@maritalStatusIdValidationMessage', VALIDATION_MESSAGES.noMaritalStatusId)
      .assertValidation('@employmentStatusValidationMessage', VALIDATION_MESSAGES.noEmploymentStatus)
      .assertValidation('@numberOfCarsInHouseholdValidationMessage', VALIDATION_MESSAGES.noNumberOfCarsInHousehold)
      .assertValidation('@licenceTypeValidationMessage', VALIDATION_MESSAGES.noLicenceType)
      .assertValidation('@hasMedicalConditionValidationMessage', VALIDATION_MESSAGES.noHasMedicalCondition)
      .assertValidation('@hasLicenceNumberValidationMessage', VALIDATION_MESSAGES.noHasLicenceNumber)
      .assertValidation('@numberOfYearsLicenceHeldValidationMessage', VALIDATION_MESSAGES.noNumberOfYearsLicenceHeld)
      .assertValidation('@hasClaimsValidationMessage', VALIDATION_MESSAGES.noHasClaims)
      .assertValidation('@hasDrivingOffencesValidationMessage', VALIDATION_MESSAGES.noHasDrivingOffences)
      .assertValidation('@hasNonMotoringConvictionsValidationMessage', VALIDATION_MESSAGES.noHasNonMotoringConvictions);
  },

  'When I enter an invalid first name and last name and attempt to proceed': (client) => {
    client.page.yourDetailsPage()
      .completePageWith({ firstName: 'p--p--p', lastName: 'j--j--j' })
      .proceed()
      .assertValidation('@firstNameValidationMessage', VALIDATION_MESSAGES.invalidFirstName)
      .assertValidation('@lastNameValidationMessage', VALIDATION_MESSAGES.invalidLastName);
  },

  'When I enter a first name that is too short and attempt to proceed': (client) => {
    client.page.yourDetailsPage()
      .completePageWith({ firstName: 'a' })
      .proceed()
      .assertValidation('@firstNameValidationMessage', VALIDATION_MESSAGES.invalidFirstName);
  },

  'When I enter a last name that is too short and attempt to proceed': (client) => {
    client.page.yourDetailsPage()
      .completePageWith({ lastName: 'a' })
      .proceed()
      .assertValidation('@lastNameValidationMessage', VALIDATION_MESSAGES.invalidLastName);
  },

  'When I enter an invalid date of birth too old and attempt to proceed': (client) => {
    client.page.yourDetailsPage()
      .completePageWith({ dateOfBirth: { day: '04', month: '04', year: '1917' } })
      .proceed()
      .assertValidation('@dateOfBirthValidationMessage', VALIDATION_MESSAGES.invalidDateOfBirth);
  },

  'When I enter an invalid date of birth too young and attempt to proceed': (client) => {
    client.page.yourDetailsPage()
      .completePageWith({ dateOfBirth: { day: '05', month: '05', year: '2010' } })
      .proceed()
      .assertValidation('@dateOfBirthValidationMessage', VALIDATION_MESSAGES.driverDateOfBirthTooYoung);
  },

  'When I don\'t enter a postcode and attempt to find an address': (client) => {
    client.page.yourDetailsPage()
      .completePageWith({postcode: ''})
      .click('@findAddress')
      .assertValidation('@postcodeValidationMessage', VALIDATION_MESSAGES.noPostcode);
  },

  'When I enter an invalid postcode and attempt to find address': (client) => {
    client.page.yourDetailsPage()
      .completePageWith({ postcode: 'ASDASD' })
      .click('@findAddress')
      .assertValidation('@postcodeValidationMessage', VALIDATION_MESSAGES.invalidPostcode);
  },

  'When I enter valid postcode, get list of addresses, but don\'t select anything and attempt to proceed': (client) => {
    client.page.yourDetailsPage()
      .completePageWith({ postcode: standardProfile.yourDetails.postcode })
      .findAddress()
      .proceed()
      .assertValidation('@addressValidationMessage', VALIDATION_MESSAGES.noAddressSelected);
  },

  'When I enter a valid dateOfBirth, leave isUkResidentFromBirth and proceed to the next page': (client) => {
    client.page.yourDetailsPage()
      .completePageWith({ dateOfBirth: standardProfile.yourDetails.dateOfBirth })
      .waitForElementVisible('@isUkResidentFromBirth')
      .proceed()
      .assertValidation('@isUkResidentFromBirthValidationMessage', VALIDATION_MESSAGES.isNotUkResidentFromBirth);
  },

  'When I select "Employed" as employment status, don\'t select an occupation or business sector and attempt to proceed': (client) => {
    client.page.yourDetailsPage()
      .completePageWith({ employmentStatus: 3, occupation: '', businessSector: '' })
      .proceed()
      .assertValidation('@occupationValidationMessage', VALIDATION_MESSAGES.noOccupation)
      .assertValidation('@businessSectorValidationMessage', VALIDATION_MESSAGES.noBusinessSector);
  },

  'When I select "Yes" for additional occupation, don\'t select an additional occupation or business sector and attempt to proceed': (client) => {
    client.page.yourDetailsPage()
      .completePageWith({ hasAdditionalOccupation: true, additionalOccupation: '', additionalOccupationBusinessSector: '' })
      .proceed()
      .assertValidation('@additionalOccupationValidationMessage', VALIDATION_MESSAGES.noAdditionalOccupation)
      .assertValidation('@additionalOccupationBusinessSectorValidationMessage', VALIDATION_MESSAGES.noBusinessSector);

    client.end();
  }
};
