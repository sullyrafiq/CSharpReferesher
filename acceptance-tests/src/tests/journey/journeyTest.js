import standardProfile from '../../profiles/standard';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'abc'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, standardProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, standardProfile);
  },

  'When I click the browser back button': (client) => {
    client.back();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, standardProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, standardProfile);

    client.end();
  }
};
