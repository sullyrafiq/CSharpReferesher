import drivingOffencesProfile from '../../profiles/drivingOffences';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'driving-offences-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, drivingOffencesProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, drivingOffencesProfile);
  },

  'When I click the browser back button': (client) => {
    client.back();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, drivingOffencesProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, drivingOffencesProfile);

    client.end();
  }
};
