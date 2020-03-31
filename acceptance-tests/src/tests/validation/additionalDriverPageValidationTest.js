import additionalDriversProfile from '../../profiles/additionalDrivers';
import VALIDATION_MESSAGES from '../../common/additionalDriverValidationMessages';
import standardProfile from '../../profiles/standard';

module.exports = {
  'tags': ['additional-driver', 'validation'],

  'Given I navigate to additional driver page': (client) => {
    client.page.yourCarPage()
      .navigateAndWait()
      .completePageWithAndNavigateTo(additionalDriversProfile.yourCar, 'your-details');

    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(additionalDriversProfile.yourDetails, 'your-policy');

    client.page.yourPolicyPage()
      .completePageWith({hasAdditionalDriver: true})
      .addAdditionalDriver();
  },

  'When I leave all questions unanswered and attempt to proceed': (client) => {
    client.page.additionalDriverPage()
      .proceed()
      .assertValidation('@firstNameValidationMessage', VALIDATION_MESSAGES.noFirstName)
      .assertValidation('@lastNameValidationMessage', VALIDATION_MESSAGES.noLastName)
      .assertValidation('@dateOfBirthValidationMessage', VALIDATION_MESSAGES.noDateOfBirth)
      .assertValidation('@genderValidationMessage', VALIDATION_MESSAGES.noGender)
      .assertValidation('@relationshipIdValidationMessage', VALIDATION_MESSAGES.noRelationshipId)
      .assertValidation('@employmentStatusValidationMessage', VALIDATION_MESSAGES.noEmploymentStatus)
      .assertValidation('@licenceTypeValidationMessage', VALIDATION_MESSAGES.noLicenceType)
      .assertValidation('@hasLicenceNumberValidationMessage', VALIDATION_MESSAGES.noHasLicenceNumber)
      .assertValidation('@numberOfYearsLicenceHeldValidationMessage', VALIDATION_MESSAGES.noNumberOfYearsLicenceHeld)
      .assertValidation('@hasClaimsValidationMessage', VALIDATION_MESSAGES.noHasClaims)
      .assertValidation('@hasDrivingOffencesValidationMessage', VALIDATION_MESSAGES.noHasDrivingOffences)
      .assertValidation('@hasNonMotoringConvictionsValidationMessage', VALIDATION_MESSAGES.noHasNonMotoringConvictions);
  },

  'When I enter an invalid first name and last name and attempt to proceed': (client) => {
    client.page.additionalDriverPage()
      .completePageWith({additionalDriverFirstName: 'p--p--p', additionalDriverLastName: 'j--j--j'})
      .proceed()
      .assertValidation('@firstNameValidationMessage', VALIDATION_MESSAGES.noFirstName)
      .assertValidation('@lastNameValidationMessage', VALIDATION_MESSAGES.noLastName);
  },

  'When I enter a first name that is too short and attempt to proceed': (client) => {
    client.page.additionalDriverPage()
      .completePageWith({additionalDriverFirstName: 'a'})
      .proceed()
      .assertValidation('@firstNameValidationMessage', VALIDATION_MESSAGES.noFirstName);
  },

  'When I enter a last name that is too short and attempt to proceed': (client) => {
    client.page.additionalDriverPage()
      .completePageWith({additionalDriverLastName: 'a'})
      .proceed()
      .assertValidation('@lastNameValidationMessage', VALIDATION_MESSAGES.noLastName);
  },

  'When I enter an invalid date of birth too old and attempt to proceed': (client) => {
    client.page.additionalDriverPage()
      .completePageWith({dateOfBirth: {day: '04', month: '04', year: '1917'}})
      .proceed()
      .assertValidation('@dateOfBirthValidationMessage', VALIDATION_MESSAGES.invalidDateOfBirth);
  },

  'When I enter an invalid date of birth too young and attempt to proceed': (client) => {
    client.page.additionalDriverPage()
      .completePageWith({dateOfBirth: {day: '05', month: '05', year: '2010'}})
      .proceed()
      .assertValidation('@dateOfBirthValidationMessage', VALIDATION_MESSAGES.invalidDateOfBirthTooYoung);
  },

  'When I enter a valid dateOfBirth, leave isUkResidentFromBirth and proceed to the next page': (client) => {
    client.page.additionalDriverPage()
      .completePageWith({dateOfBirth: standardProfile.yourDetails.dateOfBirth})
      .waitForElementVisible('@isUkResidentFromBirth')
      .proceed()
      .assertValidation('@isUkResidentFromBirthValidationMessage', VALIDATION_MESSAGES.isNotUkResidentFromBirth);
  },

  'When I select "Employed" as employment status, don\'t select an occupation or business sector and attempt to proceed': (client) => {
    client.page.additionalDriverPage()
      .completePageWith({employmentStatus: 3, occupation: '', businessSector: ''})
      .proceed()
      .assertValidation('@occupationValidationMessage', VALIDATION_MESSAGES.noOccupation)
      .assertValidation('@businessSectorValidationMessage', VALIDATION_MESSAGES.noBusinessSector);
  },

  'When I select "Yes" for additional occupation, don\'t select an additional occupation or business sector and attempt to proceed': (client) => {
    client.page.additionalDriverPage()
      .completePageWith({
        hasAdditionalOccupation: true,
        additionalOccupation: '',
        additionalOccupationBusinessSector: ''
      })
      .proceed()
      .assertValidation('@additionalOccupationValidationMessage', VALIDATION_MESSAGES.noAdditionalOccupation)
      .assertValidation('@additionalOccupationBusinessSectorValidationMessage', VALIDATION_MESSAGES.noAdditionalOccupationBusinessSector);
  },

  'When I select a relationship and attempt to proceed': (client) => {
    client.page.additionalDriverPage()
      .completePageWith({additionalDriverRelationshipId: 14})
      .proceed()
      .assertValidation('@maritalStatusIdValidationMessage', VALIDATION_MESSAGES.noMaritalStatusId);

    client.end();
  }
};
