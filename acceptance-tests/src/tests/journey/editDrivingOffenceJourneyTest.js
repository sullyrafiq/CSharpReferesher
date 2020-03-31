import profile from '../../profiles/standardWithEditedDrivingOffence';
import JourneyRunner from '../../common/journeyRunner';

const YEAR = new Date().getFullYear();

const originalDrivingOffence = {
  drivingOffenceType: 'Alcohol or drug related',
  drivingOffenceCode: 128, //DR10
  drivingOffenceAlcoholReading: 104,
  drivingOffenceDate: { day: '18', month: '02', year: YEAR - 2 },
  drivingOffencePenaltyPoints: 0,
  drivingOffencePaidFine: true,
  drivingOffenceFineAmount: '940',
  drivingOffenceBanned: true,
  drivingOffenceMonthsBanned: 24
};

const editedDrivingOffence = profile.yourDetails.drivingOffences[0];
delete profile.yourDetails.drivingOffences;

const additionalDrivers = profile.yourPolicy.additionalDrivers;
delete profile.yourPolicy.additionalDrivers;

const mainDriver = profile.yourPolicy.mainDriver;
delete profile.yourPolicy.mainDriver;

const additionalDriverEditedDrivingOffence = additionalDrivers[0].drivingOffences[0];
delete additionalDrivers[0].drivingOffences;

const updatedProfile = JSON.parse(JSON.stringify(profile));
updatedProfile.yourDetails.drivingOffences = [editedDrivingOffence];
updatedProfile.yourPolicy.additionalDrivers = additionalDrivers;

module.exports = {
  'tags': ['journey', 'forward-journey', 'edit-driving-offence-journey'],

  'When I navigate to your details page': (client) => {
    client.page.yourCarPage()
      .navigateAndWait()
      .completePageWithAndNavigateTo(profile.yourCar, 'your-details');

    client.page.yourDetailsPage()
      .completePageWith(profile.yourDetails);
  },

  'And I add an edited driving offence': (client) => {
    client.page.yourDetailsPage()
      .completePageWith(originalDrivingOffence)
      .completePageWith(editedDrivingOffence)
      .click('@saveDrivingOffence');
  },

  'And I navigate to your policy': (client) => {
    client.page.yourDetailsPage()
      .navigateTo('your-policy');

    client.page.yourPolicyPage()
      .completePageWith(profile.yourPolicy);
  },

  'And I add an additional driver with edited driving offence': (client) => {
    client.page.yourPolicyPage()
      .addAdditionalDriver();

    client.page.additionalDriverPage()
      .completePageWith(additionalDrivers[0])
      .completePageWith(originalDrivingOffence)
      .completePageWith(additionalDriverEditedDrivingOffence)
      .click('@saveDrivingOffence')
      .navigateTo('your-policy');
  },

  'And I complete the journey': (client) => {
    client.page.yourPolicyPage()
      .completePageWith({ mainDriver })
      .proceed();
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, updatedProfile);
  },

  'When I click the browser back button': (client) => {
    client.back().refresh();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, updatedProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, updatedProfile);

    client.end();
  }
};