import businessMilesProfile from '../../profiles/businessMiles';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'business-miles-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, businessMilesProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, businessMilesProfile);
  },

  'When I click the browser back button': (client) => {
    client.back().refresh();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, businessMilesProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, businessMilesProfile);

    client.end();
  }
};
