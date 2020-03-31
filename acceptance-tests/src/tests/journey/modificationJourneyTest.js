import modificationsProfile from '../../profiles/modifications';
import JourneyRunner from '../../common/journeyRunner';


module.exports = {
  'tags': ['journey', 'forward-journey', 'modifications-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, modificationsProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, modificationsProfile);
  },

  'When I click the browser back button': (client) => {
    client.back();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, modificationsProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, modificationsProfile);

    client.end();
  }
};
