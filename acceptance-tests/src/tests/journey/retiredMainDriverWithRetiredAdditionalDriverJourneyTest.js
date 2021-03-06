import profile from '../../profiles/retiredMainDriverWithRetiredAdditionalDriver';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'retired-main-driver-with-retired-additional-driver-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, profile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, profile);
  },

  'When I click the browser back button': (client) => {
    client.back().refresh();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, profile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, profile);

    client.end();
  }
};
