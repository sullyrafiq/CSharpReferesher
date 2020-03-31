import additionalDriversProfile from '../../profiles/additionalDrivers';
import JourneyRunner from '../../common/journeyRunner';
import VALIDATION_MESSAGES from '../../common/validationMessages';

const additionalDriverEdits = {
  additionalDriverFirstName: 'Penelope',
  additionalDriverLastName: 'Cruz',
  dateOfBirth: { day: '10', month: '04', year: '1990' },
  gender: 2, // Female
  isUkResidentFromBirth: true,
  additionalDriverHasLicenceNumber: false
};
const updatedProfile = JSON.parse(JSON.stringify(additionalDriversProfile));
updatedProfile.yourPolicy.mainDriver = 'Penelope-Cruz-1990-04-10';

const additionalDrivers = updatedProfile.yourPolicy.additionalDrivers;
additionalDrivers[0] = Object.assign(additionalDrivers[0], additionalDriverEdits);
delete additionalDrivers[0].licenceNumber;

const additionalDriversAggResponse = updatedProfile.aggResponse.payload.additionalDrivers;
additionalDriversAggResponse[0] = Object.assign({}, additionalDriversAggResponse[0], {
  name: 'Penelope',
  surname: 'Cruz',
  dateOfBirth: '1990-04-10',
  genderId: 2,
  isUkResidentFromBirth: true,
  licenceNumber: null
});

module.exports = {
  'tags': ['journey', 'additional-driver', 'edit-additional-driver'],

  'When I navigate to your policy page': (client) => {
    client.page.yourCarPage()
      .navigateAndWait()
      .completePageWithAndNavigateTo(additionalDriversProfile.yourCar, 'your-details');

    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(additionalDriversProfile.yourDetails, 'your-policy');

    client.page.yourPolicyPage()
      .completePageWith(additionalDriversProfile.yourPolicy);
  },

  'When I edit an additional driver and click save': (client) => {
    client.page.yourPolicyPage()
      .click('#additionalDriverQuestion .selection-preview__edit-item');

    client.page.additionalDriverPage()
      .completePageWith(additionalDriverEdits)
      .proceed();
  },

  'Then I see the additional driver has changed': (client) => {
    client.assert.containsText('#additionalDriverQuestion .selection-preview__title', 'Penelope Cruz');
  },

  'When I proceed': (client) => {
    client.page.yourPolicyPage()
      .proceed();
  },

  'Then I see a validation error for main driver': (client) => {
    client.page.yourPolicyPage()
      .assertValidation('@mainDriverValidationMessage', VALIDATION_MESSAGES.noMainDriver);
  },

  'When I select a new main driver and proceed': (client) => {
    client.page.yourPolicyPage()
      .completePageWith({ mainDriver: updatedProfile.yourPolicy.mainDriver })
      .proceed();
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, updatedProfile);
  },

  'When I click the browser back button': (client) => {
    client.back();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, updatedProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, updatedProfile);

    client.end();
  }
};