import profile from '../../profiles/househusbandMainDriverWithHousehusbandAdditionalDriver';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'househusband-main-driver-with-househusband-additional-driver-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, profile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, profile);
  },

  'When I click the browser back button': (client) => {
    client.back();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, profile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, profile);

    client.end();
  }
};
