import claimsProfile from '../../profiles/claims';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'claims-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, claimsProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, claimsProfile);
  },

  'When I click the browser back button': (client) => {
    client.back();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, claimsProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, claimsProfile);

    client.end();
  }
};
