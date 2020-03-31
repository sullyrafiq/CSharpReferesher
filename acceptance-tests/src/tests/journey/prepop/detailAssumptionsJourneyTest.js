import detailAssumptionsProfile from '../../../profiles/detailAssumptions';
import JourneyRunner from '../../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'detail-assumptions-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, detailAssumptionsProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, detailAssumptionsProfile);
  },

  'When I click the browser back button': (client) => {
    client.back().refresh();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, detailAssumptionsProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, detailAssumptionsProfile);

    client.end();
  }
};
