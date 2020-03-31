import removeDrivingOffencesProfile from '../../profiles/removeDrivingOffences';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'remove-driving-offences-journey'],

  'When I complete the journey with 2 driving offences and remove the first': (client) => {
    JourneyRunner.runWith(client, removeDrivingOffencesProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, removeDrivingOffencesProfile);
  },

  'When I click the browser back button': (client) => {
    client.back().refresh();
  },

  'And I complete the journey again': (client) => {
    const updatedProfile = JSON.parse(JSON.stringify(removeDrivingOffencesProfile));

    updatedProfile.yourDetails.drivingOffences.shift();

    JourneyRunner.assertRepop(client, updatedProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, removeDrivingOffencesProfile);

    client.end();
  }
};
