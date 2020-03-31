import additionalDriversProfile from '../../profiles/additionalDrivers';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'additional-driver', 'device-tests'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, additionalDriversProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, additionalDriversProfile);
  },

  'When I click the browser back button': (client) => {
    client.back().refresh();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, additionalDriversProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, additionalDriversProfile);

    client.end();
  }
};