import additionalOccupationProfile from '../../profiles/additionalOccupation';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'additional-occupation-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, additionalOccupationProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, additionalOccupationProfile);
  },

  'When I click the browser back button': (client) => {
    client.back();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, additionalOccupationProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, additionalOccupationProfile);

    client.end();
  }
};
