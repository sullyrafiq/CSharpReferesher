import complexProfile from '../../profiles/complex';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'complex-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, complexProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, complexProfile);
  },

  'When I click the browser back button': (client) => {
    client.back();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, complexProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, complexProfile);

    client.end();
  }
};
